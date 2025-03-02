using DataAcess.Models;

namespace DataAcess.Data
{
    public interface IBillData
    {
        Task<IEnumerable<BillModel>> GetBills(
            string? type,
            int limit,
            int page,
            string orderBy,
            string orderingType,
            DateTime? startDate = null,
            DateTime? endDate = null);
        Task<dynamic> GetClassTotalPays(int classId);
        Task<IEnumerable<BillModel>> GetExternal(DateTime? date, string Type);
        Task<IEnumerable<BillModel>> GetStudentBills(int studentId);
        Task<dynamic> GetTotalPays(int? studentId, int? teacherId);
        Task<IEnumerable<BillModel>> GetTeacherBills(int teacherId);
        Task DeleteBill(int BillId);
        Task AddBill(BillModel bill);
        Task<int> GetRestOf(string type);
        Task<int> GetTotalByParam(DateTime? startDate, DateTime? endDate, string param);
    }
}