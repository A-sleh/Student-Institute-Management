using DataAcess.Models;

namespace DataAcess.Data
{
    public interface IBillData
    {
        Task<IEnumerable<BillModel>> GetBills();
        Task<IEnumerable<BillModel>> GetBillsByDate(string? date);
        Task<dynamic> GetClassTotalPays(int classId);
        Task<IEnumerable<BillModel>> GetExternal(string? date, string Type);
        Task<IEnumerable<BillModel>> GetStudentBills(int studentId);
        Task<dynamic> GetStudentTotalPays(int studentId);
        Task<IEnumerable<BillModel>> GetTeacherBills(int teacherId);
        Task<dynamic> GetTeacherTotalPays(int teacherId);
        Task<dynamic> GetTotalIncome();
        Task<dynamic> GetTotalOutcome();
        Task DeleteBill(int BillId);
        Task AddBill(BillModel bill);
    }
}