using DataAcess.Models;

namespace DataAcess.Data
{
    public interface ITestData
    {
        Task AddTest(TestModel test);
        Task DeleteTest(int testId);
        Task<IEnumerable<TestMarkModel>> GetStudentTestsMarks(int studentId, int? reportId = 0);
        Task<IEnumerable<TestModel>> GetTestBySubject(int subjectId, int? reportId);
        Task<IEnumerable<TestMarkModel>> GetTestMarksByClassId(int testId, int classId);
        Task<IEnumerable<TestModel>> GetTests(int? reportId);
        Task StartATest(int classId, int testId);
        Task UpdateMark(int TestMarkId, int Mark);
        Task UpdateTest(TestModel test);
        Task<IEnumerable<TestMarkModel>> GetTestMarks(int testId);
    }
}