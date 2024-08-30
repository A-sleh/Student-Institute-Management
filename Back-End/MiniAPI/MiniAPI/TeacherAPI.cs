using DataAcess.Data;
using DataAcess.Models;

namespace MiniAPI
{
    public static class TeacherAPI
    {
        public static void ConfigureTeacherAPI(this WebApplication app)
        {
            app.MapGet("/Teacher", GetAllTeachers);
            app.MapGet("/Teacher/Subject/{subjectId}", GetTeachersBySubId);
            app.MapGet("/Teacher/{id}", GetTeacher);
            app.MapPut("/Teacher", UpdateTeacher);
            app.MapPost("/Teacher", InsertTeacher);
            app.MapDelete("/Teacher/{id}", DeleteTeacher);
        }

        private static async Task<IResult> GetAllTeachers(ITeacherData data)
        {
            try
            {
                var res = await data.GetAllTeachers();
                return Results.Ok(res);
            }
            catch (Exception)
            {
                throw;
            }
        }

        private static async Task<IResult> GetTeachersBySubId(ITeacherData data, int subjectId)
        {
            try
            {
                var res = await data.GetTeachersBySubject(subjectId);
                return Results.Ok(res);
            }
            catch (Exception)
            {
                throw;
            }
        }

        private static async Task<IResult> UpdateTeacher(ITeacherData data, TeacherModel model)
        {
            try
            {
                await data.UpdateTeacher(model);
                return Results.Ok("Update Success");
            }
            catch (Exception)
            {
                throw;
            }
        }

        private static async Task<IResult> GetTeacher(ITeacherData data, int id)
        {
            try
            {
                var res = await data.GetTeacherById(id);
                return Results.Ok(res);
            }
            catch (Exception)
            {
                throw;
            }
        }

        private static async Task<IResult> InsertTeacher(ITeacherData data, TeacherModel model)
        {
            try
            { 
                await data.InsertTeacher(model);
                return Results.Ok("Insert Success");
            }
            catch (Exception)
            {
                throw;
            }
        }

        private static async Task<IResult> DeleteTeacher(ITeacherData data, int id)
        {
            try
            {
                await data.DeleteTeacher(id);
                return Results.Ok("Delete Success");
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
