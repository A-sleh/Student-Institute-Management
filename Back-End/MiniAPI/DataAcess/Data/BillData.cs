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

        #region Data Request

        public async Task<IEnumerable<dynamic>> GetBills(string? type, int limit, int page, string orderBy, string orderingType)
        {
            var res = await _db.LoadData<dynamic, BillModel, StudentModel, TeacherModel>(
                "dbo.BillGetAll",
                new { type, limit, page, orderBy, orderingType },
                (bill, student, teacher) => 
                {
                    bill.Student = student;
                    bill.Teacher = teacher;
                    return bill;
                },
                splitOn: "StudentId, TeacherId");
            return res.Select(s =>
            {
                dynamic jsonFormat;
                if (s.Student != null)
                {
                    jsonFormat = new
                    {
                        student = new 
                        {
                            s.Student.StudentId,
                            s.Student.Name,
                            s.Student.LastName
                        },
                        s.BillId,
                        s.BillNo,
                        s.Amount,
                        s.Date,
                        s.Type,
                        s.Note,
                        s.Teacher
                    };
                }
                else if (s.Teacher != null)
                {
                    jsonFormat = new
                    {
                        teacher = new
                        {
                            s.Teacher.TeacherId,
                            s.Teacher.Name,
                            s.Teacher.LastName
                        },
                        s.BillId,
                        s.BillNo,
                        s.Amount,
                        s.Date,
                        s.Type,
                        s.Note,
                        s.Student
                    };
                }
                else
                    jsonFormat = new
                    {
                        s.BillId,
                        s.BillNo,
                        s.Amount,
                        s.Date,
                        s.Type,
                        s.Note,
                        s.Student,
                        s.Teacher
                    };
                return jsonFormat;
            });
        }
        public async Task<dynamic> GetTotalPays(int? studentId, int? teacherId)
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
                throw new Exception("cannot get student and teacher pays together, please specifiy one");

            var res = new
            {
                Paid = paid,
                Required = total - paid,
                Total = total
            };

            return res;
        }
        public Task<dynamic> GetStudentTotalPays(int studentId)
        {
            throw new NotImplementedException("this function is not implemented anymore, and will be removed");
        }
        public Task<dynamic> GetTeacherTotalPays(int teacherId)
        {
            throw new NotImplementedException("this function is not implemented anymore, and will be removed");
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
        public async Task<IEnumerable<dynamic>> GetBillsByDate(string? date)
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
            return res.Select(x => 
            {
                dynamic jsonFormat;
                if (x.Student != null)
                {
                    jsonFormat =  new
                    {
                        x.BillId,
                        x.BillNo,
                        x.Type,
                        x.Amount,
                        x.Date,
                        student = new
                        {
                            x.Student.StudentId,
                            x.Student.Name,
                            x.Student.LastName
                        }
                    };
                }
                else if (x.Teacher != null)
                {
                    jsonFormat = new
                    {
                        x.BillId,
                        x.BillNo,
                        x.Type,
                        x.Amount,
                        x.Date,
                        teacher = new
                        {
                            x.Teacher.TeacherId,
                            x.Teacher.Name,
                            x.Teacher.LastName
                        },
                        x.Student
                    };
                }
                else
                {
                    jsonFormat = new
                    {
                        x.BillId,
                        x.BillNo,
                        x.Type,
                        x.Amount,
                        x.Date,
                        x.Student,
                        x.Teacher
                    };
                }
                return jsonFormat;
            });
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
            if(date != null)
            {
                date = ValidationMethods.validateDigitsOfDate(date);
            }
            return res.Where(b => date == null || b.Date.ToString().Contains(date));
        }
        public async Task<dynamic> GetRestOf(string type)
        {
            var res = await _db.LoadData<int, dynamic>("dbo.BillGetRestOf", new { type });
            return res.FirstOrDefault();
        }
        private async Task<int> GetTotalByParam(string param)
        {
            if (param.Equals("in") || param.Equals("out"))
                return (await _db.LoadData<int?, dynamic>("dbo.BillGetTotalByParam", new { Type = param })).First() ?? 0;
            else throw new Exception("Invalid Parameter");
        }
        #endregion

        #region Actions
        public async Task AddBill(BillModel bill)
        {
            if (bill == null)
                throw new Exception("Bill Can not be null");
            bill.Student ??= new StudentModel();
            bill.Teacher ??= new TeacherModel();
            await _db.ExecuteData("dbo.BillAdd", new
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
            await _db.ExecuteData("dbo.BillDelete", new { BillId });
        }

        #endregion
    }

}
