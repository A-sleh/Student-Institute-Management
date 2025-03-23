using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Models;

public class StudentModel
{
    public int StudentId { get; set; }
    public string? Name { get; set; }
    public string? LastName { get; set; }
    public string? FatherName { get; set; }
    public string? Phone { get; set; }
    public int? MissedDays {  get; set; }
    public decimal BillRequired { get; set; }
    public ClassModel? Class { get; set; }
    public List<TestMarkModel> TestMark { get; set; } = [];

    public dynamic PureFormat() =>
        new
        {
            StudentId,
            Name,
            LastName,
            FatherName,
            Phone,
            MissedDays,
            BillRequired,
            Class = Class?.PureFormat()
        };

    /// <summary>
    /// Turn student model into dynamic object as summary informations for printing a report
    /// </summary>
    /// <param name="mark"></param>
    /// <param name="totalMark"></param>
    /// <param name="testMarks"></param>
    /// <param name="quizAverage"></param>
    /// <param name="examAverage"></param>
    /// <returns>Dynamic object wich contains: examAverage, quizAverage, mark, totalMark, testMarks summary and student properties</returns>
    public dynamic ReportStudent(int? mark, int? totalMark, IEnumerable<dynamic>? testMark, double? quizAverage, double examAverage)
        => new {
            quizAverage,
            examAverage,
            mark,
            totalMark,
            MissedDays,
            StudentId,
            Name,
            LastName,
            FatherName,
            testMark
        };
}
