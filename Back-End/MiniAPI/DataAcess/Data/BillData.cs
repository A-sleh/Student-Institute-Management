using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data
{
    public class BillData : IBillData
    {
        // ######################################
        //
        // WARNING
        //
        // SQL IS NOT READY FOR THIS DATA CLASS
        //
        // ######################################
        private static readonly Exception BillNotFound = new("there is not such bill");
        private static readonly Exception SpecifiedNotFound = new("there is no value for specified parameters");
        private readonly ISqlDataAccess _db;

        public BillData(ISqlDataAccess _db)
        {
            this._db = _db;
        }

        public async Task<IEnumerable<BillModel>> GetBills()
        {
            var res = await _db.LoadData<dynamic, BillModel, StudentModel, TeacherModel>(
                "dbo.BillGetAll",
                parameters: new { },
                x: (Bill, Student, Teacher) =>
                {
                    Bill.Student = Student;
                    Bill.Teacher = Teacher;
                    return Bill;
                },
                splitOn: "StudentId, TeacherId");
            if (!res.Any())
            {
                throw BillNotFound;
            }
            return res;
        }

        public async Task<int> GetTotalPays(int studentId)
        {
            var res = await _db.LoadData<int, dynamic>("dbo.BillGetStudentPays", new { studentId });
            if (!res.Any())
                throw SpecifiedNotFound;
            return res.First();
        }

        public async Task<int> GetStudentTotalRequired(int studentId)
        {
            var res = await _db.LoadData<int, dynamic>("dbo.BillGetStudentTotalRequired", new { studentId });
            if (!res.Any())
                throw SpecifiedNotFound;
            return res.First();
        }

        public async Task<int> GetTeacherTotalPays(int teacherId)
        {
            var res = await _db.LoadData<int, dynamic>("dbo.BillGetTeacherPays", new { teacherId });
            if (!res.Any())
                throw SpecifiedNotFound;
            return res.First();
        }

        public async Task<int> GetTeacherTotalRequired(int teacherId)
        {
            var res = await _db.LoadData<int, dynamic>("dbo.BillGetTeacherTotalRequired", new { teacherId });
            if (!res.Any())
                throw SpecifiedNotFound;
            return res.First();
        }

        public async Task<IEnumerable<BillModel>> GetStudentBills(int studentId)
        {
            var res = await _db.LoadData<BillModel, dynamic>("dbo.BillGetByStudentId", new { studentId });
            if (!res.Any())
                throw SpecifiedNotFound;
            return res;
        }

        public async Task<IEnumerable<BillModel>> GetTeacherBills(int teacherId)
        {
            var res = await _db.LoadData<BillModel, dynamic>("dbo.BillGetByTeacherId", new { teacherId });
            if (!res.Any())
                throw SpecifiedNotFound;
            return res;
        }

        public async Task<IEnumerable<BillModel>> GetBillsByDate(string? date)
        {
            if (!DateTime.TryParse(date, out var realdate))
                throw new Exception("date incorrect");
            var res = await _db.LoadData<BillModel, dynamic>("dbo.BillGetByDate", new { Date = realdate });
            if (!res.Any())
                throw SpecifiedNotFound;
            return res;
        }

        public async Task<dynamic> GetClassTotalPays(int classId)
        {
            var res = await _db.LoadData<(int, int), dynamic>("dbo.BillGetTotalByClass", new { classId });
            if (!res.Any())
                throw SpecifiedNotFound;
            var Details = new { 
                Total = res.First().Item1, 
                Paid = res.First().Item2,
                Remaining = res.First().Item1 - res.First().Item2
            };
            return Details;
        }
    }

}
