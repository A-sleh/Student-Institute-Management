using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Models
{
    public class BillModel
    {

        [Serializable]
        public class BillConvertionException : ArgumentNullException
        {
            public BillConvertionException() { }
            public BillConvertionException(string message) : base(message) { }
            public BillConvertionException(string message, Exception inner) : base(message, inner) { }
        }
        public enum BillOwnership { student, teacher, external };
        public int BillId { get; set; }
        public string? BillNo { get; set; }
        public StudentModel? Student { get; set; }
        public TeacherModel? Teacher { get; set; }
        public int Amount {  get; set; }
        public DateTime Date {  get; set; }
        public string? Note { get; set; }
        public string Type { get; set; } = string.Empty;

        public dynamic AsSqlRow()
        {
            return new { BillNo, Student?.StudentId, Teacher?.TeacherId, Amount, Date, Note, Type };
        }

        /// <summary>
        /// Try convert this bill to teacher bill DTO
        /// </summary>
        /// <returns>Dynamic DTO object represents teacher bill</returns>
        /// <exception cref="BillConvertionException"></exception>
        public dynamic AsTeacherBill()
        {
            if(Teacher == null)
                throw new BillConvertionException($"Cannot convert to {nameof(Teacher)} bill");

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

        /// <summary>
        /// Try convert this bill to student bill DTO
        /// </summary>
        /// <returns>Dynamic DTO object represents student bill</returns>
        /// <exception cref="BillConvertionException"></exception>
        public dynamic AsStudentBill()
        {
            if (Student == null)
                throw new BillConvertionException($"Cannot convert to {nameof(Student)} bill");
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

        /// <summary>
        /// Try convert this bill to external bill DTO(non student or teacher) 
        /// </summary>
        /// <returns>Dynamic DTO object represents external bill (non student or teacher)</returns>
        /// <exception cref="BillConvertionException"></exception>
        public dynamic AsExternalBill()
        {
            if (Student != null || Teacher != null)
                throw new BillConvertionException("Cannot convert to external");
            return new
            {
                billId = BillId,
                billNo = BillNo,
                amount = Amount,
                date = Date,
                note = Note
            };
        }

        /// <summary>
        /// converts to specified ownership type bill DTO
        /// </summary>
        /// <returns>Dynamic DTO object represents (teacher | student | external)</returns>
        public dynamic ConvertBill()
        {
            if (Teacher != null)
                return AsTeacherBill();
            if (Student != null)
                return AsStudentBill();
            return AsExternalBill();
        }
        public bool DateFilter(DateTime? startDate, DateTime? endDate) =>
            (startDate == null ||   startDate <= Date) &&
            (endDate == null || endDate >= Date);
    }
}