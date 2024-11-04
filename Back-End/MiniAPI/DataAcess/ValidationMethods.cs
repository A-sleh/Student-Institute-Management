using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DataAcess
{
    public static class ValidationMethods
    {
        public static string? TryParseDateForSqlQuery(string? date, string split)
        {
            var s = date?.Split(split);
            string? Date;
            if (s?.Length == 3)
            {
                Date = date;
            }
            else if (s?.Length == 2)
            {
                Date = s[0] + "-" + (s[1].Length > 1 ? s[1] : "0" + s[1]) + "%";
            }
            else if (s?.Length == 1 && s[0].Length == 4)
            {
                Date = s[0] + "%";
            }
            else if (s?.Length == 1 && s[0].Length <= 2)
            {

                Date = s[0].Length == 2 ? "%-" + s[0] + "-%" : "%-0" + s[0] + "-%";
            }
            else Date = date;
            return Date;
        }
    }
}
