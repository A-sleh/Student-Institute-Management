using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data
{
    public class ClassData : IClassData
    {
        private static readonly Exception ClassNotFoundException = new("Not Found, there is no such class with that id");
        private static readonly Exception EmptyResultException = new("Result Empty, it does not contain any data");
        private readonly ISqlDataAccess _db;
        public ClassData(ISqlDataAccess _db)
        {
            this._db = _db;
        }
        private void CheckClassAvailability(int classId)
        {
            var existclass = _db.LoadData<ClassModel, dynamic>("dbo.ClassGetById", new { classId });
            if (!existclass.Result.Any() || existclass == null)
                throw ClassNotFoundException;
            return;
        }
        public async Task<IEnumerable<dynamic>> GetClassSubjects(int classId)
        {
            CheckClassAvailability(classId);
            var res = await _db.LoadData<dynamic, dynamic>("dbo.ClassGetSubjects", new { classId });
            if(!res.Any())
                throw EmptyResultException;
            return res;
        }
        public async Task<IEnumerable<ClassModel>> GetClasses()
        {
            var dic = new Dictionary<int, ClassModel>();
            var res = await _db.LoadData<ClassModel, dynamic, StudentModel>(
                "dbo.ClassGetAll",
                new { },
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
            if(!res.Any())
                throw EmptyResultException;
            return res.Distinct();
        }
        public async Task<ClassModel?> GetClassDetails(int id)
        {
            CheckClassAvailability(id);
            var dic = new Dictionary<int, ClassModel>();
            var res = await _db.LoadData<ClassModel, dynamic, StudentModel>(
                "dbo.ClassGetDetails",
                new { Id = id },
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
                    if (Class != null)
                    {
                        Class.Students.Add(Student);
                        return Class;
                    }
                    else throw ClassNotFoundException;
                },
                splitOn: "StudentId"
            );
            var Class = dic[id];
            return Class;
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
            CheckClassAvailability(classModel.ClassId);
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
            CheckClassAvailability(id);
            return _db.SaveData("dbo.ClassDelete", new { Id = id });
        }
    }
}
