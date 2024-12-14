using DataAcess.Data;
using DataAcess.Models;
using System.Runtime.CompilerServices;

namespace MiniAPI.APIs
{
    public static class SubjectAPI
    {
        public static void ConfigureSubjectAPI(this WebApplication app)
        {
            // get all subjects
            app.MapGet("/Subject", GetSubjects);

            // get subject by Its Id
            app.MapGet("/Subject/{id}", GetSubject);

            // Delete a Subject by Its Id
            app.MapDelete("/Subject/{id}", DeleteSubject);

            // Insert Subject careless for Id value
            app.MapPost("/Subject", InsertSubject);

            // Edit a Subject Using the origin Id passed with the body (the object itself)
            app.MapPut("/Subject", UpdateSubject);
        }
        private static async Task<IResult> GetSubjects(ISubjectData data)
        {
            try
            {
                return Results.Ok(await data.GetSubjects());
            }
            catch (Exception e)
            {
                return Results.BadRequest(e.Message);
            }
        }

        private static async Task<IResult> GetSubject(ISubjectData data, int id)
        {
            try
            {
                var entityRequested = await data.GetSubject(id);
                return Results.Ok(entityRequested);
            }
            catch (Exception e)
            {
                return Results.BadRequest(e.Message);
            }
        }

        private static async Task<IResult> InsertSubject(ISubjectData data, SubjectModel subject)
        {
            try
            {
                await data.InsertSubject(subject);
                return Results.Ok();
            }
            catch (Exception e)
            {
                return Results.BadRequest(e.Message);
            }
        }

        private static async Task<IResult> UpdateSubject(ISubjectData data, SubjectModel subject)
        {
            try
            {
                await data.UpdateSubject(subject);
                return Results.Ok("Update Success");
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> DeleteSubject(ISubjectData data, int id)
        {
            try
            {
                var entityDeleted = await data.GetSubject(id);
                await data.DeleteSubject(id);
                if(entityDeleted == null)
                    return Results.NotFound("Subject was not found");
                return Results.Ok(entityDeleted);
            }
            catch (Exception)
            {
                return Results.BadRequest("Make sure that subject is not used anymore and try again");
            }
        }
    }
}
