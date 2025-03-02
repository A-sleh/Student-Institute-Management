using System.Numerics;
using System.Collections.Generic;

namespace MiniAPI
{
    public static class PaginationExtension
    {
        public static IEnumerable<T> Paginate<T>(this IEnumerable<T> list, int page, int pageSize)
        {
            return list.Skip((page - 1) * pageSize).Take(pageSize);
        }
    }
}
