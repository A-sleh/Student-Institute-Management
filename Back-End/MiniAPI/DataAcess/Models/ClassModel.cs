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
        public string Title { get; set; }
        public int Capacity { get; set; }
        public string Grade { get; set; }
        public string Gender { get; set; }
        public ClassModel()
        {
            
        }
        public ClassModel(int Id,  string Title, int Capacity, string Grade, string Gender)
        {
            this.Id = Id;
            this.Title = Title;
            this.Capacity = Capacity;
            this.Grade = Grade;
            this.Gender = Gender;
        }
    }
    
}
