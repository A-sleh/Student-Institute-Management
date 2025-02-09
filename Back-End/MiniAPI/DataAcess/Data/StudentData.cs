using DataAcess.DBAccess;
using DataAcess.Exceptions;
using DataAcess.Models;
using System;
using System.Buffers;
using System.Collections.Generic;
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
    private readonly Dictionary<int, StudentModel> _studentsCache = [];
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
        var students = (await _db.LoadData<StudentModel, dynamic, ClassModel>(
            "dbo.StudentGetAll",
            parameters: new { classId },
            (StudentModel Student, ClassModel Class) =>
            {
                Student.Class = Class;
                return Student;
            },
            splitOn: "ClassId"));

        foreach(var student in students)
        {
            _studentsCache.TryAdd(student.StudentId, student);
        }
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
        return _studentsCache
            .Where(student => classId is null || student.Value.Class?.ClassId == classId)
            .Select(student => student.Value.PureFormat());
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

    public async Task<dynamic?> GetStudentAbsence(int studentId, bool detailed, DateTime? startDate = null, DateTime? endDate = null)
    {
        if (startDate > endDate)
            throw new InvalidParametersException("End date must be equal or larger than start date");

        var studentAbsences = (await _db.LoadData<AbsenceModel, dynamic>("StudentAbsenceGet", new { studentId }))
            .Where(x => x.DateFilter(startDate, endDate));

        var Absences = studentAbsences.Count();

        if (_studentsCache.TryGetValue(studentId, out StudentModel? cachedStudent))
        {
            cachedStudent.MissedDays = Absences;
        }
        else
        {
            cachedStudent = new StudentModel() { MissedDays = Absences };
        }

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
                student.Birthdate,
                student.Phone,
                student.Class?.ClassId,
                student.BillRequired
            });

            if(_studentsCache.TryGetValue(student.StudentId, out var cachedStudent))
            {
                cachedStudent = student;
            }
            else
            {
                _studentsCache.Add(student.StudentId, student);
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
            _studentsCache.Remove(id);
        }
        catch (Exception)
        {
            throw new Exception($"Unable to remove student with Id: {id}");
        }
    }

    public  async Task AddAbsences(IEnumerable<int> studentIds, DateTime Date)
    {
        try
        {
            if (!studentIds.Any())
                throw new InvalidParametersException("Must provide atleast one student id");

            foreach (int studentId in studentIds)
            {
                await _db.ExecuteData("StudentAbsenceAdd", new { studentId, Date });
                if (_studentsCache.TryGetValue(studentId, out StudentModel? cachedStudent))
                    cachedStudent.MissedDays++;
            }
        }
        catch (InvalidParametersException)
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

            if(_studentsCache.TryGetValue(studentId, out StudentModel? cachedStudent))
                cachedStudent.MissedDays--;
        }
        catch (Exception)
        {
            throw new Exception("Error: Absences has not been deleted");
        }
    }

    #endregion
}

