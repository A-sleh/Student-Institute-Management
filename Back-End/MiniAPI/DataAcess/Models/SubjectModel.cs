using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Models
{
    public class SubjectModel
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public int MaximumMark {  get; set; }

        public SubjectModel() { }
        public SubjectModel(int id, string subject, int maximumMark)
        {
            Id = id;
            Subject = subject;
            MaximumMark = maximumMark;
        }
    }
}
