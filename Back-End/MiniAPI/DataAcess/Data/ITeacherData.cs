using DataAcess.Models;

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
    }
}