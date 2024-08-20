﻿using DataAcess.DBAccess;
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
    public StudentData()
    {

    }
    public StudentData(ISqlDataAccess db)
    {
        this._db = db;
    }
    public Task<IEnumerable<StudentModel>> GetStudents()
    {
        var res = _db.LoadData<StudentModel, dynamic, ClassModel>(
            "dbo.StudentGetAll",
            parameters: new { },
            (StudentModel Student, ClassModel Class) =>
            {
                Student.Class = Class;
                return Student;
            },
            splitOn: "ClassId"
            );
        return res;
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
        return res.FirstOrDefault();
    }
    public Task InsertStudent(StudentModel student) =>
        _db.SaveData("dbo.StudentAdd", new
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
        _db.SaveData("dbo.StudentUpdate", new
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
    public Task DeleteStudent(int id) =>
        _db.SaveData("dbo.StudentDelete", new { Id = id });
}

