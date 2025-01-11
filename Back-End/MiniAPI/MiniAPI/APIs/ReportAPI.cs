using DataAcess.Data;
using DataAcess.DBAccess;
using DataAcess.Exceptions;
using DataAcess.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Data;

namespace MiniAPI.APIs
{
    public static class ReportAPI
    {
        public static void ConfigureReportAPI(this WebApplication app)
        {
            app.MapGet("/Report/{id}", GetReport);
            app.MapGet("/Report", GetReports);
            app.MapGet("/Report/Student/Average", GetStudentReportAverage);
            app.MapGet("/Report/Class/Average", GetClassReportAverage);
            app.MapGet("/Report/{reportId}/Student/Result", GetStudentsReportResult);
            app.MapGet("/Report/Student/{studentId}/Result", GetStudentReportsResults);
            app.MapGet("/Report/{reportId}/Class/{classId}/Result", GetResultsByReportAndClass);
            app.MapGet("/Report/{reportId}/Student/{studentId}/Result", GetTotalResult);
            app.MapGet("/Report/Teacher/rate", GetTeachersRateBySubject);

            app.MapPut("/Report/{reportId}/Test", LinkReportWithTests);
            app.MapPut("/Report", UpdateReport);

            app.MapPost("/Report", InsertReport);

            app.MapDelete("/Report/{id}", DeleteReport);
        }

        private static async Task<IResult> GetTeachersRateBySubject(IReportData data, int subjectId, int limit = 5, int page = 1)
        {
            try
            {
                var rates = (await data.GetTeachersRate(subjectId))
                    .Skip(limit*(page-1))
                    .Take(limit);
                var res = new {rates , totalRows = rates.Count(), totalPages = (rates.Count()/limit) + 1};
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> GetResultsByReportAndClass(IReportData data, int reportId, int classId)
        {
            try
            {
                var res = await data.GetStudentsResultSpecifiedByReportAndClass(reportId, classId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }
        private static async Task<IResult> GetStudentReportsResults(IReportData data, int studentId)
        {
            try
            {
                var res = await data.GetStudentResult(studentId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
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
        private static async Task<IResult> GetClassReportAverage(IReportData data, int? reportId, int? classId, string? testType, string? gender, int limit = 20, int page = 1)
        {
            try
            {
                var res = (await data.GetClassRptAvg(classId, reportId, testType, gender))
                    .OrderByDescending(x => x.average)
                    .Skip(limit*(page-1))
                    .Take(limit);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }
        private static async Task<IResult> GetStudentReportAverage(IReportData data, int? reportId, int? studentId, string? testType, string? gender, int limit = 20, int page = 1)
        {
            try
            {
                var res = (await data.GetStudentsRptAvg(studentId, reportId, testType, gender))
                .OrderByDescending(x => x.average)
                    .Skip(limit * (page - 1))
                    .Take(limit);
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
        private static async Task<IResult> GetReports(IReportData data, int? classId, int? gradeId)
        {
            try
            {
                return Results.Ok(await data.GetReports(classId, gradeId));
            }
            catch (Exception e)
            {
                return Results.BadRequest(e.Message);
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
            catch(InvalidParametersException pException)
            {
                return Results.BadRequest(pException.Message);
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
