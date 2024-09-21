using DataAcess.Models;

namespace DataAcess.Data
{
    public interface IBillData
    {
        Task<IEnumerable<BillModel>> GetBills();
        Task<IEnumerable<BillModel>> GetBillsByDate(string? date);
        Task<dynamic> GetClassTotalPays(int classId);
        Task<IEnumerable<BillModel>> GetExternalIncome(string? date);
        Task<IEnumerable<BillModel>> GetExternalOutcome(string? date);
        Task<IEnumerable<BillModel>> GetStudentBills(int studentId);
        Task<dynamic> GetStudentTotalPays(int studentId);
        Task<IEnumerable<BillModel>> GetTeacherBills(int teacherId);
        Task<dynamic> GetTeacherTotalPays(int teacherId);
        Task<dynamic> GetTotalIncome();
        Task<dynamic> GetTotalOutcome();
    }
}