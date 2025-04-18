﻿using DataAcess.Models;

namespace DataAcess.Data
{
    public interface ITeacherData
    {
        Task DeleteTeacher(int TeacherId);
        Task<IEnumerable<TeacherModel>> GetAllTeachers();
        Task<IEnumerable<TeacherModel>> GetTeachersBySubject(int subId);
        Task<IEnumerable<TeacherSubjectModel>> GetTeacherSubjectsById(int TeacherId);
        Task InsertTeacher(TeacherModel model);
        Task UpdateTeacher(TeacherModel model);
        Task<TeacherModel?> GetTeacherById(int id);
        Task<IEnumerable<TeacherSubjectModel>> GetTeacherSubjects(int? gradeId);
        Task<IEnumerable<dynamic>> GetFilteredTeachers(string content = "");
        Task<PaginatedModel<IEnumerable<dynamic>>> GetPaginatedTeachers(int page = 1, int limit = 5);
    }
}