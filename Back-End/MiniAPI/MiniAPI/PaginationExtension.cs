using System.Numerics;
using System.Collections.Generic;
using System.Linq;

namespace MiniAPI
{
    public static class PaginationExtension
    {
        public static IEnumerable<T> Paginate<T>(this IEnumerable<T> list, int page, int pageSize)
        {
            var from = ((page - 1) * pageSize);
            var to = ((page - 1) * pageSize) + pageSize;
            return list.Take(from .. to);
        }
    }
}
