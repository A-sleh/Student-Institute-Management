using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
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
    public async Task<StudentModel?> GetStudentByID(int Id)
    {
        var res = await _db.LoadData<StudentModel, dynamic>("dbo.GetStudent", new { Id });
        return res.FirstOrDefault();
    }
    public Task InsertStudent(StudentModel student) =>
        _db.SaveData("dbo.AddStudent", new
        {
            student.Name,
            student.Last_Name,
            student.Father_Name,
            student.Birthdate,
            student.Phone,
            student.Missed_Days,
            student.Class_Id,
            student.Bill_Required
        });
    public Task UpdateStudent(StudentModel student) =>
        _db.SaveData("dbo.UpdateStudent", student);
}
