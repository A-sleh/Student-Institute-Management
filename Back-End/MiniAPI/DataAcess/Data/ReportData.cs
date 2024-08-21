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
        public ReportData()
        {
            
        }
        public ReportData(ISqlDataAccess _db)
        {
            this._db = _db;
        }
        public async Task<ReportModel?> GetReport(int id)
        {
            var res = await _db.LoadData<ReportModel, dynamic>("dbo.ReportGet", new { Id = id });
            return res.FirstOrDefault();
        }
        public async Task<IEnumerable<ReportModel>> GetReports() =>
            await _db.LoadData<ReportModel, dynamic>("dbo.ReportGetAll", new { });
        public Task InsertReport(ReportModel report) =>
            _db.SaveData("dbo.ReportAdd", report);
        public Task UpdateReport(ReportModel report) =>
            _db.SaveData("dbo.ReportUpdate", report);
        public Task DeleteReport(int id) =>
            _db.SaveData("dbo.ReportDelete", new { Id = id });

    }
}
