using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using DataAcess.Exceptions;
using System.Collections;

namespace DataAcess.Data
{
    public class BillData : IBillData
    {
        private const int UNLIMITED = 10000;

        private readonly ISqlDataAccess _db;

        public BillData(ISqlDataAccess _db)
        {
            this._db = _db;
        }

        #region Data Request

        public async Task<IEnumerable<BillModel>> GetBills(
            string? billType,
            int limit = UNLIMITED,
            int page = 1,
            string orderBy = nameof(BillModel.BillId),
            string orderingType = "ASC",
            DateTime? startDate = null,
            DateTime? endDate = null)
        {
            var bills = await _db.LoadData<dynamic, BillModel, StudentModel, TeacherModel>(
                "dbo.BillGetAll",
                new { billType, startDate, endDate, limit, page, orderBy, orderingType },
                (bill, student, teacher) => 
                {
                    bill.Student = student;
                    bill.Teacher = teacher;
                    return bill;
                },
                splitOn: $"{nameof(StudentModel.StudentId)}, {nameof(TeacherModel.TeacherId)}");

            return bills;     
        }
        public async Task<dynamic> GetTotalPays(int? studentId = null, int? teacherId = null)
        {
            dynamic total;
            dynamic paid;

            if (studentId != null)
            {
                total = (await _db.LoadData<StudentModel, dynamic>("dbo.StudentGet", new { Id = studentId })).FirstOrDefault()?.BillRequired ?? 0;
                paid = (await _db.LoadData<int?, dynamic>("dbo.BillGetStudentPays", new { studentId })).First() ?? 0;
            }
            else if (teacherId != null)
            {
                total = (await _db.LoadData<int?, dynamic>("dbo.BillGetTotalTeacherSalary", new { teacherId })).First() ?? 0;
                paid = (await _db.LoadData<int?, dynamic>("dbo.BillGetTeacherPays", new { teacherId })).First() ?? 0;
            }
            else 
                throw new InvalidParametersException("cannot get student and teacher pays together, please specifiy one");

            var res = new
            {
                Paid = paid,
                Required = total - paid,
                Total = total
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
        public async Task<dynamic> GetClassTotalPays(int classId)
        {
            var res = (await _db.LoadData<(int total, int paid), dynamic>("dbo.BillGetTotalByClass", new { classId })).First();
            var Details = new
            {
                Total = res.total,
                Paid = res.paid,
                Remaining = res.total - res.paid
            };
            return Details;
        }
        public async Task<IEnumerable<BillModel>> GetExternal(DateTime? date, string type)
        {
            var externalBills = await GetBills("external", endDate: date);
            return externalBills.Where(bill => bill.Type.Equals(type));
        }
        public async Task<int> GetRestOf(string type)
        {
            var res = (await _db.LoadData<int?, dynamic>("dbo.BillGetRestOf", new { type })).FirstOrDefault() ?? 0;
            return res;
        }
        public async Task<int> GetTotalByParam(DateTime? startDate, DateTime? endDate, string billType)
        {
            if (!(billType.Equals("in") || billType.Equals("out")))
                throw new ArgumentException("param type must be (in / out) only");
            var bills = await GetBills(billType, startDate: startDate, endDate: endDate);
            int total = bills.Sum(s => s.Amount);
            return total;
        }
        #endregion

        #region Actions
        public async Task AddBill(BillModel bill)
        {
            await _db.ExecuteData("dbo.BillAdd", bill.AsSqlRow());
        }

        public async Task DeleteBill(int BillId)
        {
            await _db.ExecuteData("dbo.BillDelete", new { BillId });
        }

        #endregion
    }

}
