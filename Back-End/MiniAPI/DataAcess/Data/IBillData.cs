using DataAcess.Models;

namespace DataAcess.Data
{
    public interface IBillData
    {
        Task<PaginatedModel<IEnumerable<BillModel>>> GetBills(
            string? billType,
            BillModel.BillOwnership? billOwner,
            int limit,
            int page,
            string orderBy,
            string orderingType,
            DateTime? startDate,
            DateTime? endDate);
        Task<dynamic> GetClassTotalPays(int classId);
        Task<IEnumerable<BillModel>> GetExternal(DateTime? date, string Type);
        Task<IEnumerable<BillModel>> GetStudentBills(int studentId);
        Task<dynamic> GetTotalPays(int studentId = -1, int teacherId = -1);
        Task<IEnumerable<BillModel>> GetTeacherBills(int teacherId);
        Task DeleteBill(int BillId);
        Task<int> AddBill(BillModel bill);
        Task<int> GetRestOf(string type);
        Task<int> GetTotalByParam(DateTime? startDate, DateTime? endDate, string param);
        Task<IEnumerable<dynamic>> GetExternalFiltered(string note = "", string billNo = "", string? type = null, DateTime? date = null);
    }
}