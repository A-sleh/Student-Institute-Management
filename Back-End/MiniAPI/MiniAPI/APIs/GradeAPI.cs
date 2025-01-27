using DataAcess.Data;
using DataAcess.Models;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.ExceptionServices;
using DataAcess.Exceptions;
using System.Data.SqlTypes;
using System.Data.SqlClient;

namespace MiniAPI.APIs
{
    public static class GradeAPI
    {
        public static void ConfigureGradeAPI(this WebApplication app)
        {
            app.MapGet("/Grade", GetGrades);
            app.MapGet("/Grade/Count", GetGradeCount);
            app.MapGet("/Grade/{gradeId}/Count", GetGradeCountById);
            app.MapPost("/Grade", AddGrade);

            app.MapPut("/Grade", UpdateGrade);

            app.MapDelete("/Grade/{gradeId}", DeleteGrade);
        }
        private static async Task<IResult> GetGradeCountById(IGradeData data, int gradeId, int limit = 10, int page = 1)
        {
            try
            {
                var gradeCount = await data.GetGradesCount(gradeId);
                return 
                    Results.Ok(gradeCount
                    .Skip(limit*(page-1))
                    .Take(limit));
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> GetGradeCount(IGradeData data, int limit = 10, int page = 1)
        {
            try
            {
                var gradesCount = await data.GetGradesCount();

                return 
                    Results.Ok(gradesCount
                    .Skip(limit*(page-1))
                    .Take(limit));
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> GetGrades(IGradeData data, string? filter = null) 
        {
            try
            {
                var GradesBody = await data.GetAllGrades(filter);
                return Results.Ok(GradesBody);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> AddGrade(IGradeData data, GradeModel Grade)
        {
            try
            {
                await data.AddGrade(Grade);
                return Results.Ok();
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> UpdateGrade(IGradeData data, GradeModel Grade)
        {
            try
            {
                await data.UpdateGrade(Grade);
                return Results.Ok();
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> DeleteGrade(IGradeData data, int gradeId)
        {
            try
            {
                await data.DeleteGrade(gradeId);
                return Results.Ok();
            }
            catch (SqlException SqlEx)
            {
                return Results.BadRequest(SqlEx.Message);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }
    }
}