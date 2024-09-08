using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Models
{
    public class TeacherSubjectClassModel
    {
        public int TSCId { get; set; }
        public TeacherSubjectModel? TeacherSubject {  get; set; }
        public ClassModel? Class {  get; set; }
    }
}
