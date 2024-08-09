using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data
{
    public class SubjectData : ISubjectData
    {
        private readonly ISqlDataAccess _db;

        public SubjectData(ISqlDataAccess _db)
        {
            this._db = _db;
        }

        public async Task<IEnumerable<SubjectModel>> GetSubjects() =>
            await _db.LoadData<SubjectModel, dynamic>("dbo.SubjectGetAll", new { });

        public async Task<SubjectModel?> GetSubject(int id)
        {
            var res = await _db.LoadData<SubjectModel, dynamic>("dbo.SubjectGet", new { Id = id });
            return res.FirstOrDefault();
        }

        public Task InsertSubject(SubjectModel subject) =>
            _db.SaveData("dbo.SubjectAdd", subject);

        public Task UpdateSubject(SubjectModel subject) =>
            _db.SaveData("dbo.SubjectUpdate", subject);

        public Task DeleteSubject(int id) =>
            _db.SaveData("dbo.SubjectDelete", new { Id = id });
    }
}
