﻿using DataAcess.DBAccess;
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
        public async Task<IEnumerable<SubjectModel>> GetSubjects()
        {
            return await _db.LoadData<SubjectModel, dynamic>("dbo.SubjectGetAll", new { });
        }
        public async Task<SubjectModel?> GetSubject(int id)
        {
            var res = await _db.LoadData<SubjectModel, dynamic>("dbo.SubjectGet", new { Id = id });
            return res.FirstOrDefault();
        }
        public Task InsertSubject(SubjectModel subject) =>
            _db.ExecuteData("dbo.SubjectAdd", new
            {
                subject.SubjectId,
                subject.Subject,
                subject.MaximumMark,
                subject.GradeId
            });

        public Task UpdateSubject(SubjectModel subject) =>
            _db.ExecuteData("dbo.SubjectUpdate", new
            {
                subject.SubjectId,
                subject.Subject,
                subject.MaximumMark,
                subject.GradeId
            });
        public Task DeleteSubject(int id) =>
            _db.ExecuteData("dbo.SubjectDelete", new { Id = id });
    }
}
