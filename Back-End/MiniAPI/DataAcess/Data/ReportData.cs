using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
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
        public async Task<dynamic> GetStudentRptAvg(int studentId, int reportId)
        {
            var avg = await _db.LoadData<int, dynamic>("dbo.TestGetStudentRptAvg", new { studentId, reportId });
            var res = new { Average = avg.FirstOrDefault() };
            return res;
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
                    if(reportModel.ReportId == 0)
                    {
                        reportModel = Report;
                    }
                    else
                    {
                        Report = reportModel;
                    }
                    if(Test != null)
                    {
                        Test.Subject = Subject;
                    }
                    Report.Tests.Add(Test);
                    return Report;
                },
                splitOn: "TestId, SubjectId");
            return res.FirstOrDefault();
        }
        public async Task<IEnumerable<ReportModel>> GetReports()
        {
            
            var result = await _db.LoadData<ReportModel, dynamic>("dbo.ReportGetAll", new { });
            return result;
        }
        public Task InsertReport(ReportModel report) =>
            _db.SaveData("dbo.ReportAdd", new
            {
                report.ReportTitle,
                report.StartDate,
                report.FinishDate
                
            });
        public Task UpdateReport(ReportModel report) =>
            _db.SaveData("dbo.ReportUpdate", report);
        public Task DeleteReport(int id) =>
            _db.SaveData("dbo.ReportDelete", new { Id = id });

    }
}
