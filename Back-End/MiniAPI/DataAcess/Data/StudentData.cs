using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
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
    public Task<IEnumerable<StudentModel>> GetStudents() =>
         _db.LoadData<StudentModel, dynamic>("dbo.StudentGetAll", new { });
    public async Task<StudentModel?> GetStudentByID(int id)
    {
<<<<<<< HEAD
        var res = await _db.LoadData<StudentModel, dynamic>("dbo.GetStudent", new { Id = id });
=======
        var res = await _db.LoadData<StudentModel, dynamic>("dbo.StudentGet", new { Id = id });
>>>>>>> fad73456fc89438228a7894797464c1ed56fd7a9
        return res.FirstOrDefault();
    }
    public Task InsertStudent(StudentModel student) =>
        _db.SaveData("dbo.StudentAdd", new
        {
            student.Id,
            student.Name,
            student.LastName,
            student.FatherName,
            student.Birthdate,
            student.Phone,
            student.ClassId,
            student.MissedDays,
            student.BillRequired
        });
    public Task UpdateStudent(StudentModel student) =>
        _db.SaveData("dbo.StudentUpdate", new
        {
            student.Id,
            student.Name,
            student.LastName,
            student.FatherName,
            student.Birthdate,
            student.Phone,
            student.ClassId,
            student.MissedDays,
            student.BillRequired
        });
    public Task DeleteStudent(int id) =>
        _db.SaveData("dbo.StudentDelete", new { Id = id });
}

