using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Models
{
    public class SubjectModel
    {
        public int SubjectId { get; set; }
        public string? Subject { get; set; }
        public string? Grade {  get; set; }
        public int MaximumMark {  get; set; }
    }
}
