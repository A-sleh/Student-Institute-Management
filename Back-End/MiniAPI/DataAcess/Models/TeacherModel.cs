using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Models
{
    public class TeacherModel
    {
        public int TeacherId { get; set; }
        public string? Name { get; set; }
        public string? LastName {  get; set; }
        public string? Phone {  get; set; }
        public List<TeacherSubjectModel?> TeacherSubjects { get; set; } = [];

        public dynamic Details(int SubNO, int classNO) => new {TeacherId, Name, LastName, Phone, SubNO, classNO };
    }
}
