using DataAcess.Data;
using DataAcess.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net.NetworkInformation;

namespace MiniAPI
{
    public static class StudentAPI
    {
        public static void ConfigureStudentAPI(this WebApplication app)
        {
            //end points mapping
            app.MapGet("/Student/{id}", GetStudent);
            app.MapGet("/Student", GetStudents);
            app.MapPut("/Student", UpdateStudent);
            app.MapPost("/Student", InsertStudent);
            app.MapDelete("/Student/{id}", DeleteStudent); 
        }
        
        private static async Task<IResult> GetStudent(IStudentData data, int id)
        {
            try
            {
                var res = Results.Ok(await data.GetStudentByID(id));
                if(res == null) return Results.NotFound();
                return Results.Ok(res);
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
            catch(Exception ex) 
            { 
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> DeleteStudent(IStudentData data, int id)
        {
            try
            {
                await data.DeleteStudent(id);
                return Results.Ok();
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

    }
}
