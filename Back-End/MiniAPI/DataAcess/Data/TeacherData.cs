using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ExceptionServices;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data
{
    public class TeacherData : ITeacherData
    {
        // Teacher Data Exceptions
        private static readonly Exception ObjectNotFound = new ("Not Found, There is no such object with that id");
        private static readonly Exception EmptyResult = new ("Result Empty, check parameters and try again");
        private static readonly Exception NoSubjects = new ("Teacher Did not deal on any subject yet");

        private readonly ISqlDataAccess _db;
        public TeacherData(ISqlDataAccess _db)
        {
            this._db = _db;
        }
        public async Task<IEnumerable<TeacherSubjectModel>> GetTeacherSubjectsById(int TeacherId)
        {
            if(!(_db.LoadData<TeacherModel, dynamic>("dbo.TeacherGetById", new { TeacherId })).Result.Any())
                throw ObjectNotFound;
            var res = await _db.LoadData<TeacherSubjectModel, dynamic, SubjectModel>("dbo.TeacherGetById",
                parameters: new { TeacherId },
                x:
                (TS, Subject) =>
                {
                    TS.Subject = Subject;
                    return TS;
                },
                splitOn: "SubjectId"
                );    
            if(!res.Any())
                throw NoSubjects;
            return res;
        }

        public async Task<IEnumerable<TeacherModel>> GetTeachersBySubject(int subId)
        {
            if(!(_db.LoadData<SubjectModel, dynamic>("dbo.SubjectGetById", new { subId }).Result.Any()))
                throw ObjectNotFound;
            var res =  await _db.LoadData<TeacherModel, dynamic>(
                "dbo.TeachersGetAllBySubId",
                parameters: new { SubjectId = subId }
                );
            if (!res.Any())
                throw EmptyResult;
            return res;
        }

        public async Task<IEnumerable<TeacherModel>> GetAllTeachers()
        {
            var res = await _db.LoadData<TeacherModel, dynamic>("dbo.TeacherGetAll",
                parameters: new { }
                );
            if (!res.Any())
                throw EmptyResult;
            return res;
        }

        public async Task UpdateTeacher(TeacherModel model)
        {
            if (!_db.LoadData<TeacherModel, dynamic>("dbo.TeacherGetById", new {model.TeacherId}).Result.Any())
                throw ObjectNotFound;
            await _db.SaveData("dbo.TeacherUpdate", new
            {
                model.TeacherId,
                model.Name,
                model.LastName,
                model.Phone
            });

        }

        public async Task InsertTeacher(TeacherModel model)
        {
            await _db.SaveData("dbo.TeacherInsert", new
            {
                model.TeacherId,
                model.Name,
                model.LastName,
                model.Phone
            });
        }

        public async Task DeleteTeacher(int TeacherId)
        {
            if (!(_db.LoadData<TeacherModel, dynamic>("dbo.TeacherGetById", new { TeacherId })).Result.Any())
                throw ObjectNotFound;
            await _db.SaveData("dbo.TeacherDelete", new { TeacherId });
        }

        public async Task<TeacherModel?> GetTeacherById(int TeacherId)
        {
            if(!(_db.LoadData<TeacherModel, dynamic>("dbo.TeacherGetById", new { TeacherId }).Result.Any()))
                throw ObjectNotFound;
            TeacherModel? CurrTeacher = null;
            var res = await (_db.LoadData<dynamic, TeacherModel, TeacherSubjectModel, SubjectModel>("dbo.TeacherGetById",
                parameters: new { TeacherId },
                x: (Teacher , TSM, Subject) =>
                {
                    if (CurrTeacher == null)
                    {
                        CurrTeacher = Teacher;
                    }
                    else
                    {
                        Teacher = CurrTeacher;
                    }

                    if(TSM != null)
                    {
                        TSM.Subject = Subject;
                        Teacher.TeacherSubjects.Add(TSM);
                    }
                    return Teacher;
                },
                splitOn: "TeacherSubjectId, SubjectId"));
            if(res.Any())
                return res.First();
            else
                throw ObjectNotFound;
        }
    }
}
