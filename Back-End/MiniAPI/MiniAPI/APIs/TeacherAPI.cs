using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Reflection.Metadata.Ecma335;
using DataAcess.Data;
using DataAcess.Exceptions;
using DataAcess.Extensions;
using DataAcess.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace MiniAPI.APIs
{
    public static class TeacherAPI
    {
        public static void ConfigureTeacherAPI(this WebApplication app)
        {
            app.MapGet("/Teacher/Pagination", GetPaginatedTeachers);
            // get all teachers
            app.MapGet("/Teacher", GetAllTeachers);

            // get teacher by its Id
            app.MapGet("/Teacher/{TeacherId}", GetTeacherById);

            // get teachers that teach a subject by its Id
            app.MapGet("/Teacher/Subject/{subjectId}", GetTeachersBySubId);

            // get Subjects Taught by specified teacher by teacher Id
            app.MapGet("/Teacher/{TeacherId}/Subject", GetTeacherSubject);

            // get classes related by a teacher by teacher Id
            app.MapGet("/Teacher/{teacherId}/Class", GetTeacherClasses);

            // get teachers in specific class by its Id
            //app.MapGet("/Teacher/class/{classId}", GetClassTeachers);

            // get teacher subjects
            app.MapGet("/Teacher/Subject", GetTeacherSubjects);

            // get teacher with full name search
            app.MapGet("/Teacher/Filter", GetFilteredTeacher);
            // update a teacher by its origin id passed with the body
            app.MapPut("/Teacher", UpdateTeacher);

            // update salary for a subject taught by a teacher 
            // using 2 path parameters TeacherId and SubjectId (as A key)
            // 1 query parameter Salary (value to be modified)
            app.MapPut("/Teacher/{TeacherId}/Subject/{SubjectId}", UpdateSubjectInTeacher);

            // add a teacher
            app.MapPost("/Teacher", InsertTeacher);

            // add subject for a teacher
            // teacher specified using path parameter (its origin Id)
            app.MapPost("/Teacher/Subject", InsertSubjectToTeacher);

            // add teacher by his subject to a specified class
            // using the teacherSubjectId key and classId as a path params
            app.MapPost("/Teacher/Subject/{TeacherSubjectId}/class/{classId}", AddTeacherToClass);

            // Delete a teacher by its Id
            app.MapDelete("/Teacher/{id}", DeleteTeacher);

            // Delete a subject for specified teacher using teacherSubjectId
            app.MapDelete("/Teacher/Subject/{id}", DeleteSubjectFromTeacher);

            // Delete a Subject Taught by a teacher in a certain class by
            // teacherSubjectId and classId as Path params
            app.MapDelete("/Teacher/Subject/{TeacherSubjectId}/class/{classId}", DeleteTeacherFromClass);
        }

        private static async Task<IResult> GetPaginatedTeachers(ITeacherData data, int page = 1, int limit = 5)
        {
            try
            {
                var teachers = await data.GetPaginatedTeachers(page, limit);
                return Results.Ok(teachers);
            }
            catch (Exception e)
            {
                return Results.BadRequest(e.Message);
            }
        }

        private static async Task<IResult> GetFilteredTeacher(ITeacherData data, string content = "")
        {
            try
            {
                var filteredTeacher = await data.GetFilteredTeachers(content);
                return Results.Ok(filteredTeacher);
            }
            catch (Exception e)
            {
                return Results.BadRequest(e.Message);
            }
        }

        private static async Task<IResult> GetTeacherSubjects(ITeacherData data, int? gradeId)
        {
            try
            {
                var res = await data.GetTeacherSubjects(gradeId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> GetAllTeachers(ITeacherData data, int listSize = 100, int page = 1)
        {
            try
            {
                var res = await data.GetAllTeachers();
                return Results.Ok(new
                {
                    teachers = res.Paginate(page, listSize),
                    totalTeachers = res.Count(),
                    totalPages = Math.Ceiling((double)res.Count() / listSize),
                    currPage = page
                });
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> GetTeacherById(ITeacherData data, int TeacherId)
        {
            try
            {
                var res = await data.GetTeacherById(TeacherId);
                return Results.Ok(res?.TeacherDTO());
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> GetTeachersBySubId(ITeacherData data, int subjectId)
        {
            try
            {
                var res = await data.GetTeachersBySubject(subjectId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> UpdateTeacher(ITeacherData data, TeacherModel model)
        {
            try
            {
                await data.UpdateTeacher(model);
                return Results.Ok("Update Success");
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> GetTeacherSubject(ITeacherData data, int TeacherId)
        {
            try
            {
                var res = await data.GetTeacherSubjectsById(TeacherId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> InsertTeacher(ITeacherData data, TeacherModel model)
        {
            try
            {
                await data.InsertTeacher(model);
                return Results.Ok("Insert Success");
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> DeleteTeacher(ITeacherData data, int id)
        {
            try
            {
                await data.DeleteTeacher(id);
                return Results.Ok("Delete Success");
            }
            catch (Exception e)
            {
                if (e.Message.Contains("Not Found"))
                    return Results.NotFound(e.Message);
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> InsertSubjectToTeacher(ITeacherSubjectData data, TeacherSubjectModel model)
        {
            try
            {
                await data.InsertTeacherSubjects(model);
                return Results.Ok("Insert Success");
            }
            catch (InvalidParametersException ParamEx)
            {
                return Results.BadRequest(ParamEx.Message);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> UpdateSubjectInTeacher(
            ITeacherSubjectData data,
            int SubjectId,
            int TeacherId,
            int Salary)
        {
            try
            {
                await data.UpdateTeacherSubject(TeacherId, SubjectId, Salary);
                return Results.Ok("Update Success");
            }
            catch (InvalidParametersException ParamEx)
            {
                return Results.BadRequest(ParamEx.Message);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> DeleteSubjectFromTeacher(ITeacherSubjectData data, int id)
        {
            try
            {
                await data.DeleteSubjectForTeacher(id);
                return Results.Ok("Delete Success");
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> GetTeacherClasses(ITeacherSubjectData data, int teacherId)
        {
            try
            {
                var res = await data.GetTeacherClasses(teacherId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }
        
        /*
        private static async Task<IResult> GetClassTeachers(ITeacherSubjectData data, int classId)
        {
            try
            {
                var res = await data.GetClassTeachers(classId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }
        */

        private static async Task<IResult> AddTeacherToClass(ITeacherSubjectData data, int TeacherSubjectId, int classId)
        {
            try
            {
                await data.LinkTeacherWithClass(TeacherSubjectId, classId);
                return Results.Ok();
            }
            catch (InvalidParametersException ParamEx)
            {
                return Results.BadRequest(ParamEx.Message);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> DeleteTeacherFromClass(ITeacherSubjectData data, int TeacherSubjectId, int classId)
        {
            try
            {
                await data.DeleteTeacherFromClass(TeacherSubjectId, classId);
                return Results.Ok();
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }
    }
}
