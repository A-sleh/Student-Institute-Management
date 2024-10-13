using DataAcess.Data;
using DataAcess.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.Common;
using System.Net.NetworkInformation;

namespace MiniAPI.APIs
{
    public static class ClassAPI
    {
        public static void ConfigureClassAPI(this WebApplication app)
        {
            // Get All Classes Available
            app.MapGet("/Class", GetClasses);

            // Get Sepcific Class Details
            app.MapGet("/Class/{id}", GetClassByID);

            // Get All Subject For Specific Class
            app.MapGet("/Class/{classId}/Subject", GetClassSubjects);

            // Get All Tests For Specific Class
            app.MapGet("/Class/{classId}/Test", GetTestsByClassId);

            // Add Class
            app.MapPost("/Class", InsertClass);

            // Update A Class using query parameter which includes class id already
            app.MapPut("/Class", UpdateClass);

            // Delete a Class Using its Id
            app.MapDelete("/Class/{id}", DeleteClass);

            // Get Class Teachers
            app.MapGet("/Class/{classId}/Teacher", GetClassTeachers);
        }

        private static async Task<IResult> GetTestsByClassId(IClassData data, int classId)
        {
            try
            {
                var res = await data.GetClassTests(classId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }
        private static async Task<IResult> GetClasses(IClassData data, int? limit)
        {
            try
            {
                return Results.Ok(await data.GetClasses(limit));
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

        private static async Task<IResult> GetClassByID(int id, IClassData data)
        {
            try
            {
                return Results.Ok(await data.GetClassDetails(id));
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }

        }

        private static async Task<IResult> GetClassSubjects(IClassData data, int classId)
        {
            try
            {
                var res = await data.GetClassSubjects(classId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                if (e.Message.Contains("Not Found"))
                    return Results.NotFound(e.Message);
                return Results.Problem(e.Message);
                throw;
            }
        }

        private static async Task<IResult> GetClassTeachers(IClassData data, int classId)
        {
            try
            {
                var res = await data.GetClassteachers(classId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }
    }
}
