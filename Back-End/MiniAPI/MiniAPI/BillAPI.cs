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
            //app.MapGet("/Bill/Class/{classId}",GetClassTotalBill);
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
    }
}
