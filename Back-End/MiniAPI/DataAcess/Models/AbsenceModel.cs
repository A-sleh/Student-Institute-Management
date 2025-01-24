using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Models
{
    public class AbsenceModel
    {
        public int AbsenceId { get; set; }
        public DateTime? Date { get; set; }

        public bool DateFilter(DateTime? startDate, DateTime? endDate) => 
            (Date <= endDate || endDate == null) && (Date >= startDate || startDate == null);
    }
}
