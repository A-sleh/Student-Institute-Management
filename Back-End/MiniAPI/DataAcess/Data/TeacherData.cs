using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data
{
    public class TeacherData : ITeacherData
    {
        private readonly ISqlDataAccess _db;
        public TeacherData(ISqlDataAccess _db)
        {
            this._db = _db;
        }
        public async Task<IEnumerable<TeacherSubjectModel>> GetTeacherSubjectsById(int TeacherId)
        {
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
            return res;
        }

        public async Task<IEnumerable<TeacherModel>> GetTeachersBySubject(int subId)
        {
            var res = await _db.LoadData<TeacherModel, dynamic>(
                "dbo.TeachersGetAllBySubId",
                parameters: new { SubjectId = subId }
                );
            return res;
        }

        public async Task<IEnumerable<TeacherModel>> GetAllTeachers()
        {
            var res = await _db.LoadData<TeacherModel, dynamic>("dbo.TeacherGetAll",
                parameters: new { }
                );
            return res;
        }

        public async Task UpdateTeacher(TeacherModel model)
        {
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
            await _db.SaveData("dbo.TeacherDelete", new { TeacherId });
        }

        public async Task<TeacherModel?> GetTeacherById(int TeacherId)
        {
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
            return res.FirstOrDefault();
        }
    }
}
