using DataAcess.Models;

namespace DataAcess.Data
{
    public interface ITeacherSubjectData
    {
        Task DeleteSubjectForTeacher(int teacherSubjectId);
        Task DeleteTeacherFromClass(int teacherSubjectId, int classId);
        Task<IEnumerable<TeacherModel>> GetClassTeachers(int classId);
        Task<IEnumerable<TeacherSubjectModel>> GetTeacherClasses(int teacherId);
        Task InsertTeacherSubjects(TeacherSubjectModel model);
        Task LinkTeacherWithClass(int teacherSubjectId, int classId);
        Task UpdateTeacherSubject(int TeacherId, int SubjectId, int Salary);
    }
}