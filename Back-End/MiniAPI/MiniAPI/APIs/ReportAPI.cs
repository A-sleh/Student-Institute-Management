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
            app.MapPut("/Report", UpdateReport);
            app.MapPost("/Report", InsertReport);
            app.MapDelete("/Report/{id}", DeleteReport);
        }

        private static async Task<IResult> GetReport(IReportData data, int id)
        {
            try
            {
                return Results.Ok(await data.GetReport(id));
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
                throw;
            }
        }

        private static async Task<IResult> GetReports(IReportData data)
        {
            try
            {
                return Results.Ok(await data.GetReports());
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
                throw;
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
                throw;
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
                throw;
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
                throw;
            }
        }
    }
}
