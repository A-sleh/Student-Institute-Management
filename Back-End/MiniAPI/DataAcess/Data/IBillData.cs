using DataAcess.Models;

namespace DataAcess.Data
{
    public interface IBillData
    {
        Task<IEnumerable<dynamic>> GetBills(
            string? type,
            int limit,
            int page,
            string orderBy,
            string orderingType,
            string? startDate = null,
            string? endDate = null);
        Task<IEnumerable<dynamic>> GetBillsByDate(string date);
        Task<dynamic> GetClassTotalPays(int classId);
        Task<IEnumerable<BillModel>> GetExternal(string? date, string Type);
        Task<IEnumerable<BillModel>> GetStudentBills(int studentId);
        Task<dynamic> GetTotalPays(int? studentId, int? teacherId);
        Task<IEnumerable<BillModel>> GetTeacherBills(int teacherId);
        Task<dynamic> GetTotalIncome(string? startDate, string? endDate);
        Task<dynamic> GetTotalOutcome(string? startDate, string? endDate);
        Task DeleteBill(int BillId);
        Task AddBill(BillModel bill);
        Task<dynamic> GetRestOf(string type);
    }
}