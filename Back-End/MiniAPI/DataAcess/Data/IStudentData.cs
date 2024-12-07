using DataAcess.Models;

namespace DataAcess.Data
{
    public interface IStudentData
    {
        Task DeleteStudent(int id);
        Task<StudentModel?> GetStudentByID(int id);
        Task<IEnumerable<dynamic>> GetStudents(int? classId);
        Task InsertStudent(StudentModel student);
        Task UpdateStudent(StudentModel student);
    }
}