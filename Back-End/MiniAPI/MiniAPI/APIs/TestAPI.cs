using DataAcess.Data;
using DataAcess.Models;
using System.Runtime.CompilerServices;

namespace MiniAPI.APIs
{
    public static class TestAPI
    {
        public static void ConfigureTestAPI(this WebApplication app)
        {
            // Get Student
            app.MapGet("/Test/Student/{studentId}", GetStudentMarks);
            app.MapGet("/Test/Subject/{subjectId}", GetTestBySubject);
            app.MapGet("/Test/{testId}/Class/{classId}", GetTestClassMarks);
            app.MapGet("/Test", GetTests);
            app.MapGet("/Test/{testId}", GetTestMarksByTestId);
            app.MapGet("/Test/{testId}/Class", GetTestClasses);

            app.MapPost("/Test", AddTest);
            app.MapPost("/Test/{testId}/Class/{classId}/", StartATest);

            app.MapPut("/Test", UpdateTest);
            app.MapPut("/Test/Student/{testMarkId}", UpdateStudentMark);

            app.MapDelete("/Test", DeleteTest);
        } 

        private static async Task<IResult> GetTestClasses(ITestData data, int testId)
        {
            try
            {
                var res = await data.GetClassesByTest(testId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.BadRequest(e.Message);
            }
        }
        private static async Task<IResult> GetTestMarksByTestId(ITestData data, int testId)
        {
            try
            {
                var res = await data.GetTestMarks(testId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> StartATest(ITestData data, int testId, int classId)
        {
            try
            {
                await data.StartATest(testId, classId);
                return Results.Created();
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }
       
        private static async Task<IResult> GetTests(ITestData data, int? reportId)
        {
            try
            {
                var res = await data.GetTests(reportId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> GetStudentMarks(ITestData data, int studentId, int? reportId)
        {
            try
            {
                var res = await data.GetStudentTestsMarks(studentId, reportId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> AddTest(ITestData data, TestModel test)
        {
            try
            {
                await data.AddTest(test);
                return Results.Ok("Insert Success");
            }
            catch (Exception e)
            {
                return Results.Problem($"Insert Failed:\n{e.Message}");
            }
        }

        private static async Task<IResult> DeleteTest(ITestData data, int testId)
        {
            try
            {
                await data.DeleteTest(testId);
                return Results.Ok("Delete Success");
            }
            catch (Exception e)
            {
                return Results.Problem($"Delete Falied:\n{e.Message}");
            }
        }

        private static async Task<IResult> UpdateTest(ITestData data, TestModel test)
        {
            try
            {
                await data.UpdateTest(test);
                return Results.Ok("Update Success");
            }
            catch (Exception e)
            {
                return Results.Problem($"Update Failed:{'\n'}{e.Message}");
            }
        }

        private static async Task<IResult> GetTestBySubject(ITestData data, int subjectId, int? reportId)
        {
            try
            {
                var res = await data.GetTestBySubject(subjectId, reportId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> GetTestClassMarks(ITestData data, int Testid, int ClassId)
        {
            try
            {
                var res = await data.GetTestMarksByClassId(Testid, ClassId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> UpdateStudentMark(ITestData data, int testMarkId, int Mark)
        {
            try
            {
                await data.UpdateMark(testMarkId, Mark);
                return Results.Ok();
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }
    }
}
