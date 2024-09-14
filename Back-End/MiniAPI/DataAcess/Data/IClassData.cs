﻿using DataAcess.Models;

namespace DataAcess.Data
{
    public interface IClassData
    {
        Task DeleteClass(int id);
        Task<ClassModel?> GetClassDetails(int id);
        Task<IEnumerable<ClassModel>> GetClasses();
        Task InsertClass(ClassModel classModel);
        Task UpdateClass(ClassModel classModel);
        Task<IEnumerable<SubjectModel>> GetClassSubjects(int classId);
    }
}