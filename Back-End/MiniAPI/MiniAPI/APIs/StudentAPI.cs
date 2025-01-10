using DataAcess.Data;
using DataAcess.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Net.NetworkInformation;
using Microsoft.AspNetCore.Http;
using DataAcess.Exceptions;

namespace MiniAPI.APIs
{
    public static class StudentAPI
    {
        public static void ConfigureStudentAPI(this WebApplication app)
        {
            // Get Student Object Using Id
            app.MapGet("/Student/{id}", GetStudent);

            // Get All Students
            app.MapGet("/Student", GetStudents);

            app.MapGet("/Student/{studentId}/Absence", GetStudentAbsences);

            // Update A Student using the origin Id passed with the object itself
            app.MapPut("/Student", UpdateStudent);

            // insert a student careless for the Id value
            app.MapPost("/Student", InsertStudent);

            app.MapPost("/Student/{studentId}/Absence", AddStudentAbsence);

            app.MapDelete("/Student/Absence/{absenceId}", DeleteStudentAbsence);

            // delete a student using its Id
            app.MapDelete("/Student/{id}", DeleteStudent);
        }

        private static async Task<IResult> DeleteStudentAbsence(IStudentData data, int absenceId)
        {
            try
            {
                await data.DeleteAbsence(absenceId);
                return Results.Ok();
            }
            catch (Exception e)
            {
                return Results.BadRequest(e.Message);
            }
        }

        private static async Task<IResult> AddStudentAbsence(IStudentData data, List<int> studentId, DateTime date)
        {
            try
            {
                await data.AddAbsences(studentId, date);
                return Results.Ok();
            }
            catch (InvalidParametersException pe)
            {
                return Results.BadRequest(pe.Message);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> GetStudentAbsences(IStudentData data, int studentId, bool detailed = true, DateTime? startDate = null, DateTime? endDate = null)
        {
            try
            {
                var studentAbsences = await data.GetStudentAbsence(studentId, detailed, startDate, endDate);
                return Results.Ok(studentAbsences);
            }
            catch (InvalidParametersException pe)
            {
                return Results.BadRequest(pe.Message);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }


        private static async Task<IResult> GetStudent(IStudentData data, int id)
        {
            try
            {
                var res = await data.GetStudentByID(id);
                return Results.Ok(res);
            }
            catch (Exception)
            {
                throw;
            }
        }

        private static async Task<IResult> GetStudents(IStudentData data, int? classId = null, int? gradeId = null, int limit = 100, int page = 1)
        {
            try
            {
                var res = await data.GetStudents(classId, gradeId);
                return Results.Ok(new
                {
                    students = res
                    .Skip(limit * (page - 1))
                    .Take(limit),
                    totalStudents = res.Count(),
                    totalPages = res.Count() / limit + (res.Count() % limit != 0 ? 1 : 0),
                    currPage = page
                });
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> InsertStudent(StudentModel student, IStudentData data)
        {
            try
            {
                await data.InsertStudent(student);
                return Results.Ok();
            }
            catch (Exception ex)
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
            catch (Exception ex)
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
