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
            return res;
        }

        public async Task<dynamic> GetStudentTotalPays(int studentId)
        {
            var studentTotalRequired = (await _db.LoadData<StudentModel, dynamic>("dbo.StudentGetById", new { studentId })).First().BillRequired;

            var paid = (await _db.LoadData<int, dynamic>("dbo.BillGetStudentPays", new { studentId })).First();

            var res = new
            {
                Paid = paid,
                Required = studentTotalRequired - paid,
                Total = studentTotalRequired
            };
            return res;
        }

        public async Task<dynamic> GetTeacherTotalPays(int teacherId)
        {
            var teacherTotalSalary = (await _db.LoadData<int, dynamic>("dbo.BillGetTotalTeacherSalary", new { teacherId })).First();

            var paid = (await _db.LoadData<int, dynamic>("dbo.BillGetTeacherPays", new { teacherId })).First();

            var res = new
            {
                Paid = paid,
                Required = teacherTotalSalary - paid,
                Total = teacherTotalSalary
            };
            return res;
        }

        public async Task<IEnumerable<BillModel>> GetStudentBills(int studentId)
        {
            var res = await _db.LoadData<BillModel, dynamic>("dbo.BillGetByStudentId", new { studentId });
            return res;
        }

        public async Task<IEnumerable<BillModel>> GetTeacherBills(int teacherId)
        {
            var res = await _db.LoadData<BillModel, dynamic>("dbo.BillGetByTeacherId", new { teacherId });
            return res;
        }

        public async Task<IEnumerable<BillModel>> GetBillsByDate(string? date)
        {
            var Date = ValidationMethods.TryParseDateForSqlQuery(date);
            var res = await _db.LoadData<dynamic, BillModel, StudentModel, TeacherModel>(
                "dbo.BillGetByDate",
                new { Date },
                x: (Bill, Student, Teacher) =>
                {
                    Bill.Student = Student;
                    Bill.Teacher = Teacher;
                    return Bill;
                },
                splitOn: "StudentId, TeacherId");
            return res;
        }

        public async Task<dynamic> GetClassTotalPays(int classId)
        {
            var res = await _db.LoadData<(int, int), dynamic>("dbo.BillGetTotalByClass", new { classId });
            var Details = new
            {
                Total = res.First().Item1,
                Paid = res.First().Item2,
                Remaining = res.First().Item1 - res.First().Item2
            };
            return Details;
        }

        public async Task<dynamic> GetTotalIncome()
        {
            var res = new { Income = (await _db.LoadData<int?, dynamic>("dbo.BillGetTotalByParam", new { Type = "in" })).First() };
            return res;
        }

        public async Task<dynamic> GetTotalOutcome()
        {
            var res = new { Outcome = (await _db.LoadData<int?, dynamic>("dbo.BillGetTotalByParam", new { Type = "out" })).First() };
            return res;
        }

        public async Task<IEnumerable<BillModel>> GetExternalIncome(string? date)
        {
            var res = await _db.LoadData<BillModel, dynamic>("dbo.BillGetExternal", new { Type = "in" });
            if (date != null)
            {
                var Date = ValidationMethods.TryParseDateForSqlQuery(date);
                return
                    res.Where(x =>
                    {
                        if (x.Date == null || Date == null)
                            return false;
                        else
                            return x.Date.Contains(Date);
                    });
            }
            return res;
        }

        public async Task<IEnumerable<BillModel>> GetExternalOutcome(string? date)
        {
            var Date = ValidationMethods.TryParseDateForSqlQuery(date);
            var res = await _db.LoadData<BillModel, dynamic>("dbo.BillGetExternalOut", new { Type = "out" });

            if (Date != null)
            {
                return res.Where(x =>
                {
                    if (x.Date == null || Date == null)
                        return false;
                    else
                        return x.Date.Contains(Date);
                });
            }
            return res;
        }
    }

}
