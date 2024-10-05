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

        // Data

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

        public async Task<IEnumerable<TestMarkModel>> GetTestMarks(int testId)
        {
            var res = await _db.LoadData<dynamic, TestMarkModel, StudentModel, ClassModel>("dbo.TestGetMarksById",
                new { testId },
                x: (Mark, Student, Class) =>
                {
                    Student.Class = Class;
                    Mark.Student = Student;
                    return Mark;
                },
                splitOn: "StudentId, ClassId");
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
            return res.Where(x=> reportId == null || x.Report?.ReportId == reportId);
        }

        public async Task<IEnumerable<TestModel>> GetTests(int? reportId)
        {
            var res = await _db.LoadData<dynamic, TestModel, SubjectModel, ReportModel>("dbo.TestGetAll",
                new { },
                x: (test, subject, report) =>
                {
                    test.Subject = subject;
                    test.Report = report;
                    return test;
                },
                splitOn: "SubjectId, ReportId");
            return res
                .Where(x => reportId == null || x.Report?.ReportId == reportId);
        }

        // Actions
        public async Task UpdateMark(int TestMarkId, int Mark)
        {
            await _db.SaveData("dbo.TestUpdateMark", new { TestMarkId, Mark });
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

        public async Task StartATest(int testId, int classId)
            => await _db.SaveData("dbo.TestInitMarks", new { testId, classId});

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


    }
}
