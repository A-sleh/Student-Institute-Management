using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Models
{
    public class BillModel
    {
        public int BillId { get; set; }
        public string? BillNo { get; set; }
        public StudentModel? Student { get; set; }
        public TeacherModel? Teacher { get; set; }
        public int Amount {  get; set; }
        public string? Date {  get; set; }
        public string? Note { get; set; }
        public string? Type { get; set; }
    }
}
