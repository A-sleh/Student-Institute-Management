using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
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

        public async Task<IEnumerable<BillModel>> GetBills(string? type, int? limit, string? orderBy, string? orderingType)
        {
            var res = await _db.LoadData<BillModel, dynamic>("dbo.BillGetAll", new { type, limit, orderBy, orderingType });
            return res;
        }

        public async Task<dynamic> GetStudentTotalPays(int studentId)
        {
            var studentTotalRequired = (await _db.LoadData<StudentModel, dynamic>("dbo.StudentGet", new { Id = studentId })).FirstOrDefault()?.BillRequired;

            var paid = (await _db.LoadData<int?, dynamic>("dbo.BillGetStudentPays", new { studentId })).First() ?? 0;

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
            var teacherTotalSalary = (await _db.LoadData<int?, dynamic>("dbo.BillGetTotalTeacherSalary", new { teacherId })).First();

            var paid = (await _db.LoadData<int?, dynamic>("dbo.BillGetTeacherPays", new { teacherId })).First() ?? 0;

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
            var Date = ValidationMethods.TryParseDateForSqlQuery(date, "-");
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
            var res = (await _db.LoadData<(int, int), dynamic>("dbo.BillGetTotalByClass", new { classId })).First();
            var Details = new
            {
                Total = res.Item1,
                Paid = res.Item2,
                Remaining = res.Item1 - res.Item2
            };
            return Details;
        }

        public async Task<dynamic> GetTotalIncome()
        {
            var res = new { Income = await GetTotalByParam("in") };
            return res;
        }

        public async Task<dynamic> GetTotalOutcome()
        {
            var res = new { Outcome = await GetTotalByParam("out") };
            return res;
        }

        public async Task<IEnumerable<BillModel>> GetExternal(string? date, string Type)
        {
            var res = await _db.LoadData<BillModel, dynamic>("dbo.BillGetExternal", new { Type });
            if(date != null && date.Length > 0)
            {
                return res.Where(
                    x =>
                    {
                        return x.Date != null && x.Date.Contains(date);
                    });
            } 
            return res;
        }

        public async Task AddBill(BillModel bill)
        {
            if (bill == null)
                throw new Exception("Bill Can not be null");
            bill.Student ??= new StudentModel();
            bill.Teacher ??= new TeacherModel();
            await _db.SaveData("dbo.BillAdd", new
            {
                bill.BillNo,
                bill.Type,
                bill.Date,
                bill.Amount,
                bill.Student.StudentId,
                bill.Teacher.TeacherId,
                bill.Note
            });
        }

        public async Task DeleteBill(int BillId)
        {
            await _db.SaveData("dbo.BillDelete", new { BillId });
        }

        public async Task<dynamic> GetRestOf(string type)
        {
            if (!type.Equals("in") && !type.Equals("out"))
                throw new Exception("Invalid Type");
            var res = await _db.LoadData<int, dynamic>("dbo.BillGetRestOf", new { type });
            return res.FirstOrDefault();
        }

        private async Task<int> GetTotalByParam(string param) =>
            (await _db.LoadData<int?, dynamic>("dbo.BillGetTotalByParam", new { Type = param })).First() ?? 0;
    }

}
