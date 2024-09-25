using DataAcess.Models;

namespace DataAcess.Data
{
    public interface ITestData
    {
        Task AddTest(TestModel test);
        Task DeleteTest(int testId);
        Task<dynamic> GetStudentRptAvg(int studentId, int reportId);
        Task<IEnumerable<TestMarkModel>> GetStudentTestsMarks(int studentId, int? reportId = 0);
        Task<TestModel?> GetTest(int testId);
        Task<IEnumerable<TestModel>> GetTestByReportId(int reportId);
        Task<IEnumerable<TestModel>> GetTestBySubject(int subjectId, int? reportId);
        Task<IEnumerable<TestMarkModel>> GetTestMarksByClassId(int testId, int classId);
        Task<IEnumerable<TestModel>> GetTests(int? reportId);
        Task StartATest(int classId, int testId);
        Task UpdateMark(int TestMarkId, int Mark);
        Task UpdateTest(TestModel test);
        Task AddMarks(IEnumerable<TestMarkModel> marks, int testId);
    }
}