using DataAcess.DBAccess;
using DataAcess.Models;
using System;
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
    public StudentData(ISqlDataAccess db)
    {
        this._db = db;
    }

    #region Data Request
    
    public async Task<IEnumerable<dynamic>> GetStudents(int? classId = null, int? gradeId = null)
    {
        var res = await _db.LoadData<StudentModel, dynamic, ClassModel>(
            "dbo.StudentGetAll",
            parameters: new { },
            (StudentModel Student, ClassModel Class) =>
            {
                Student.Class = Class;
                return Student;
            },
            splitOn: "ClassId"
            );
        return res
            .Where(x => (classId == null || x.Class?.ClassId == classId) && (gradeId == null || x.Class?.GradeId == gradeId))
            .Select(x =>
        {
            return x.PureFormat();
        });
    }
    public async Task<StudentModel?> GetStudentByID(int id)
    {
        var res = await _db.LoadData<StudentModel, dynamic, ClassModel>("dbo.StudentGet",
            parameters: new { Id = id },
            (StudentModel Student, ClassModel Class) => {
            Student.Class = Class;
            return Student;
        },
            splitOn: "ClassId");
        return res == null ? throw new Exception("no student has such Id") : res.First();
    }
    #endregion

    #region Actions
    public Task InsertStudent(StudentModel student) =>
        _db.ExecuteData("dbo.StudentAdd", new
        {
            student.StudentId,
            student.Name,
            student.LastName,
            student.FatherName,
            student.Birthdate,
            student.Phone,
            student.Class?.ClassId,
            student.MissedDays,
            student.BillRequired
        });
    public Task UpdateStudent(StudentModel student) =>
        _db.ExecuteData("dbo.StudentUpdate", new
        {
            Id = student.StudentId,
            student.Name,
            student.LastName,
            student.FatherName,
            student.Birthdate,
            student.Phone,
            student.Class?.ClassId,
            student.MissedDays,
            student.BillRequired
        });
    public Task DeleteStudent(int id) =>
        _db.ExecuteData("dbo.StudentDelete", new { Id = id });
    #endregion
}

