using DataAcess.Models;

namespace DataAcess.Data
{
    public interface IStudentData
    {
        Task<StudentModel?> GetStudentByID(int Id);
        Task InsertStudent(StudentModel student);
        Task UpdateStudent(StudentModel student);
    }
}