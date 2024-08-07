using DataAcess.Models;

namespace DataAcess.Data
{
    public interface IStudentData
    {
        Task<StudentModel?> GetStudentByID(int id);
        Task<IEnumerable<StudentModel>> GetStudents();
        Task InsertStudent(StudentModel student);
        Task UpdateStudent(StudentModel student);
    }
}