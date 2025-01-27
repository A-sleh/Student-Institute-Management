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
        private readonly StudentData _studentData;
        public ReportData(ISqlDataAccess _db)
        {
            this._db = _db;
            _studentData = new StudentData(_db);
        }
        #region Data Request
        public async Task<IEnumerable<dynamic>> GetStudentsResultSpecifiedByReportAndClass(int reportId, int classId)
        {
            var report = await GetReport(reportId, null);
            var mappedStudents = new Dictionary<int, StudentModel>();

            var classStudentsWithTestMarks = 
                await _db.LoadData<dynamic, StudentModel, TestModel, SubjectModel, TestMarkModel>(
                "dbo.StudentGetFullResultByRepAndClass",
                new
                {
                    reportId,
                    classId
                },
                (student, test, subject, testMark) =>
                {
                    test.Subject = subject;
                    testMark.Test = test;
                    if (mappedStudents.TryGetValue(student.StudentId, out var studentModel))
                    {
                        student = studentModel;
                    }
                    else
                    {
                        mappedStudents.Add(student.StudentId, student);
                    }
                    student.TestMark.Add(testMark);
                    return student;
                },
                splitOn: "TestId, SubjectId, TestMarkId");

            var studentsResults =  mappedStudents.Select(mapped => mapped.Value)
                .Select(student =>
                {
                    var eAvg = GetStudentsRptAvg(student.StudentId, reportId, "exam", student.Class?.Gender).Result.FirstOrDefault();
                    var quizAvg = GetStudentsRptAvg(student.StudentId, reportId, "quiz", student.Class?.Gender).Result.FirstOrDefault();
                    var reportResult = GetStudentTotalResult(student.StudentId, reportId).Result;
                    var testMarks = student.TestMark.Select(tm => new { tm.Mark, tm.Test?.Subject?.Subject, tm.Test?.Subject?.MaximumMark });
                    student.MissedDays = _studentData.GetStudentAbsence(student.StudentId, false, report?.StartDate, report?.FinishDate).Result.Absences;
                    var jsonFormat = student.ReportStudent(reportResult?.mark ?? 0, reportResult?.totalMark ?? 0, testMarks, quizAvg ?? 0, reportResult?.markPercentage ?? 0);
                    return jsonFormat;
                });

            return studentsResults.OrderBy(x => x.mark);
        }
        public async Task<IEnumerable<dynamic>> GetStudentsPureMark(int reportId, int classId)
        {
            var res = await _db.LoadData<dynamic, dynamic>("dbo.ReportGetStudentAvgPure", new {  reportId, classId });
            return res;
        }

        public async Task<IEnumerable<dynamic>> GetStudentResult(int studentId)
        {
            var res = await _db.LoadData<dynamic, dynamic>("dbo.ReportGetStudentReportsResults", new { studentId });
            return res;
        }

        public async Task<dynamic?> GetStudentTotalResult(int studentId, int reportId)
        {
            var res = await _db.LoadData<dynamic, dynamic>("dbo.ReportGetStudentTotalResult", new { studentId, reportId });
            return res.FirstOrDefault();
        }
        public async Task<IEnumerable<dynamic>> GetStudentsReportResult(int reportId, int? classId)
        {
            var res = await _db.LoadData<dynamic, dynamic>("dbo.ReportGetStudentsResults", new { reportId, classId });
            return res;
        }

        public async Task<IEnumerable<dynamic>> GetStudentsRptAvg(int? studentId, int? reportId, string? type, string? gender)
        {
            var res = await _db.LoadData<dynamic, dynamic>("dbo.ReportGetStudentAvg", new { reportId, studentId, type });
            return res.Where( x => gender == null || x.gender == gender);
        }

        public async Task<IEnumerable<dynamic>> GetClassRptAvg(int? classId, int? reportId, string? type, string? gender)
        {
            var res = await _db.LoadData<dynamic, dynamic>("dbo.ReportGetClassAvg", new { classId, reportId, type });
            return res.Where(x => gender == null || x.gender == gender);
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

        public async Task<IEnumerable<ReportModel>> GetReports(int? classId, int? gradeId)
        {
            var dic = new Dictionary<int, ReportModel>();
            var reports = await _db.LoadData<dynamic, ReportModel, TestModel, SubjectModel>(
                "dbo.ReportGetAll",
                new { classId },
                (report, test, subject) =>
                {
                    if(subject != null)
                        test.Subject = subject;

                    if (dic.TryGetValue(report.ReportId, out var reportModel))
                    {
                        report = reportModel;
                    }
                    else
                    {
                        dic.Add(report.ReportId, report);
                    }
                    if(test != null)
                        report.Tests.Add(test);
                    return report;
                },
                "TestId, SubjectId");

            return dic
                .Select(Key =>
                {
                    if (gradeId != null)
                    {
                        var tests = Key.Value.Tests.AsEnumerable();
                        Key.Value.Tests = tests
                        .Where(t => t.Subject?.GradeId == gradeId)
                        .Select(t => { t.Report = null; return t; })
                        .ToList();
                    }
                    return Key.Value;
                });
        }
        public async Task<IEnumerable<dynamic>> GetTeachersRate(int subjectId)
        {
            var teachersRates = await _db.LoadData<dynamic, dynamic>("dbo.ReportTeacherRate", new { subjectId });
            return teachersRates;
        }

        #endregion

        #region Actions
        public async Task LinkReportWithTests(int reportId, List<int> tests)
        {
            foreach (var testId in tests)
            {
                await _db.ExecuteData("dbo.ReportLinkWithTests", new { reportId, testId });
            }

        }
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

        public async Task<IEnumerable<dynamic>> GetTopStudentsInEachClass(int reportId)
        {
            var topStudents = await _db.LoadData<dynamic, dynamic>("dbo.ReportTopStudentInEachClass", new { reportId });
            return topStudents.OrderByDescending(student => student.Average);
        }
        #endregion

    }
}
