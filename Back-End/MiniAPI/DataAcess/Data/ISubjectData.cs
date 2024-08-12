using DataAcess.Models;

namespace DataAcess.Data
{
    public interface ISubjectData
    {
        Task DeleteSubject(int id);
        Task<SubjectModel?> GetSubject(int id);
        Task<IEnumerable<SubjectModel>> GetSubjects();
        Task InsertSubject(SubjectModel subject);
        Task UpdateSubject(SubjectModel subject);
    }
}