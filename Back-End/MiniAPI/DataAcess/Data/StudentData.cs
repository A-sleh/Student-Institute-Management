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
    private Dictionary<int, List<AbsenceModel>> _absenceCache = [];
    public StudentData(ISqlDataAccess db)
    { 
        this._db = db;
    }

    #region Data Request
    
    // Expensive Method
    private async Task GetStudentsList()
    {
        if (_studentsCache.Count == 0)
        {
            _studentsCache = (await _db.LoadData<StudentModel, dynamic, ClassModel>(
                "dbo.StudentGetAll",
                parameters: new { },
                (StudentModel Student, ClassModel Class) =>
                {
                    Student.Class = Class;
                    return Student;
                },
                splitOn: "ClassId"
                ))
                .ToDictionary(Key => Key.StudentId, Student => Student);
        }

        //Loading Absences Cache
        foreach (var student in _studentsCache)
        {
            await GetStudentAbsencesList(student.Key);
        }
    }

    private async Task GetStudentAbsencesList(int studentId)
    {
        if (!_absenceCache.ContainsKey(studentId))
        {
            _absenceCache.Add(studentId, []);
            _absenceCache[studentId] = (await _db.LoadData<AbsenceModel, dynamic>("StudentAbsenceGet", new { studentId })).ToList();
        }
    }

    public async Task<IEnumerable<dynamic>> GetStudents(int? classId = null, int? gradeId = null)
    {
        if(_studentsCache.Count == 0)
            await GetStudentsList();

        return _studentsCache
            .Where(student => (classId == null || student.Value.Class?.ClassId == classId) && (gradeId == null || student.Value.Class?.GradeId == gradeId))
            .Select(student =>
            {
                return student.Value.PureFormat();
            });
    }

    public async Task<StudentModel?> GetStudentByID(int id)
    {
        if (!_studentsCache.TryGetValue(id, out StudentModel? value))
        {
            var res = await _db.LoadData<StudentModel, dynamic, ClassModel>("dbo.StudentGet",
                parameters: new { Id = id },
                (StudentModel Student, ClassModel Class) =>
                {
                    Student.Class = Class;
                    return Student;
                },
                splitOn: "ClassId");

            if (res.First() == null)
                return null;

            value = res.First();
            _studentsCache.Add(id, value);

            return _studentsCache[id];
        }

        return value;
    }

    public async Task<dynamic> GetStudentAbsence(int studentId, bool detailed, DateTime? startDate = null, DateTime? endDate = null)
    {
        if (startDate > endDate)
            throw new InvalidParametersException("End date must be equal or larger than start date");

        await GetStudentAbsencesList(studentId);

        var Absences = _absenceCache[studentId].Count;

        if (!detailed)
            return new { Absences };

        return new { studentAbsences = _absenceCache[studentId], Absences };
    }

    #endregion

    #region Actions
    public async Task InsertStudent(StudentModel student)
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
        if (_studentsCache.Count > 0)
        {
            await GetStudentByID(id);
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
            // TODO GET THE GENERATED ID
            _absenceCache[studentId].Add(new AbsenceModel { Date = Date });
        }
    }

    public Task DeleteAbsence(int absenceId)
    {
        return _db.ExecuteData("StudentAbsenceDelete", new { absenceId });
    }

    #endregion
}

