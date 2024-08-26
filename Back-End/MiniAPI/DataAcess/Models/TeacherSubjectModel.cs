using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Models
{
    public class TeacherSubjectModel
    {
        public int TeacherSubjectId {  get; set; }
        public TeacherModel? TeacherId {  get; set; }
        public SubjectModel? Subject {  get; set; }
        public int Salary {  get; set; }
        List<ClassModel?> Classes { get; set; } = [];
    }
}
