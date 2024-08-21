using DataAcess.Data;
using DataAcess.Models;
using System.Runtime.CompilerServices;

namespace MiniAPI
{
    public static class SubjectAPI
    {
        public static void ConfigureSubjectAPI(this WebApplication app)
        {
            app.MapGet("/Subject", GetSubjects);
            app.MapGet("/Subject/{id}", GetSubject);
            app.MapDelete("/Subject/{id}", DeleteSubject);
            app.MapPost("/Subject", InsertSubject);
        }
        private static async Task<IResult> GetSubjects(ISubjectData data)
        {
            try
            {
                return Results.Ok(await data.GetSubjects());
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
                throw;
            }
        }

        private static async Task<IResult> GetSubject(ISubjectData data, int id)
        {
            try
            {
                return Results.Ok(await data.GetSubject(id));
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
                throw;
            }
        }

        private static async Task<IResult> InsertSubject(ISubjectData data, SubjectModel subject)
        {
            try
            {
                await data.InsertSubject(subject);
                return Results.Ok("Insert Success");
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
                throw;
            }
        }

        private static async Task<IResult> DeleteSubject(ISubjectData data, int id)
        {
            try
            {
                await data.DeleteSubject(id);
                return Results.Ok("Delete Success");
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
                throw;
            }
        }
    }
}
