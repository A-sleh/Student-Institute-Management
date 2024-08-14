using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Models
{
    public class ClassModel
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public int Capacity { get; set; }
        public string? Grade { get; set; }
        public string? Gender { get; set; }
        public List<StudentModel> Students { get; set; } = [];
    }
    
}
