using Microsoft.AspNetCore.Mvc.Filters;
using System.Runtime.CompilerServices;

namespace MiniAPI.APIs
{
    public static class GenericGradeAPI
    {
        public static void ConfigureGradeAPI(this WebApplication app)
        {

        }

        private static async Task<IResult> GetGrades()
        {
            return  Results.Ok("s");
        }
    }
}
