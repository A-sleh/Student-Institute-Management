using DataAcess.Data;
using DataAcess.DBAccess;
using DataAcess.Models;
using System.Data;

namespace MiniAPI.APIs
{
    public static class ReportAPI
    {
        // demo version
        // release not completed
        public static void ConfigureReportAPI(this WebApplication app)
        {
            app.MapGet("/Report/{id}", GetReport);
            app.MapGet("/Report", GetReports);
            app.MapGet("/Report/Student/Average", GetStudentReportAverage);
            app.MapGet("/Report/Class/Average", GetClassReportAverage);
            app.MapGet("/Report/{reportId}/Student/Result", GetStudentsReportResult);
            app.MapGet("/Report/{reportId}/Student/{studentId}/Result", GetTotalResult);

            app.MapPut("/Report/{reportId}/Test", LinkReportWithTests);
            app.MapPut("/Report", UpdateReport);
            app.MapPost("/Report", InsertReport);
            app.MapDelete("/Report/{id}", DeleteReport);
        }

        private static async Task<IResult> LinkReportWithTests(IReportData data, int reportId, List<int> testIdList)
        {
            try
            {
                await data.LinkReportWithTests(reportId, testIdList);
                return Results.Ok($"Report {reportId} Linked With The Tests Successfully");
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> GetTotalResult(IReportData data, int studentId, int reportId)
        {
            try
            {
                var res = await data.GetStudentTotalResult(studentId, reportId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> GetStudentsReportResult(IReportData data, int reportId, int? classId)
        {
            try
            {
                var res = await data.GetStudentsReportResult(reportId, classId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }
        private static async Task<IResult> GetClassReportAverage(IReportData data, int? reportId, int? classId, string? type)
        {
            try
            {
                var res = await data.GetClassRptAvg(classId, reportId, type);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }
        private static async Task<IResult> GetStudentReportAverage(IReportData data, int? reportId, int? studentId, string? type)
        {
            try
            {
                var res = await data.GetStudentsRptAvg(studentId, reportId, type);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.BadRequest(e.Message);
            }
        }
        private static async Task<IResult> GetReport(IReportData data, int id, int? classId)
        {
            try
            {
                var res = await data.GetReport(id, classId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> GetReports(IReportData data, int? classId)
        {
            try
            {
                return Results.Ok(await data.GetReports(classId));
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> UpdateReport(IReportData data, ReportModel report)
        {
            try
            {
                await data.UpdateReport(report);
                return Results.Ok();
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> InsertReport(IReportData data, ReportModel report)
        {
            try
            {
                await data.InsertReport(report);
                return Results.Ok();
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> DeleteReport(IReportData data, int id)
        {
            try
            {
                await data.DeleteReport(id);
                return Results.Ok();
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }
    }
}
