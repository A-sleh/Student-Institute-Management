using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
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
        // Get A Report With All Tests
        public async Task<ReportModel?> GetReport(int id)
        {
            ReportModel reportModel = new();
            var res = 
                await _db.LoadData<dynamic, ReportModel, TestModel, SubjectModel>(
                "dbo.ReportGet",
                new { Id = id },
                x: (Report, Test, Subject) =>
                {
                    Test.Subject = Subject;
                    if(reportModel.ReportId == 0)
                    {
                        reportModel = Report;
                    }
                    else
                    {
                        Report = reportModel;
                        Report.Tests.Add(Test);
                    }
                    return Report;
                },
                splitOn: "TestId, SubjectId");
            return res.First();
        }
        public async Task<IEnumerable<ReportModel>> GetReports()
        {
            
            var result = await _db.LoadData<ReportModel, dynamic>("dbo.ReportGetAll", new { });
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
