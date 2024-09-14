using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data
{

    public class TeacherSubjectData : ITeacherSubjectData
    {
        // Teacher Subjects Exceptions
        private static readonly Exception EmptyOrInvalidClassException = new("Class is Empty or it is not exist");
        private static readonly Exception noClassForTeacherException = new("Teacher Does not teach in any class yet");
        private static readonly Exception InvalidParametersException = new("Invalid Paramters");

        private readonly ISqlDataAccess _db;
        public TeacherSubjectData(ISqlDataAccess _db)
        {
            this._db = _db;
        }
        private bool ValidClassAndSubjectId(int teacherSubjectId, int classId)
            => (_db.LoadData<TeacherSubjectModel, dynamic>("dbo.TeacherSubjectGetById", new { teacherSubjectId }).Result.Any())
                &&
                (_db.LoadData<ClassModel, dynamic>("dbo.ClassGetById", new { classId }).Result.Any());
        public async Task<IEnumerable<TeacherModel>> GetClassTeachers(int classId)
        {
            var dic = new Dictionary<int, TeacherModel>();
            var res = await (_db.LoadData<dynamic, TeacherModel, SubjectModel, TeacherSubjectModel>(
                "dbo.TeacherSubjectGetByClass",
                new { classId },
                x: (Teacher, Subject, TSM) =>
                {
                    TSM.Subject = Subject;
                    if (dic.TryGetValue(Teacher.TeacherId, out var model))
                    {
                        Teacher = model;
                    }
                    else
                    {
                        dic.Add(Teacher.TeacherId, Teacher);
                    }
                    Teacher.TeacherSubjects.Add(TSM);
                    return Teacher;
                },
                splitOn: "SubjectId, TeacherSubjectId"
                ));
            if(!res.Any())
                throw EmptyOrInvalidClassException;
            return res.Distinct();
        }

        public async Task<IEnumerable<TeacherSubjectModel>> GetTeacherClasses(int teacherId)
        {
            var dic = new Dictionary<int, TeacherSubjectModel>();
            var res = await _db.LoadData<dynamic, TeacherSubjectModel, SubjectModel, ClassModel>(
                "dbo.TeacherGetClassesAndSubjects",
                parameters:
                new { teacherId },
                (TSM, Subject, Class) =>
                {
                    TSM.Subject = Subject;
                    if (dic.TryGetValue(TSM.TeacherSubjectId, out var existTSM))
                    {
                        TSM = existTSM;
                    }
                    else
                    {
                        dic.Add(TSM.TeacherSubjectId, TSM);
                    }
                    TSM.Classes.Add(Class);
                    return TSM;
                },
                splitOn: "SubjectId, ClassId"
                );
            if (!res.Any())
                throw noClassForTeacherException;
            return res.Distinct();
        }

        public async Task InsertTeacherSubjects(TeacherSubjectModel model) 
            => await _db.SaveData("dbo.TeacherSubjectInsert", new
            {
                model.TeacherId,
                model.Subject?.SubjectId,
                model.Salary
            });

        public async Task LinkTeacherWithClass(int teacherSubjectId, int classId)
        {
            if (!ValidClassAndSubjectId(teacherSubjectId, classId))
                throw InvalidParametersException;
            await _db.SaveData("dbo.TeacherSubjectAddClass", new { teacherSubjectId, classId });
        }

        public async Task UpdateTeacherSubject(int TeacherId, int SubjectId, int Salary)
        {
            if (!_db.LoadData<TeacherSubjectModel, dynamic>("dbo.TeacherSubjectGetId", new { TeacherId, SubjectId })
                .Result
                .Any())
                throw InvalidParametersException;
            await _db.SaveData("dbo.TeacherSubjectUpdate", new
            {
                TeacherId,
                SubjectId,
                Salary
            });
        }

        public async Task DeleteSubjectForTeacher(int teacherSubjectId)
        {
            if (!_db.LoadData<TeacherSubjectModel, dynamic>("dbo.TeacherSubjectGetById", new { teacherSubjectId }).Result.Any())
                throw InvalidParametersException;
            await _db.SaveData("dbo.TeacherSubjectDelete", new { teacherSubjectId });
        }

        public async Task DeleteTeacherFromClass(int teacherSubjectId, int classId)
        {
            if (!ValidClassAndSubjectId(teacherSubjectId, classId))
                throw InvalidParametersException;
            await _db.SaveData("dbo.TeacherSubjectDeleteClass",
                        new
                        {
                            teacherSubjectId,
                            classId
                        });
        }
    }
}
