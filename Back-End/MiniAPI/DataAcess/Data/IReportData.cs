using DataAcess.Models;

namespace DataAcess.Data
{
    public interface IReportData
    {
        Task DeleteReport(int id);
        Task<ReportModel?> GetReport(int id);
        Task<IEnumerable<ReportModel>> GetReports();
        Task InsertReport(ReportModel report);
        Task UpdateReport(ReportModel report);
        Task<dynamic> GetStudentRptAvg(int studentId, int reportId);
    }
}