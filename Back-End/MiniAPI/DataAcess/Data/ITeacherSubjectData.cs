using DataAcess.Models;

namespace DataAcess.Data
{
    public interface ITeacherSubjectData
    {
        Task DeleteSubjectForTeacher(int teacherSubjectId);
        Task InsertTeacherSubjects(TeacherSubjectModel model);
        Task UpdateTeacherSubject(TeacherSubjectModel model);
    }
}