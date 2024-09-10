using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data
{
    public class ReportData : IReportData
    {
        private readonly ISqlDataAccess _db;
        public ReportData(ISqlDataAccess _db)
        {
            this._db = _db;
        }
        public async Task<ReportModel?> GetReport(int id)
        {
            var res = await _db.LoadData<ReportModel, dynamic>("dbo.ReportGet", new { Id = id });
            if(res == null){
                throw new Exception("Not Found");
            }
            return res.First();
        }
        public async Task<IEnumerable<ReportModel>> GetReports()
        {
            
            var result = await _db.LoadData<ReportModel, dynamic>("dbo.ReportGetAll", new { });
            if(result == null){
                throw new Exception("There is no reports");
            }
            return result;
        }

        public Task InsertReport(ReportModel report) =>
            _db.SaveData("dbo.ReportAdd", report);
        public Task UpdateReport(ReportModel report) =>
            _db.SaveData("dbo.ReportUpdate", report);
        public Task DeleteReport(int id) =>
            _db.SaveData("dbo.ReportDelete", new { Id = id });

    }
}
