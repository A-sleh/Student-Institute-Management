using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAcess.Exceptions;

namespace DataAcess.Data
{
    public class GradeData : IGradeData
    {
        private readonly ISqlDataAccess _db;

        public GradeData(ISqlDataAccess db)
        {
            this._db = db;
        }

        public async Task AddGrade(GradeModel model)
        {
             await _db.ExecuteData("dbo.GradeAdd", model);
        }

        public async Task DeleteGrade(int gradeId)
        {
            await _db.ExecuteData("dbo.GradeDelete", new { gradeId });
        }

        public Task<IEnumerable<GradeModel>> GetAllGrades(string? filter)
        {
            Task<IEnumerable<GradeModel>> Grades = _db.LoadData<GradeModel, dynamic>("dbo.GradeGetAll", new { filter });
            return Grades;
        }

        public async Task UpdateGrade(GradeModel model)
        {
            await _db.ExecuteData("dbo.GradeUpdate", model);
        }

        public Task<IEnumerable<dynamic>> GetGradesCount(int? gradeId)
        {
            var grades = _db.LoadData<dynamic, dynamic>("dbo.GradeGetCount", new { gradeId });
            return grades;
        }
    }
}
