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
    public string Last_Name { get; set; }
    public string Father_Name { get; set; }
    public string Birthdate { get; set; }
    public string Phone { get; set; }
    public int Missed_Days { get; set; }
    public double Bill_Required { get; set; }
    public int Class_Id { get; set; }

    public StudentModel(int Id, string Name, string Last_Name, string Father_Name, string Birthdate, string Phone, int Missed_Days, double Bill_Required)
    {
        this.Id = Id;
        this.Name = Name;
        this.Last_Name = Last_Name;
        this.Father_Name = Father_Name;
        this.Birthdate = Birthdate;
        this.Phone = Phone;
        this.Missed_Days = Missed_Days;
        this.Bill_Required = Bill_Required;
    }
}
