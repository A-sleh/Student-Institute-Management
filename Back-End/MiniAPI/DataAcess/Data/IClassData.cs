﻿using DataAcess.Models;

namespace DataAcess.Data
{
    public interface IClassData
    {
        Task DeleteClass(int id);
        Task<IEnumerable<TestModel>> GetClassTests(int classId, bool? showCorrected, bool isLinked = true);
        Task<ClassModel?> GetClassDetails(int id);
        Task<IEnumerable<ClassModel>> GetClasses(int? gradeId = null);
        Task InsertClass(ClassModel classModel);
        Task UpdateClass(ClassModel classModel);
        Task<IEnumerable<dynamic>> GetClassSubjects(int classId);
        Task<IEnumerable<dynamic>> GetClassteachers(int classId);
    }
}