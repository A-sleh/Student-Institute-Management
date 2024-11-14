using DataAcess.Models;

namespace DataAcess.Data
{
    public interface IBillData
    {
        Task<IEnumerable<dynamic>> GetBills(string? type, int? limit, string? orderBy, string? orderingType);
        Task<IEnumerable<dynamic>> GetBillsByDate(string? date);
        Task<dynamic> GetClassTotalPays(int classId);
        Task<IEnumerable<BillModel>> GetExternal(string? date, string Type);
        Task<IEnumerable<BillModel>> GetStudentBills(int studentId);
        Task<dynamic> GetTotalPays(int? studentId, int? teacherId);
        Task<IEnumerable<BillModel>> GetTeacherBills(int teacherId);
        Task<dynamic> GetTotalIncome();
        Task<dynamic> GetTotalOutcome();
        Task DeleteBill(int BillId);
        Task AddBill(BillModel bill);
        Task<dynamic> GetRestOf(string type);

        [Obsolete("will be replaced by GetTotalPays(int?,int?)")]
        Task<dynamic> GetTeacherTotalPays(int teacherId);

        [Obsolete("will be replaced by GetTotalPays(int?,int?)")]
        Task<dynamic> GetStudentTotalPays(int studentId);
    }
}