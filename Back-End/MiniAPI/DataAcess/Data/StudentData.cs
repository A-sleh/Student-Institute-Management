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
         _db.LoadData<StudentModel, dynamic>("dbo.GetStudents", new { });

    public async Task<StudentModel?> GetStudentByID(int id)
    {
        var res = await _db.LoadData<StudentModel, dynamic>("dbo.GetStudent", new { Id = id });
        return res.FirstOrDefault();
    }

    public Task InsertStudent(StudentModel student) =>
        _db.SaveData("dbo.AddStudent", new
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
        _db.SaveData("dbo.UpdateStudent", new
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
        _db.SaveData("dbo.DeleteStudent", new { Id = id });
}

