using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data
{
    public class TeacherData
    {
        private readonly ISqlDataAccess _db;
        public TeacherData(ISqlDataAccess _db)
        {
            this._db = _db;
        }

        public async Task<TeacherModel?> GetTeacherById(int id)
        {
            var res = await _db.LoadData<TeacherModel, dynamic>("dbo.TeacherGetById",
                new { id });
            return res.FirstOrDefault();
        }

        public async Task<TeacherModel?> GetTeacherBySubject(int subId)
        {
            var res = await _db.LoadData<TeacherModel, dynamic>("dbo.TeacherGetBySubId",new { subId });
            return res.FirstOrDefault();
        }

        public async Task<IEnumerable<TeacherModel>> GetAllTeachers()
        {
            return await _db.LoadData<TeacherModel, dynamic>("dbo.TeacherGetAll", new { });
        }

        public async Task UpdateTeacher(TeacherModel model)
        {
            await _db.SaveData("dbo.Teacher", new {model});

        }
        public async Task InsertTeacher(TeacherModel model)
        {
            await _db.SaveData("dbo.TeacherInsert", new { 
                model
            });
        }
        public async Task DeleteTeacher(int id)
        {
            await _db.SaveData("dbo.TeacherDelete", new { id });
        }
    }
}
