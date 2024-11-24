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

        public async Task<IEnumerable<dynamic>> GetGradesCount(bool subjects, bool students, bool classes)
        {
            if((subjects && students) || (subjects && classes) || (students && classes) )
                throw new InvalidParametersException("Must Provide only 1 parameter");
            var result = await _db.LoadData<dynamic, dynamic>("dbo.GradeGetCount", new { subjects, students, classes });
            return result.Select(x =>
            {
                var jsonFormat = new
                {
                    x.gradeId,
                    x.grade,
                    x.count
                };
                return jsonFormat;
            });
        }
    }
}
