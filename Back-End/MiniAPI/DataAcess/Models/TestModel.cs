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
    public string? Date {  get; set; }
    public string? CorrectionDate { get; set; }
}
