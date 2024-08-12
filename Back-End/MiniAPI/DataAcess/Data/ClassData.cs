using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public Task<IEnumerable<ClassModel>> GetClasses() =>
            _db.LoadData<ClassModel, dynamic>("dbo.ClassGetAll", new { });
        public async Task<ClassModel?> GetClass(int id)
        {
            var res = await _db.LoadData<ClassModel, dynamic>("dbo.ClassGet", new { Id = id });
            return res.FirstOrDefault();
        }
        public Task InsertClass(ClassModel classModel) =>
            _db.SaveData<ClassModel>("dbo.ClassAdd", classModel);
        public Task UpdateClass(ClassModel classModel) =>
            _db.SaveData<ClassModel>("dbo.ClassUpdate", classModel);
        public Task DeleteClass(int id) =>
            _db.SaveData("dbo.ClassDelete", new { Id = id });
    }
}
