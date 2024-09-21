using DataAcess.Data;
using System.Runtime.CompilerServices;

namespace MiniAPI
{
    public static class TestAPI
    {
        // DEMO
        // Debug
        // NOT COMPLETE
        public static void ConfigureTestAPI(this WebApplication app)
        {
            app.MapGet("Test/{reportId}", GetTestByReportId);
        }

        private static async Task<IResult> GetTestByReportId(ITestData data, int reportId)
        {
            try
            {
                return Results.Ok(await data.GetTestByReportId(reportId));
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
