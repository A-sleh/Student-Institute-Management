using DataAcess.Models;

namespace DataAcess.Data
{
    public interface IStudentData
    {
        Task DeleteStudent(int id);
        Task<StudentModel?> GetStudentByID(int id);
        Task<IEnumerable<dynamic>> GetStudents(int? classId, int? gradeId);
        Task InsertStudent(StudentModel student);
        Task UpdateStudent(StudentModel student);
        Task AddAbsence(int studentId, DateTime date);
        Task DeleteAbsence(int absenceId);
        Task<dynamic> GetStudentAbsence(int studentId, bool detailed, DateTime? startDate = null, DateTime? endDate = null);
    }
}