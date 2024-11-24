using DataAcess.Data;
using DataAcess.Models;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.ExceptionServices;
using DataAcess.Exceptions;

namespace MiniAPI.APIs
{
    public static class GradeAPI
    {
        public static void ConfigureGradeAPI(this WebApplication app)
        {
            app.MapGet("/Grade", GetGrades);
            app.MapGet("/Grade/Count", GetGradeCount);

            app.MapPost("/Grade", AddGrade);

            app.MapPut("/Grade", UpdateGrade);

            app.MapDelete("/Grade/{gradeId}", DeleteGrade);
        }

        private static async Task<IResult> GetGradeCount(IGradeData data, bool subjects, bool students, bool classes)
        {
            try
            {
                return Results.Ok(await data.GetGradesCount(subjects, students, classes));
            }
            catch (Exception e)
            {
                if (e.GetType() == typeof(InvalidParametersException))
                    return Results.BadRequest(e.Message);
                else
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
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }
    }
}
