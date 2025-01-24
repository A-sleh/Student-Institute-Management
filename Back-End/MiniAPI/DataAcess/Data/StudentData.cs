using DataAcess.DBAccess;
using DataAcess.Exceptions;
using DataAcess.Models;
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data;

public class StudentData : IStudentData
{
    private readonly ISqlDataAccess _db;
    private Dictionary<int, StudentModel> _studentsCache = [];
    public StudentData(ISqlDataAccess db)
    { 
        this._db = db;
    }

    #region Data Request
    
    // Expensive Method
    private async Task LoadStudentModelList()
    {

        var students = (await _db.LoadData<StudentModel, dynamic, ClassModel>(
            "dbo.StudentGetAll",
            parameters: new { },
            (StudentModel Student, ClassModel Class) =>
            {
                Student.Class = Class;
                return Student;
            },
            splitOn: "ClassId")).Where(studnet => !_studentsCache.ContainsKey(studnet.StudentId));
        foreach(var student in students)
        {
            _studentsCache.Add(student.StudentId, student);
        }
    }


    public async Task<IEnumerable<dynamic>> GetStudents(int? classId = null, int? gradeId = null)
    {
       await LoadStudentModelList();

        return _studentsCache
            .Where(student => (classId == null || student.Value.Class?.ClassId == classId) && (gradeId == null || student.Value.Class?.GradeId == gradeId))
            .OrderBy(student => student.Value.StudentId)
            .Select(student =>
            {
                return student.Value.PureFormat();
            });
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

    public async Task<dynamic?> GetStudentByID(int id)
    {

        if (!_studentsCache.TryGetValue(id, out StudentModel? cachedStudent))
        {
            var student = await GetStudentModelById(id);
            if (student != null)
            {
                _studentsCache.Add(id, student);
                return _studentsCache[id].PureFormat();
            }
            return student;
        }

        return cachedStudent.PureFormat();
    }

    public async Task<dynamic> GetStudentAbsence(int studentId, bool detailed, DateTime? startDate = null, DateTime? endDate = null)
    {
        if (startDate > endDate)
            throw new InvalidParametersException("End date must be equal or larger than start date");

        var studentAbsences = (await _db.LoadData<AbsenceModel, dynamic>("StudentAbsenceGet", new { studentId }))
            .Where(x => x.DateFilter(startDate, endDate));

        var Absences = studentAbsences.Count();

        if (!detailed)
            return new { Absences };

        return new { studentAbsences, Absences };
    }

    #endregion

    #region Actions
    public async Task InsertStudent(StudentModel student)
    {
        try
        {
            int id = await _db.ExecuteData("dbo.StudentAdd", new
            {
                student.StudentId,
                student.Name,
                student.LastName,
                student.FatherName,
                student.Birthdate,
                student.Phone,
                student.Class?.ClassId,
                student.BillRequired
            });
            await GetStudentByID(id);
        }
        catch(Exception)
        {
            throw new Exception($"student {student.Name} has not been added!");
        }
    }

    public async Task UpdateStudent(StudentModel student)
    {
        await _db.ExecuteData("dbo.StudentUpdate", new
        {
            Id = student.StudentId,
            student.Name,
            student.LastName,
            student.FatherName,
            student.Birthdate,
            student.Phone,
            student.Class?.ClassId,
            student.BillRequired
        });

        student.MissedDays = _studentsCache[student.StudentId].MissedDays;
        _studentsCache[student.StudentId] = student;
    }

    public async Task DeleteStudent(int id)
    {
        await _db.ExecuteData("dbo.StudentDelete", new { Id = id });
        _studentsCache.Remove(id);
    }

    public  async Task AddAbsences(IEnumerable<int> studentIds, DateTime Date)
    {
        if (!studentIds.Any())
            throw new InvalidParametersException("Must provide atleast one student id");

        foreach (int studentId in studentIds)
        {
            await _db.ExecuteData("StudentAbsenceAdd", new { studentId, Date });
        }
    }

    public Task DeleteAbsence(int absenceId)
    {
        return _db.ExecuteData("StudentAbsenceDelete", new { absenceId });
    }

    #endregion
}

