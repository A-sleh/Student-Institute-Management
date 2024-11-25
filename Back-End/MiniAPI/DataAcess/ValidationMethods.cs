using DataAcess.Exceptions;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Runtime.CompilerServices;
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

        public static string validateDigitsOfDate(string? date)
        {
            if (date == null || date.Length == 0 || date.Length < 4)
                throw new InvalidParametersException($"invalid date {date}");

            date = date.Replace('/', '-');
            var dates = date.Split("-");
            DateTime formatting;
            string formattedDate = string.Empty;
            if (dates.Length == 1)
            {
                formatting = DateTime.ParseExact(dates[0], "yyyy", CultureInfo.InvariantCulture);
                formattedDate = formatting.ToString("yyyy");
            }
            else if (dates.Length == 2)
            {
                //if (dates[1].Length == 1)
                //    dates[1] = DateTime.ParseExact(dates[1], "M", CultureInfo.InvariantCulture).ToString("MM");
                formatting = DateTime.ParseExact(dates[0] + "-" + dates[1], "yyyy-M", CultureInfo.InvariantCulture);
                formattedDate = formatting.ToString("yyyy-MM");
            }
            else if (dates.Length == 3)
            {
                formatting = DateTime.ParseExact(dates[0] + "-" + dates[1] + "-" + dates[2], "yyyy-M-d", CultureInfo.InvariantCulture);
                formattedDate = formatting.ToString("yyyy-MM-dd");
            }
            return formattedDate;
        }
    }
}
