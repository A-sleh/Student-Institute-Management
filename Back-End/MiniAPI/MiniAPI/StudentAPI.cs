using DataAcess.Data;
using DataAcess.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net.NetworkInformation;

namespace MiniAPI
{
    public static class StudentAPI
    {
        // not complete
        // waiting for Test API
        public static void ConfigureStudentAPI(this WebApplication app)
        {
            // Get Student Object Using Id
            app.MapGet("/Student/{id}", GetStudent);

            // Get All Students
            app.MapGet("/Student", GetStudents);

            // Update A Student using the origin Id passed with the object itself
            app.MapPut("/Student", UpdateStudent);

            // insert a student careless for the Id value
            app.MapPost("/Student", InsertStudent);

            // delete a student using its Id
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
