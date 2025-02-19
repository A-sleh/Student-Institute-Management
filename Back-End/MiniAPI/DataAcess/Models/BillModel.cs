using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Models
{
    public class BillModel
    {

        [Serializable]
        public class InvalidBillConvertException : Exception
        {
            public InvalidBillConvertException() { }
            public InvalidBillConvertException(string message) : base(message) { }
            public InvalidBillConvertException(string message, Exception inner) : base(message, inner) { }
        }
        public int BillId { get; set; }
        public string? BillNo { get; set; }
        public StudentModel? Student { get; set; }
        public TeacherModel? Teacher { get; set; }
        public int Amount {  get; set; }
        public DateTime Date {  get; set; }
        public string? Note { get; set; }
        public string? Type { get; set; }

        public dynamic AsSqlRow()
        {
            return new { BillNo, Student?.StudentId, Teacher?.TeacherId, Amount, Date, Note, Type };
        }
        public dynamic AsTeacherBill()
        {
            if(Teacher == null)
                throw new InvalidBillConvertException($"Cannot convert to {nameof(Teacher)} bill");

            return new
            {
                billId = BillId,
                billNo = BillNo,
                teacher = new
                {
                    Teacher.TeacherId,
                    Teacher.Name,
                    Teacher.LastName
                },
                amount = Amount,
                date = Date,
                note = Note,
                type = Type
            };
        }
        public dynamic AsStudentBill()
        {
            if (Student == null)
                throw new InvalidBillConvertException($"Cannot convert to {nameof(Student)} bill");
            return new
            {
                billId = BillId,
                billNo = BillNo,
                student = new 
                { 
                    Student.StudentId,
                    Student.Name,
                    Student.LastName 
                },
                amount = Amount,
                date = Date,
                note = Note,
                type = Type
            };
        }
        public dynamic AsExternalBill()
        {
            if (Student != null || Teacher != null)
                throw new InvalidBillConvertException("Cannot convert to external");
            return new
            {
                billId = BillId,
                billNo = BillNo,
                amount = Amount,
                date = Date,
                note = Note
            };
        }
        public bool DateFilter(DateTime? startDate, DateTime? endDate) =>
            (startDate == null ||   startDate <= Date) &&
            (endDate == null || endDate >= Date);
    }
}