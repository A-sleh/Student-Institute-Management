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

        public async Task<TeacherModel?> GetTeacherById(int id)
        {
            var dic = new Dictionary<int, TeacherModel>();
            var res = await _db.LoadData<TeacherModel, dynamic, SubjectModel>("dbo.TeacherGetById",
                parameters: new { id },
                x:
                (Teacher, Subject) =>
                {
                    if (dic.TryGetValue(Teacher.TeacherId, out var CurrTeacher))
                    {
                        Teacher = CurrTeacher;
                    }
                    else
                    {
                        dic.Add(Teacher.TeacherId, Teacher);
                    }
                    Teacher.Subjects.Add(Subject);
                    return Teacher;
                },
                splitOn: "SubjectId"
                );
            return res.FirstOrDefault();
        }

        public async Task<IEnumerable<TeacherModel>> GetTeachersBySubject(int subId)
        {
            var res = await _db.LoadData<TeacherModel, dynamic>(
                "dbo.TeacherGetAllBySubId",
                parameters: new { SubjectId = subId }
                );
            return res;
        }

        public async Task<IEnumerable<TeacherModel>> GetAllTeachers()
        {
            var dic = new Dictionary<int, TeacherModel>();
            var res = await _db.LoadData<TeacherModel, dynamic, SubjectModel>("dbo.TeacherGetAll",
                parameters: new { },
                (Teacher, Subject) =>
                {
                    if (dic.TryGetValue(Teacher.TeacherId, out var CurrTeacher))
                    {
                        Teacher = CurrTeacher;
                    }
                    else
                    {
                        dic.Add(Teacher.TeacherId, Teacher);
                    }
                    Teacher.Subjects.Add(Subject);
                    return Teacher;
                },
                splitOn: "SubjectId"
                );
            return res.Distinct();
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
        public async Task AddSubjectToTeacher(List<TeacherSubjectModel> TSML)
        {
            throw new NotImplementedException();
        }
        public async Task DeleteTeacher(int id)
        {
            await _db.SaveData("dbo.TeacherDelete", new { id });
        }
    }
}
