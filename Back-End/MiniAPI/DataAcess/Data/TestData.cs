using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace DataAcess.Data
{
    public class TestData : ITestData
    {
        private readonly ISqlDataAccess _db;
        public TestData(ISqlDataAccess _db)
        {
            this._db = _db;
        }
        #region Data Request
        public async Task<IEnumerable<dynamic>> GetClassesByTest(int testId)
        {
            var res = await _db.LoadData<dynamic, dynamic, ClassModel>("dbo.TestGetClassesById", new { testId },
                (Dyn, Class) =>
                {
                    Dyn = new { Class, Dyn.StudentsNumber };
                    return Dyn;
                },
                splitOn: "ClassId");
            return res;
        }
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
        public async Task<IEnumerable<dynamic>> GetTestMarksByClassId(int testId, int classId)
        {
            var res = await _db.LoadData<TestMarkModel, dynamic, StudentModel>("dbo.TestGetClassMarks",
                new { testId, classId },
                x: (TestMark, Student) =>
                {
                    TestMark.Student = Student;
                    return TestMark;
                },
                splitOn: "StudentId");
            return res.Select(s =>
            {
                var jsonFormat = new
                {
                    s.TestMarkId,
                    student = new 
                    { 
                        s.Student?.StudentId,
                        s.Student?.Name,
                        s.Student?.LastName,
                        s.Student?.FatherName
                    },
                    s.Mark
                };
                return jsonFormat;
            });
        }
        public async Task<IEnumerable<dynamic>> GetTestMarks(int testId, int? classId)
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
            return res.Select(x => new 
            {
                x.TestMarkId,
                x.Mark,
                student = new
                {
                    x.Student?.StudentId,
                    x.Student?.Name,
                    x.Student?.LastName,
                    x.Student?.FatherName,
                    x.Student?.Class?.ClassId,
                    x.Student?.Class?.Title
                }
            }).Where(s => s?.student.ClassId == classId || classId == null);
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
        #endregion

        #region Actions
        public async Task UpdateMark(Dictionary<int, int> testMarks, int testId, DateTime correctionDate)
        {
            //using var transaction = new TransactionScope();
                
            TestModel? test = (await GetTests(testId)).FirstOrDefault() ?? throw new Exception();
            test.CorrectionDate = correctionDate;

            foreach (var (testMarkId, Mark) in testMarks)
            {
                await _db.ExecuteData("dbo.TestUpdateMark", new { testMarkId, Mark });
            }

            await _db.ExecuteData("TestUpdate", test.AsSqlRow());
        }
        public async Task UpdateTest(TestModel test)
            => await _db.ExecuteData("dbo.TestUpdate", new
            {
                test.TestId,
                test.Report?.ReportId,
                test.Title,
                test.Subject?.SubjectId,
                test.Date,
                test.CorrectionDate,
                test.TestType
            });
        public async Task StartATest(int testId, int classId)
        {
            if (!_db.LoadData<bool, dynamic>("dbo.TestCheckExistence", new { testId, classId }).Result.First())
                await _db.ExecuteData("dbo.TestInitMarks", new { testId, classId });
            else
                throw new Exception("Test already made in this class");
        }
        public async Task<dynamic> AddTest(TestModel test)
        {
            if (test.Subject == null)
                throw new Exception("Subject Can not be null");
            return (await _db.LoadData<dynamic,dynamic>("dbo.TestAdd", new
            {
                test.TestType,
                test.Title,
                test.Subject.SubjectId,
                test.CorrectionDate,
                test.Date,
                test.Report?.ReportId
            })).First();
        }
        public async Task DeleteTest(int testId)
        {
            await _db.ExecuteData("dbo.TestDelete", new { testId });
        }
        #endregion

    }
}
