using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Models
{
    public class PaginatedModel<T>
    {
        public T Data { get; set; }
        public int Page { get; set; }
        public int Total { get; set; }

        public PaginatedModel(T data, int page, int total) 
        {
            this.Data = data;
            this.Page = page;
            this.Total = total;
        }
    }
}
