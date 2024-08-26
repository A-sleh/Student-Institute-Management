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
        public TeacherSubjectModel? TeacherSubjectId {  get; set; }
        public ClassModel? ClassId {  get; set; }
    }
}
