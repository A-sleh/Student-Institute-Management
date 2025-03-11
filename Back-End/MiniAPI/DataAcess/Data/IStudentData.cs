using DataAcess.Models;

namespace DataAcess.Data
{
    public interface IStudentData
    {
        Task<IEnumerable<dynamic>> GetFilteredStudent(string content = "", int? PageSize = null, int? Page = null);
        Task DeleteStudent(int id);
        Task<dynamic?> GetStudentByID(int id);
        Task<IEnumerable<dynamic>> GetStudents(int? classId, int? gradeId);
        Task InsertStudent(StudentModel student);
        Task UpdateStudent(StudentModel student);
        Task AddAbsences(IEnumerable<int> studentId, DateTime date);
        Task DeleteAbsence(int absenceId);
        Task<dynamic?> GetStudentAbsence(int studentId, bool detailed, DateTime? startDate = null, DateTime? endDate = null);
    }
}