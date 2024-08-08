using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data
{
    public class ClassData
    {
        private readonly ISqlDataAccess _db;

        public ClassData(ISqlDataAccess _db)
        {
            this._db = _db;
        }

        public async Task<IEnumerable<ClassModel>> GetClasses() =>
            await _db.LoadData<ClassModel, dynamic>("dbo.GetClasses", new { });

        public async Task<IEnumerable<ClassModel>> GetClass(int id) =>
            await _db.LoadData<ClassModel, dynamic>("dbo.GetClassByID", new { Id = id });
    }
}
