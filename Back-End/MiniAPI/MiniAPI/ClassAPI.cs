using DataAcess.Data;
using DataAcess.Models;
using System.Data.Common;
using System.Net.NetworkInformation;

namespace MiniAPI
{
    public static class ClassAPI
    {
        public static void ConfigureClassAPI(this WebApplication app)
        {
            app.MapGet("/Class", GetClasses);
            app.MapGet("/Class/{id}", GetClass);
            app.MapPost("/Class", InsertClass);
            app.MapPut("/Class", UpdateClass);
            app.MapDelete("/Class/{id}", DeleteClass);
        }

        private static async Task<IResult> GetClass(IClassData data, int id)
        {
            try
            {
                var res = Results.Ok(await data.GetClass(id));
                if (res == null) return Results.NotFound();
                return Results.Ok(res);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> GetClasses(IClassData data)
        {
            try
            {
                return Results.Ok(await data.GetClasses());
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> UpdateClass(IClassData data, ClassModel classModel)
        {
            try
            {
                await data.UpdateClass(classModel);
                return Results.Ok();
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> InsertClass(IClassData data, ClassModel classModel)
        {
            try
            {
                await data.InsertClass(classModel);
                return Results.Ok();
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> DeleteClass(IClassData data, int id)
        {
            try
            {
                await data.DeleteClass(id);
                return Results.Ok();
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
    }
}
