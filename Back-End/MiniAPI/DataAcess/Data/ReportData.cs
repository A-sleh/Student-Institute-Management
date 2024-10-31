using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.WebSockets;
using System.Runtime.CompilerServices;
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
        #region Data Request
        public async Task<IEnumerable<dynamic>> GetStudentsResultSpecifiedByReportAndClass(int reportId, int classId)
        {
            var dic = new Dictionary<int, StudentModel>();
            var students = await _db.LoadData<dynamic, StudentModel, TestModel, SubjectModel, TestMarkModel>("dbo.StudentGetFullResultByRepAndClass",
                new
                {
                    reportId,
                    classId
                },
                (student, test, subject, testMark) =>
                {
                    test.Subject = subject;
                    testMark.Test = test;
                    if (dic.TryGetValue(student.StudentId, out var studentModel))
                    {
                        student = studentModel;
                    }
                    else
                    {
                        dic.Add(student.StudentId, student);
                    }
                    student.TestMark.Add(testMark);
                    return student;
                },
                splitOn: "TestId, SubjectId, TestMarkId");
            students = students.Distinct();

            var examAvg = await GetStudentsRptAvg(reportId, classId, "revision");
            var quizAvg = await GetStudentsRptAvg(reportId, classId, "quiz");
            var pureMark = await GetStudentsPureMark(reportId, classId);

            var res = students.Select(x =>
            {
                var eAvg = examAvg.Where(t => t.StudentId == x.StudentId).FirstOrDefault();
                var qAvg = quizAvg.Where(q => q.StudentId == x.StudentId).FirstOrDefault();
                var pAvg = pureMark.Where(p => p.StudentId == x.StudentId).FirstOrDefault();
                var obj = new { quizAverage = qAvg?.Average, examAverage = eAvg?.Average, pureMark = pAvg?.PureMark, student = x };
                return obj;
            });
            return res;
        }
        public async Task<IEnumerable<dynamic>> GetStudentsPureMark(int reportId, int classId)
        {
            var res = await _db.LoadData<dynamic, dynamic>("dbo.ReportGetStudentAvgPure", new {  reportId, classId });
            return res;
        }
        public async Task LinkReportWithTests(int reportId, List<int> tests)
        {
            foreach(var testId in tests)
            {
                await _db.ExecuteData("dbo.ReportLinkWithTests", new { reportId, testId });
            }
            
        }

        public async Task<IEnumerable<dynamic>> GetStudentResult(int studentId)
        {
            var res = await _db.LoadData<dynamic, dynamic>("dbo.ReportGetStudentReportsResults", new { studentId });
            return res;
        }

        public async Task<dynamic?> GetStudentTotalResult(int studentId, int reportId)
        {
            var res = await _db.LoadData<dynamic, dynamic>("dbo.ReportGetStudentTotalResult", new { studentId, reportId });
            return res;
        }
        public async Task<IEnumerable<dynamic>> GetStudentsReportResult(int reportId, int? classId)
        {
            var res = await _db.LoadData<dynamic, dynamic>("dbo.ReportGetStudentsResults", new { reportId, classId });
            return res;
        }

        public async Task<IEnumerable<dynamic>> GetStudentsRptAvg(int? studentId, int? reportId, string? type)
        {
            //var avg = await _db.LoadData<int, dynamic>("dbo.TestGetStudentRptAvg", new { studentId, reportId });
            var res = await _db.LoadData<dynamic, dynamic>("dbo.ReportGetStudentAvg", new { reportId, studentId, type });
            return res;
        }

        public async Task<IEnumerable<dynamic>> GetClassRptAvg(int? classId, int? reportId, string? type)
        {
            var res = await _db.LoadData<dynamic, dynamic>("dbo.ReportGetClassAvg", new { classId, reportId, type });
            return res;
        }

        public async Task<ReportModel?> GetReport(int id, int? classId)
        {
            ReportModel reportModel = new();
            var res = await
                _db.LoadData<dynamic, ReportModel, TestModel, SubjectModel>(
                "dbo.ReportGet",
                new { id, classId },
                x: (Report, Test, Subject) =>
                {
                    if (reportModel.ReportId == 0)
                    {
                        reportModel = Report;
                    }
                    else
                    {
                        Report = reportModel;
                    }
                    if (Test != null)
                    {
                        Test.Subject = Subject;
                        Report.Tests.Add(Test);
                    }
                    return Report;
                },
                splitOn: "TestId, SubjectId");
            return res.Select(x =>
            {
                var temp = x.Tests.AsEnumerable();
                x.Tests = temp.Select(t => { t.Report = null; return t; }).ToList();
                return x;
            }).Distinct().FirstOrDefault();
        }

        public async Task<IEnumerable<ReportModel>> GetReports(int? classId)
        {
            var dic = new Dictionary<int, ReportModel>();
            var reports = await _db.LoadData<dynamic, ReportModel, TestModel, SubjectModel>(
                "dbo.ReportGetAll",
                new { classId },
                (report, test, subject) =>
                {
                    test.Subject = subject;
                    if (dic.TryGetValue(report.ReportId, out var reportModel))
                    {
                        report = reportModel;
                    }
                    else
                    {
                        dic.Add(report.ReportId, report);
                    }
                    report.Tests.Add(test);
                    return report;
                },
                "TestId, SubjectId");

            return reports.Select(x =>
            {
                var temp = x.Tests.AsEnumerable();
                x.Tests = temp.Select(t => { t.Report = null; return t; }).ToList();
                return x;
            }).Distinct();
        }

        #endregion

        #region Actions
        public Task InsertReport(ReportModel report) =>
            _db.ExecuteData("dbo.ReportAdd", new
            {
                report.ReportTitle,
                report.StartDate,
                report.FinishDate
                
            });
        public Task UpdateReport(ReportModel report) =>
            _db.ExecuteData("dbo.ReportUpdate", report);
        public Task DeleteReport(int id) =>
            _db.ExecuteData("dbo.ReportDelete", new { Id = id });
        #endregion

    }
}
