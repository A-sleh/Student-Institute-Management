using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data
{
    public class TestData : ITestData
    {
        private readonly ISqlDataAccess _db;
        public TestData(ISqlDataAccess _db)
        {
            this._db = _db;
        }

        public async Task AddTest(TestModel test)
        {
            if (test.Subject == null)
                throw new Exception("Subject Can not be null");
            await _db.SaveData("dbo.TestAdd", new
            {
                test.TestType,
                test.Subject.SubjectId,
                test.CorrectionDate,
                test.Date,
                test.Report?.ReportId
            });
        }

        public async Task DeleteTest(int testId)
        {
            await _db.SaveData("dbo.TestDelete", new { testId });
        }

        public async Task<dynamic> GetStudentRptAvg(int studentId, int reportId)
        {
            var avg = await _db.LoadData<int, dynamic>("dbo.TestGetStudentRptAvg", new { studentId, reportId });
            var res = new { Average = avg.FirstOrDefault() };
            return res;
        }

        // in Specific Test (may report page)
        public async Task<IEnumerable<TestMarkModel>> GetStudentTestsMarks(int studentId, int? reportId)
        {
            var marks = await _db.LoadData<dynamic, TestMarkModel, TestModel, SubjectModel, ReportModel>(
                "dbo.TestGetStudentMarks",
                new { studentId, reportId },
                x: (Mark, Test, Subject, Report) =>
                {
                    Test.Subject = Subject;
                    Test.Report = Report;
                    Mark.Test = Test;
                    return Mark;
                },
                splitOn: "TestId, SubjectId, ReportId");
            return marks;
        }

        public async Task<IEnumerable<TestMarkModel>> GetTestMarksByClassId(int testId, int classId)
        {
            var res = await _db.LoadData<TestMarkModel, dynamic, StudentModel>("dbo.TestGetClassMarks",
                new { testId, classId },
                x: (TestMark, Student) =>
                {
                    TestMark.Student = Student;
                    return TestMark;
                },
                splitOn: "StudentId");
            return res;
        }

        public async Task<TestModel?> GetTest(int testId)
        {
            var res = await _db.LoadData<TestModel, dynamic, SubjectModel>("dbo.TestGetById",
                new { testId },
                x: (Test, Subject) =>
                {
                    Test.Subject = Subject;
                    return Test;
                },
                splitOn: "SubjectId");
            return res.FirstOrDefault();
        }

        public async Task<IEnumerable<TestModel>> GetTestByReportId(int reportId)
        {
            var res = await _db.LoadData<TestModel, dynamic, SubjectModel>(
                "dbo.TestGetByReportId",
                parameters: new { reportId },
                x: (Test, Subject) =>
                {
                    Test.Subject = Subject;
                    return Test;
                },
                splitOn: "TestId, SubjectId"
                );
            return res;
        }

        public async Task<IEnumerable<TestModel>> GetTestBySubject(int subjectId, int? reportId)
        {
            var res = await _db.LoadData<dynamic, TestModel, SubjectModel, ReportModel>("dbo.TestGetBySubject",
                new { subjectId },
                x: (Test, Subject, Report) =>
                {
                    Test.Subject = Subject;
                    Test.Report = Report;
                    return Test;
                },
                splitOn: "SubjectId, ReportId");
            if (reportId != null)
                return res.Where(x => x.Report?.ReportId == reportId);
            return res;
        }

        public async Task<IEnumerable<TestModel>> GetTests(int? reportId)
        {
            var res = await _db.LoadData<TestModel, dynamic, SubjectModel>("dbo.TestGetAll",
                new { },
                x: (test, subject) =>
                {
                    test.Subject = subject;
                    return test;
                },
                splitOn: "SubjectId");
            if (reportId != null)
            {
                return res.Where(x => x.Report?.ReportId == reportId);
            }
            return res;
        }

        public async Task UpdateMark(int TestMarkId, int Mark)
        {
            await _db.SaveData("dbo.TestMarkUpdate", new { TestMarkId, Mark });
        }

        public async Task UpdateTest(TestModel test)
            => await _db.SaveData("dbo.TestUpdate", new
            {
                test.TestId,
                test.Report?.ReportId,
                test.Subject?.SubjectId,
                test.Date,
                test.CorrectionDate,
                test.TestType
            });

        public async Task StartATest(int classId, int testId)
            => await _db.SaveData("dbo.TestInitMarks", new { classId, testId });

        public async Task AddMarks(IEnumerable<TestMarkModel> marks, int testId)
        {
            foreach (var mark in marks)
            {
                await _db.SaveData("dbo.TestAddMarks", new
                {
                    testId,
                    mark.Student?.StudentId,
                    mark.Mark
                });
            }
        }

        public async Task LinkTestWithReport(int testId, int reportId)
        {
            /*
            var repType = (_db.LoadData<string, dynamic>("dbo.ReportGetType", new { reportId })).Result.FirstOrDefault();
            var TestType = (_db.LoadData<string, dynamic>("dbo.TestGetType", new { testId }).Result.FirstOrDefault();

            if (repType != null && TestType != null && !repType.Contains(TestType))
                throw new Exception("Report And Test Type Does Not Match");
            */
            await _db.SaveData("dbo.TestAddToReport", new { testId, reportId });
        }
    }
}
