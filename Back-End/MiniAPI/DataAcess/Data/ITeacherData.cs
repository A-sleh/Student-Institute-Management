using DataAcess.Models;

namespace DataAcess.Data
{
    public interface ITeacherData
    {
        Task AddSubjectToTeacher(List<TeacherSubjectModel> TSM);
        Task DeleteTeacher(int id);
        Task<IEnumerable<TeacherModel>> GetAllTeachers();
        Task<TeacherModel?> GetTeacherById(int id);
        Task<IEnumerable<TeacherModel>> GetTeachersBySubject(int subId);
        Task InsertTeacher(TeacherModel model);
        Task UpdateTeacher(TeacherModel model);
    }
}