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
        #region Data Request
        public async Task<IEnumerable<TestModel>> GetClassTests(int classId, bool? showOnlyUncorrected, bool showLinked = true)
        {
            var res = await _db.LoadData<dynamic, TestModel, SubjectModel, ReportModel>("dbo.ClassGetTests", new { classId, showOnlyUncorrected },
            (Test, Subject, Report) =>
            {
                Test.Subject = Subject;
                Test.Report = Report;
                return Test;
            },
            splitOn: "SubjectId, ReportId");
            return res.Where(t => showLinked == true || t.Report == null);
        }
        public async Task<IEnumerable<dynamic>> GetClassSubjects(int classId)
        {
            var classSubjects = await _db.LoadData<dynamic, dynamic>("dbo.ClassGetSubjects", new { classId });
            return classSubjects;
        }
        private void ValidateId(int classId)
        {
            if(!_db.LoadData<dynamic,dynamic>("dbo.ClassGetById", new { classId }).Result.Any())
                throw new ArgumentException("Not Found, No Such class has this id");
        }
        public async Task<IEnumerable<dynamic>> GetClassteachers(int classId)
        {
            var mappedTeachers = new Dictionary<int, TeacherModel>();
            _ = await _db.LoadData<dynamic, TeacherModel, TeacherSubjectModel, SubjectModel>(
                "dbo.ClassGetTeachers",
                new { classId },
                (Teacher, TeacherSubject, Subject) =>
                {
                    TeacherSubject.Subject = Subject;
                    if(mappedTeachers.TryGetValue(Teacher.TeacherId, out var model))
                    {
                        Teacher = model;
                    }
                    else
                    {
                        mappedTeachers.Add(Teacher.TeacherId, Teacher);
                    }
                    Teacher.TeacherSubjects.Add(TeacherSubject);
                    return Teacher;
                },
                splitOn: "TeacherSubjectId, SubjectId");

            return mappedTeachers.Select(teacher => new
            {
                teacher.Value.TeacherId,
                teacher.Value.Name,
                teacher.Value.LastName,
                teacherSubject = teacher.Value.TeacherSubjects.Select(ts => new { ts?.TeacherSubjectId, ts?.Salary, ts?.Subject })
            });
        }
        public async Task<IEnumerable<ClassModel>> GetClasses(int? gradeId = null)
        {
            var mappedClasses = new Dictionary<int, ClassModel>();
            _ = await _db.LoadData<ClassModel, dynamic, StudentModel>(
                "dbo.ClassGetAll",
                new { gradeId },
                (Class, Student) =>
                {
                    if (mappedClasses.TryGetValue(Class.ClassId, out var ExistClass))
                    {
                        Class = ExistClass;
                    }
                    else
                    {
                        mappedClasses.Add(Class.ClassId, Class);
                    }
                    Class.Students.Add(Student);
                    return Class;
                },
                splitOn: "StudentId"
            );
            return mappedClasses.Select(x => x.Value);
        }
        public async Task<ClassModel?> GetClassDetails(int id)
        {
            ClassModel? currClass = null;
            _ = await _db.LoadData<ClassModel, dynamic, StudentModel>(
                "dbo.ClassGetDetails",
                new { Id = id },
                (Class, Student) =>
                {
                    if (currClass == null)
                    {
                        currClass = Class;
                    }
                    else
                    {
                        Class = currClass;
                    }
                    if(Student != null)
                        Class.Students.Add(Student);
                    return Class;
                },
                splitOn: "StudentId"
            );
            return currClass;
        }
        #endregion

        #region Actions
        public Task InsertClass(ClassModel classModel) =>
            _db.ExecuteData("dbo.ClassAdd", new
            {
                classModel.ClassId,
                classModel.Title,
                classModel.Capacity,
                classModel.Gender,
                classModel.GradeId
            });
        public Task UpdateClass(ClassModel classModel)
        {
            //ValidateId(classModel.ClassId);
            return _db.ExecuteData("dbo.ClassUpdate", new
            {
                classModel.ClassId,
                classModel.Title,
                classModel.Capacity,
                classModel.Gender,
                classModel.GradeId
            });
        }
        public Task DeleteClass(int id)
        {
            //ValidateId(id);
            return _db.ExecuteData("dbo.ClassDelete", new { Id = id });
        }
        #endregion
    }
}
