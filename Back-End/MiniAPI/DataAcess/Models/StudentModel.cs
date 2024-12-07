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
    public string? Birthdate { get; set; }
    public string? Phone { get; set; }
    public int MissedDays { get; set; }
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
            Class = new
            {
                Class?.ClassId,
                Class?.Title,
                Class?.GradeId,
                Class?.Grade
            }
        };
}
