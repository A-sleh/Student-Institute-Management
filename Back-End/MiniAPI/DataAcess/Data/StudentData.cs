﻿using DataAcess.DBAccess;
using DataAcess.Exceptions;
using DataAcess.Models;
using System;
using System.Buffers;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data;

public class StudentData : IStudentData
{
    private readonly ISqlDataAccess _db;
    private readonly ConcurrentDictionary<int, StudentModel> _studentsCache = [];
    private bool _firstLoad = true;
    public StudentData(ISqlDataAccess db)
    {
        this._db = db;
    }

    #region Data Request

    /*
     * Expensive Method, Must Be Forced on first loading
     */
    private async Task LoadStudentModelList(int? classId = null)
    {
        _ = (await _db.LoadData<StudentModel, dynamic, ClassModel>(
            "dbo.StudentGetAll",
            parameters: new { classId },
            (StudentModel Student, ClassModel Class) =>
            {
                Student.Class = Class;
                _studentsCache.TryAdd(Student.StudentId, Student);
                return Student;
            },
            splitOn: "ClassId"));
    }

    private async Task<StudentModel?> GetStudentModelById(int id)
    {
        var res = await _db.LoadData<StudentModel, dynamic, ClassModel>("dbo.StudentGet",
                parameters: new { Id = id },
                (StudentModel Student, ClassModel Class) =>
                {
                    Student.Class = Class;
                    return Student;
                },
                splitOn: "ClassId");
        return res.FirstOrDefault();
    }

    public async Task<IEnumerable<dynamic>> GetStudents(int? classId = null, int? gradeId = null)
    {
        lock (this)
        {
            if (_firstLoad)
            {
                LoadStudentModelList(null).Wait();
                _firstLoad = false;
            }
        }
        await LoadStudentModelList(classId);
        var students = _studentsCache
            .Where(student => (classId is null || student.Value.Class?.ClassId == classId)
            && (gradeId is null || student.Value.Class?.GradeId == gradeId));

        return students.Select(x => x.Value.PureFormat());

    }

    public async Task<dynamic?> GetStudentByID(int id)
    {

        if (!_studentsCache.TryGetValue(id, out StudentModel? cachedStudent))
        {
            var student = await GetStudentModelById(id);
            if (student != null)
            {
                _studentsCache.TryAdd(id, student);
                return _studentsCache[id].PureFormat();
            }
            return student?.PureFormat();
        }

        return cachedStudent.PureFormat();
    }

    public async Task<dynamic?> GetStudentAbsence(int studentId, bool detailed, DateTime? startDate = null, DateTime? endDate = null)
    {
        if (startDate > endDate)
            throw new ArgumentException("End date must be equal or larger than start date");

        var studentAbsences = (await _db.LoadData<AbsenceModel, dynamic>("StudentAbsenceGet", new { studentId }))
            .Where(x => x.DateFilter(startDate, endDate));

        var Absences = studentAbsences.Count();

        if (!detailed)
            return new { Absences };

        return new { studentAbsences, Absences };
    }

    public async Task<IEnumerable<dynamic>> GetFilteredStudent(string content = "", int? PageSize = 1000, int? Page = 1)
    {
        var students = await _db.LoadData<StudentModel, dynamic, ClassModel>(
            "dbo.StudentFastSearch",
            new { content, PageSize, Page },
            (Student, Class) =>
            {
                Student.Class = Class;
                return Student;
            },
            splitOn: "classId");
        return students.Select(student => student.PureFormat());
    }

    #endregion

    #region Actions
    public async Task InsertStudent(StudentModel student)
    {
        try
        {
            student.StudentId = await _db.ExecuteData("dbo.StudentAdd", new
            {
                student.StudentId,
                student.Name,
                student.LastName,
                student.FatherName,
                student.Phone,
                student.Class?.ClassId,
                student.BillRequired
            });
            if (student.StudentId != -1)
            {
                await GetStudentByID(student.StudentId);
            }
        }
        catch (Exception)
        {
            throw new Exception($"Student {student.Name} has not been added!");
        }
    }

    public async Task UpdateStudent(StudentModel student)
    {
        try
        {
            await _db.ExecuteData("dbo.StudentUpdate", new
            {
                Id = student.StudentId,
                student.Name,
                student.LastName,
                student.FatherName,
                student.Phone,
                student.Class?.ClassId,
                student.BillRequired
            });

            if (!_studentsCache.TryAdd(student.StudentId, student))
            {
                _studentsCache[student.StudentId] = student;
            }
        }
        catch (Exception)
        {
            throw new Exception($"Student {student.Name} has not been modifed!");
        }
    }

    public async Task DeleteStudent(int id)
    {
        try
        {
            await _db.ExecuteData("dbo.StudentDelete", new { Id = id });
            _studentsCache.TryRemove(id, out _);
        }
        catch (Exception)
        {
            throw new Exception($"Unable to remove student with Id: {id}, check if such student exists!");
        }
    }

    public async Task AddAbsences(IEnumerable<int> studentIds, DateTime Date)
    {
        try
        {
            if (!studentIds.Any())
                throw new ArgumentException("Must provide atleast one student id");

            foreach (int studentId in studentIds)
            {
                await _db.ExecuteData("StudentAbsenceAdd", new { studentId, Date });
                if (_studentsCache.TryGetValue(studentId, out StudentModel? cachedStudent))
                    cachedStudent.MissedDays++;
            }
        }
        catch (ArgumentException)
        {
            throw;
        }
        catch (Exception)
        {
            throw new Exception($"Error: Absences On {Date} has not been added");
        }
    }

    public async Task DeleteAbsence(int absenceId)
    {
        try
        {
            var studentId = await _db.ExecuteData("StudentAbsenceDelete", new { absenceId });

            if (_studentsCache.TryGetValue(studentId, out StudentModel? cachedStudent))
                cachedStudent.MissedDays--;
        }
        catch (Exception)
        {
            throw new Exception("Error: Absences has not been deleted");
        }
    }

    public async Task<IEnumerable<int>> GetRecordedAbsence(int classId, DateTime Date)
    {
        var studentsId = await _db.LoadData<int, dynamic>("dbo.StudentRecordedAbsence", new { classId, Date });
        return studentsId;
    }


    #endregion
}

