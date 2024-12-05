using DataAcess.Models;

namespace DataAcess.Data
{
    public interface IReportData
    {
        Task DeleteReport(int id);
        Task<ReportModel?> GetReport(int id, int? classId);
        Task<IEnumerable<ReportModel>> GetReports(int? classId, int? gradeId = null);
        Task InsertReport(ReportModel report);
        Task UpdateReport(ReportModel report);
        Task<IEnumerable<dynamic>> GetStudentsRptAvg(int? studentId, int? reportId, string? type, string? gender = null);
        Task<IEnumerable<dynamic>> GetClassRptAvg(int? classId, int? reportId, string? type, string? gender = null);
        Task<IEnumerable<dynamic>> GetStudentsReportResult(int reportId, int? classId);
        Task<IEnumerable<dynamic>> GetStudentResult(int studentId);
        Task<dynamic?> GetStudentTotalResult(int studentId, int reportId);
        Task LinkReportWithTests(int reportId, List<int> tests);
        Task<IEnumerable<dynamic>> GetStudentsPureMark(int reportId, int classId);
        Task<IEnumerable<dynamic>> GetStudentsResultSpecifiedByReportAndClass(int reportId, int classId);
        Task<IEnumerable<dynamic>> GetTeachersRate(int subjectId);
    }
}