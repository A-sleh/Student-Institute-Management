using Dapper;
using DataAcess.Data;
using System.Runtime.CompilerServices;

namespace MiniAPI
{
    public static class BillAPI
    {
        // Developing state
        // NOT READY TO USE
        public static void ConfigureBillAPI(this WebApplication app)
        {
            // Get Incomes and outcomes infos about a certain class
            app.MapGet("/Bill/Class/{classId}",GetClassTotalBill);

            // Get Bills Filtered by Date
            // YYYY
            // MM (or) M
            // YYYY-MM-DD
            app.MapGet("/Bill/{date}", GetBillsByDate);
        }
        
        private static async Task<IResult> GetClassTotalBill(IBillData data ,int classId)
        {
            try
            {
                var res = await data.GetClassTotalPays(classId);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> GetBillsByDate(IBillData data, string date) 
        {
            try
            {
                var res = await data.GetBillsByDate(date);
                return Results.Ok(res);
            }
            catch (Exception e)
            {
                return Results.Problem($"{e.Message}");
            }
        }

        private static async Task<IResult> GetStudentBills(IBillData data, int studentId)
        {
            try
            {
                var res = await data.GetStudentBills(studentId);
                return Results.Ok(res);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
