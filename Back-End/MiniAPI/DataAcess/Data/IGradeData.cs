using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data
{
    public interface IGradeData
    {
        Task<IEnumerable<GradeModel>> GetAllGrades(string? filter);
        Task AddGrade(GradeModel model);
        Task DeleteGrade(int gradeId);
        Task UpdateGrade(GradeModel model);
        Task<IEnumerable<dynamic>> GetGradesCount(int? gradeId = null);
    }
}
