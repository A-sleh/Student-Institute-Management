﻿using DataAcess.Models;

namespace DataAcess.Data
{
    public interface ITestData
    {
        Task<dynamic> AddTest(TestModel test);
        Task DeleteTest(int testId);
        Task<IEnumerable<TestMarkModel>> GetStudentTestsMarks(int studentId, int? reportId = 0);
        Task<IEnumerable<TestModel>> GetTestBySubject(int subjectId, int? reportId);
        Task<IEnumerable<dynamic>> GetTestMarksByClassId(int testId, int classId);
        Task<IEnumerable<TestModel>> GetTests(int? reportId);
        Task StartATest(int classId, int testId);
        Task UpdateMark(Dictionary<int, int> testMarks, int testId, DateTime correctionDate);
        Task UpdateTest(TestModel test);
        Task<IEnumerable<dynamic>> GetTestMarks(int testId, int? classId);
        Task<IEnumerable<dynamic>> GetClassesByTest(int testId);
    }
}