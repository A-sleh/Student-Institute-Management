using DataAcess.Models;

namespace DataAcess.Data
{
    public interface ITestData
    {
        Task<IEnumerable<ReportModel>> GetTestByReportId(int id);
    }
}