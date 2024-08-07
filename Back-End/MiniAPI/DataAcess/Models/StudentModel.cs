using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Models;

public class StudentModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string LastName { get; set; }
    public string FatherName { get; set; }
    public string Birthdate { get; set; }
    public string Phone { get; set; }
    public int MissedDays { get; set; }
    public decimal BillRequired { get; set; }
    public int ClassId { get; set; }
    public StudentModel()
    {
        
    }
    public StudentModel(int Id,
                        string Name,
                        string LastName,
                        string FatherName,
                        int MissedDays,
                        string Birthdate,
                        string Phone,
                        int ClassId,
                        decimal BillRequired)
    {
        this.Id = Id;
        this.Name = Name;
        this.LastName = LastName;
        this.FatherName = FatherName;
        this.Birthdate = Birthdate;
        this.Phone = Phone;
        this.MissedDays = MissedDays;
        this.BillRequired = BillRequired;
        this.ClassId = ClassId;
    }
}
