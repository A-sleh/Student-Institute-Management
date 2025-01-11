using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Models
{
    public class ReportModel
    {
        public int ReportId { get; set; }
        public string? ReportTitle { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? FinishDate { get; set; }
        public List<TestModel> Tests { get; set; } = [];
    }
}
