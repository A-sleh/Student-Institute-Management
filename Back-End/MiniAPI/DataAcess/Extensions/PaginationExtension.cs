using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Extensions;

public static class PaginationExtension
{
    public static int GetTotalPages(int total, int pageSize)
    {
        return (total / pageSize) + (total % pageSize == 0 ? 0 : 1);
    }
    public static IEnumerable<T> Paginate<T>(this IEnumerable<T> list, int page, int pageSize)
    {
        var from = ((page - 1) * pageSize);
        var to = ((page - 1) * pageSize) + pageSize;
        return list.Take(from..to);
    }

    public static PaginatedModel<IEnumerable<T>> ToPaginatedList<T>(this IEnumerable<T> data, int page, int total)
    {
        var paginatedList = new PaginatedModel<IEnumerable<T>>(data, page, total);
        return paginatedList;
    }
}
