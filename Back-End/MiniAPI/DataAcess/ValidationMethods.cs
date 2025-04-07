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
    [Obsolete("useless and will be removed")]
    public static class ValidationMethods
    {
        

        /// <summary>
        /// Parse and prepare a date parameter to be used in 'like' statements into sql query
        /// </summary>
        /// <param name="date"></param>
        /// <param name="split"></param>
        /// <returns></returns>
        public static string? ParseDateForSqlQuery(string? date, string split)
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
        /// <summary>
        /// Validates string date in YMD format
        /// </summary>
        /// <param name="date"></param>
        /// <returns>Valid string date (yyyy-MM-dd)</returns>
        /// <exception cref="InvalidParametersException"></exception>
        public static string ValidateDigitsOfDate(string date)
        {
            if (date.Length < 4 || date.Split('-').Length < 1)
                throw new InvalidParametersException($"invalid date {date}");
            date = date.Replace('/', '-');
            var dates = date.Split("-");
            date = dates[0];
            if (dates.Length > 1)
            {
                dates[1] = dates[1].Length == 1 ? "0" + dates[1] : dates[1];
                date =  date + "-" + dates[1];
            }
            if (dates.Length == 3)
            {
                dates[2] = dates[2].Length == 1 ? "0" + dates[2] : dates[2];
                date = date + "-" + dates[2];
            }
            
            return date;
        }
        /// <summary>
        /// converts valid string to DateTime object
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        /// <exception cref="InvalidParametersException"></exception>
        public static DateTime? ValidateDateTime(string? date)
        {
            if (date is null)
                return null;
            
            if (!DateTime.TryParse(date, out var validDate))
                throw new InvalidParametersException("invalid date provided");

            return validDate;
        }
    }
}
