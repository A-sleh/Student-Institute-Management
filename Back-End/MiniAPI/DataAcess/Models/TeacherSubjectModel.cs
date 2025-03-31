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
        public TeacherModel? Teacher {  get; set; }
        public SubjectModel? Subject {  get; set; }
        public int Salary {  get; set; }
        public List<ClassModel?> Classes { get; set; } = [];

        public dynamic FromTeacher() => new { TeacherSubjectId, Subject, Salary, Classes = Classes.Select(c => c.PureFormat()) };
    }
}
