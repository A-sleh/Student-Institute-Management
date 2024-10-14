using DataAcess.Models;

namespace DataAcess.Data
{
    public interface IClassData
    {
        Task DeleteClass(int id);
        Task<IEnumerable<TestModel>> GetClassTests(int classId, bool? showCorrected);
        Task<ClassModel?> GetClassDetails(int id);
        Task<IEnumerable<ClassModel>> GetClasses(int? limit);
        Task InsertClass(ClassModel classModel);
        Task UpdateClass(ClassModel classModel);
        Task<IEnumerable<dynamic>> GetClassSubjects(int classId);
        Task<IEnumerable<TeacherModel>> GetClassteachers(int classId);
    }
}