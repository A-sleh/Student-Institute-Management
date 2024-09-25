using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Models
{
    public class TestMarkModel
    {
        public int TestMarkId { get; set; }
        public StudentModel? Student {  get; set; }
        public TestModel? Test { get; set; }
        public int? Mark {  get; set; }
    }
}
