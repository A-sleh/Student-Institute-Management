using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.WebSockets;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data;

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

        _ = await _db.LoadData<dynamic, StudentModel, TestModel, SubjectModel, TestMarkModel>(
            "dbo.StudentGetFullResultByRepAndClass",
            new { reportId, classId },
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
            splitOn: $"{nameof(TestModel.TestId)}, {nameof(SubjectModel.SubjectId)}, {nameof(TestMarkModel.TestMarkId)}");

        var studentsResults =  mappedStudents.Select(mapped => mapped.Value)
            .Select(student =>
            {
                var quizAvg = GetStudentsRptAvg(student.StudentId, reportId, "quiz", student.Class?.Gender).Result.FirstOrDefault()?.Average;
                var reportResult = GetStudentTotalResult(student.StudentId, reportId).Result;
                var testMarks = student.TestMark.Where(tm => tm.Test != null && tm.Test.IsExam()).Select(tm => new { tm.Mark, tm.Test?.Subject?.Subject, tm.Test?.Subject?.MaximumMark });
                student.MissedDays = _studentData.GetStudentAbsence(student.StudentId, false, report?.StartDate, report?.FinishDate).Result?.Absences;
                var jsonFormat = student.ReportStudent(reportResult?.mark, reportResult?.totalMark, testMarks, quizAvg ?? 0, reportResult?.markPercentage ?? 0);
                return jsonFormat;
            });

        return studentsResults.OrderByDescending(x => x.mark);
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
        var studentsResults = await _db.LoadData<dynamic, dynamic>("dbo.ReportGetStudentsResults", new { reportId, classId });
        return studentsResults;
    }
    public async Task<IEnumerable<dynamic>> GetStudentsRptAvg(int? studentId, int? reportId, string? type, string? gender)
    {
        var res = await _db.LoadData<dynamic, dynamic>("dbo.ReportGetStudentAvg", new { reportId, studentId, type });
        return res.Where( x => gender == null || x.gender == gender);
    }
    public async Task<IEnumerable<dynamic>> GetClassRptAvg(int? classId, int? reportId, string? type, string? gender)
    {
        var res = await _db.LoadData<dynamic, dynamic>("dbo.ReportGetClassAvg", new { classId, reportId, type });
        if (!res.Any())
            return res.Append(new { Average = 0 });
        return res.Where(x => gender == null || x.gender == gender)
            .OrderByDescending(x => x.average);
    }
    public async Task<ReportModel?> GetReport(int id, int? classId)
    {
        ReportModel? mappedReport = (await _db.LoadData<ReportModel, dynamic>("dbo.ReportGetOnlyDetails", new { reportId = id })).FirstOrDefault();
        _ = await
            _db.LoadData<dynamic, ReportModel, TestModel, SubjectModel>(
            "dbo.ReportGet",
            new { id, classId },
            x: (Report, Test, Subject) =>
            {
                if (mappedReport is null)
                {
                    mappedReport = Report;
                }
                else
                {
                    Report = mappedReport;
                }
                if (Test != null)
                {
                    Test.Subject = Subject;
                    Report.Tests.Add(Test);
                }
                return Report;
            },
            splitOn: "TestId, SubjectId");

        return mappedReport;
    }
    public async Task<IEnumerable<ReportModel>> GetReports(int? classId, int? gradeId, bool withTests = true)
    {
        var mappedReports = new Dictionary<int, ReportModel>();
        _ = await _db.LoadData<dynamic, ReportModel, TestModel, SubjectModel>(
            "dbo.ReportGetAll",
            new { classId, gradeId },
            (report, test, subject) =>
            {
                if(subject != null)
                    test.Subject = subject;

                if (mappedReports.TryGetValue(report.ReportId, out var reportModel))
                {
                    report = reportModel;
                }
                else
                {
                    mappedReports.Add(report.ReportId, report);
                }
                if(test != null)
                    report.Tests.Add(test);
                return report;
            },
            "TestId, SubjectId");

        return mappedReports.Select(Key => Key.Value);
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
