using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Models;

public class TestModel
{
    public int TestId { get; set; }
    public ReportModel? Report { get; set; }
    public SubjectModel? Subject { get; set; }
    public string? TestType { get; set; }
    public string? Title { get; set; }
    public DateTime? Date {  get; set; }
    public DateTime? CorrectionDate { get; set; }

    public dynamic AsSqlRow()
    {
        return new { TestId, Report?.ReportId, Subject?.SubjectId, TestType, Title, Date, CorrectionDate };
    }
}
