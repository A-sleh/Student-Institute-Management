using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data
{
    public class ClassData : IClassData
    {
        private readonly ISqlDataAccess _db;
        public ClassData(ISqlDataAccess _db)
        {
            this._db = _db;
        }
        public async Task<IEnumerable<dynamic>> GetClassSubjects(int classId)
        {
            var res = await _db.LoadData<dynamic, dynamic>("dbo.ClassGetSubjects", new { classId });
            return res;
        }
        public void ValidateId(int classId)
        {
            if(!_db.LoadData<dynamic,dynamic>("dbo.ClassGetById", new { classId }).Result.Any())
                throw new Exception("Not Found, No Such class has this id");
        }

        public async Task<IEnumerable<TeacherModel>> GetClassteachers(int classId)
        {
            var dic = new Dictionary<int, TeacherModel>();
            var res = await _db.LoadData<dynamic, TeacherModel, TeacherSubjectModel, SubjectModel>(
                "dbo.ClassGetTeachers",
                new { classId },
                (Teacher, TeacherSubject, Subject) =>
                {
                    TeacherSubject.Subject = Subject;
                    if(dic.TryGetValue(Teacher.TeacherId, out var model))
                    {
                        Teacher = model;
                    }
                    else
                    {
                        dic.Add(Teacher.TeacherId, Teacher);
                    }
                    Teacher.TeacherSubjects.Add(TeacherSubject);
                    return Teacher;
                },
                splitOn: "TeacherSubjectId, SubjectId");
            return res.Distinct();
        }
        public async Task<IEnumerable<ClassModel>> GetClasses(int? limit)
        {
            var dic = new Dictionary<int, ClassModel>();
            var res = await _db.LoadData<ClassModel, dynamic, StudentModel>(
                "dbo.ClassGetAll",
                new { limit },
                (Class, Student) =>
                {
                    if (dic.TryGetValue(Class.ClassId, out var ExistClass))
                    {
                        Class = ExistClass;
                    }
                    else
                    {
                        dic.Add(Class.ClassId, Class);
                    }
                    Class.Students.Add(Student);
                    return Class;
                },
                splitOn: "StudentId"
            );
            return res.Distinct();
        }
        public async Task<ClassModel?> GetClassDetails(int id)
        {
            ClassModel? CurrClass = null;
            var res = await _db.LoadData<ClassModel, dynamic, StudentModel>(
                "dbo.ClassGetDetails",
                new { Id = id },
                (Class, Student) =>
                {
                    if (CurrClass == null)
                    {
                        CurrClass = Class;
                    }
                    else
                    {
                        Class = CurrClass;
                    }
                    Class.Students.Add(Student);
                    return Class;
                },
                splitOn: "StudentId"
            );
            return res.FirstOrDefault();
        }
        public Task InsertClass(ClassModel classModel) =>
            _db.SaveData("dbo.ClassAdd", new
            {
                classModel.ClassId,
                classModel.Title,
                classModel.Capacity,
                classModel.Gender,
                classModel.Grade
            });
        public Task UpdateClass(ClassModel classModel)
        {
            ValidateId(classModel.ClassId);
            return _db.SaveData("dbo.ClassUpdate", new
            {
                classModel.ClassId,
                classModel.Title,
                classModel.Capacity,
                classModel.Gender,
                classModel.Grade
            });
        }
        public Task DeleteClass(int id)
        {
            ValidateId(id);
            return _db.SaveData("dbo.ClassDelete", new { Id = id });
        }
    }
}
