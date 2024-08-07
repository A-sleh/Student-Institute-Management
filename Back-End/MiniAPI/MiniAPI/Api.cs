using DataAcess.Data;
using DataAcess.Models;
using Microsoft.AspNetCore.Mvc;

namespace MiniAPI
{
    public static class Api
    {
        public static void ConfigureAPI(this WebApplication app)
        {
            //end points mapping
            app.MapGet("/Student/{id}", GetStudent);
            app.MapGet("/Student", GetStudents);
            app.MapPut("/UpdateStudent", UpdateStudent);
            app.MapPost("/InsertStudent", InsertStudent);
        }
        
        private static async Task<IResult> GetStudent(IStudentData data, int id)
        {
            try
            {
                var result = Results.Ok(await data.GetStudentByID(id));
                if(result == null) return Results.NotFound();
                return Results.Ok(result);
            }
            catch (Exception ex){
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> GetStudents(IStudentData data)
        {
            try
            {
                return Results.Ok(await data.GetStudents());
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> InsertStudent(StudentModel student, IStudentData data)
        {
            try
            {
                await data.InsertStudent(student);
                return Results.Ok();
            }
            catch(Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> UpdateStudent(StudentModel student, IStudentData data)
        {
            try
            {
                await data.UpdateStudent(student);
                return Results.Ok();
            }
            catch( Exception ex) { 
                return Results.Problem(ex.Message);
            }
        }

    }
}
