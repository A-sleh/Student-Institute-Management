using DataAcess.Models;

namespace DataAcess.Data
{
    public interface IBillData
    {
        Task<IEnumerable<BillModel>> GetBills();
        Task<IEnumerable<BillModel>> GetBillsByDate(string? date);
        Task<dynamic> GetClassTotalPays(int classId);
        Task<IEnumerable<BillModel>> GetStudentBills(int studentId);
        Task<int> GetStudentTotalRequired(int studentId);
        Task<IEnumerable<BillModel>> GetTeacherBills(int teacherId);
        Task<int> GetTeacherTotalPays(int teacherId);
        Task<int> GetTeacherTotalRequired(int teacherId);
        Task<int> GetTotalPays(int studentId);
    }
}