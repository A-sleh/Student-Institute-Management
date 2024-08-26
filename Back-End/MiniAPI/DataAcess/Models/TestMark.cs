using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Models
{
    public class TestMark
    {
        public int TestMarkId { get; set; }
        public int StudentId {  get; set; }
        public int TestId { get; set; }
        public int Mark {  get; set; }
    }
}
