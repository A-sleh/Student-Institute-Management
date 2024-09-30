using DataAcess.Data;
using DataAcess.Models;
using System.Runtime.CompilerServices;

namespace MiniAPI.APIs
{
    public static class TestAPI
    {
        // DEMO
        // Debug
        // NOT COMPLETE
        public static void ConfigureTestAPI(this WebApplication app)
        {
            app.MapGet("Test/Report/{reportId}", GetTestByReportId);
            app.MapGet("/Test/Student/{studentId}", GetStudentMarks);
            app.MapGet("/Test/Subject/{subjectId}", GetTestBySubject);
            app.MapGet("/Test/{testId}/Class/{classId}", GetTestClassMarks);

            app.MapPost("/Test", AddTest);
            
            app.MapPut("/Test", UpdateTest);

            app.MapDelete("/Test", DeleteTest);
        }

        private static async Task<IResult> GetTestByReportId(ITestData data, int reportId)
        {
            try
            {
                var res = await data.GetTestByReportId(reportId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> GetStudentMarks(ITestData data, int studentId)
        {
            try
            {
                var res = await data.GetStudentTestsMarks(studentId: studentId);
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
    }
}
