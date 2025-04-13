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
using DataAcess.Extensions;
using Dapper;

namespace DataAcess.Data;

public class BillData : IBillData
{
    private const int MaxLimit = 10000;

    private readonly ISqlDataAccess _db;
    private readonly IStudentData _studentData;

    public BillData(ISqlDataAccess _db, IStudentData studentData)
    {
        this._db = _db;
        _studentData = studentData;
    }

    #region Data Request

    public async Task<PaginatedModel<IEnumerable<BillModel>>> GetBills(string? billType = null,
        BillModel.BillOwnership? billOwner = null,
        int limit = MaxLimit,
        int page = 1,
        string orderBy = nameof(BillModel.Date),
        string orderingType = "DESC",
        DateTime? startDate = null,
        DateTime? endDate = null)
    {
        int total = -1;
        var parameters = new DynamicParameters();
        parameters.Add("@billType", billType);
        parameters.Add("@billOwner", billOwner?.ToString());
        parameters.Add("@limit", limit);
        parameters.Add("@page", page);
        parameters.Add("@orderBy", orderBy);
        parameters.Add("@orderingType", orderingType);
        parameters.Add("@startDate", startDate);
        parameters.Add("@endDate", endDate);
        parameters.Add("@total", total, dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

        var bills = await _db.LoadData<DynamicParameters, BillModel, StudentModel, TeacherModel>(
            "dbo.BillGetAll",
            parameters,
            (bill, student, teacher) => 
            {
                bill.Student = student;
                bill.Teacher = teacher;
                return bill;
            },
            splitOn: $"{nameof(StudentModel.StudentId)}, {nameof(TeacherModel.TeacherId)}");
        var paginatedBills = new PaginatedModel<IEnumerable<BillModel>>(bills, page, PaginationExtension.GetTotalPages(parameters.Get<int>(nameof(total)), limit));
        return paginatedBills;
    }
    public async Task<dynamic> GetTotalPays(int studentId = -1, int teacherId = -1)
    {
        dynamic total;
        dynamic paid;

        if (studentId != -1)
        {
            total = (await _studentData.GetStudentByID(studentId))?.BillRequired ?? 0;
            paid = (await _db.LoadData<int?, dynamic>("dbo.BillGetStudentPays", new { studentId })).First() ?? 0;
        }
        else if (teacherId != -1)
        {
            total = (await _db.LoadData<int?, dynamic>("dbo.BillGetTotalTeacherSalary", new { teacherId })).First() ?? 0;
            paid = (await _db.LoadData<int?, dynamic>("dbo.BillGetTeacherPays", new { teacherId })).First() ?? 0;
        }
        else 
            throw new ArgumentException("cannot get student and teacher pays together, please specifiy one");

        var details = new
        {
            Paid = paid,
            Required = total - paid,
            Total = total
        };

        return details;
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
        var (total, paid) = (await _db.LoadData<(int, int), dynamic>("dbo.BillGetTotalByClass", new { classId })).First();
        var Details = new
        {
            Total = total,
            Paid = paid,
            Remaining = total - paid
        };
        return Details;
    }
    public async Task<IEnumerable<BillModel>> GetExternal(DateTime? date, string type)
    {
        var externalBills = await GetBills(billOwner: BillModel.BillOwnership.external, billType: type, endDate: date);
        return externalBills.Data;
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
        var bills = await GetBills(billType: billType, startDate: startDate, endDate: endDate);
        int total = bills.Data.Sum(s => s.Amount);
        return total;
    }

    public async Task<IEnumerable<dynamic>> GetExternalFiltered(string note = "",
        string billNo = "",
        string? type = null,
        DateTime? date = null)
    {
        var externalBills = await _db.LoadData<BillModel, dynamic>("dbo.BillGetFilteredExternal", new { note, billNo, type, date });
        return externalBills.Select(bill => bill.AsExternalBill());
    }
    
    #endregion

    #region Actions

    /// <summary>
    /// adds bill to database
    /// </summary>
    /// <param name="bill"></param>
    /// <returns>Auto generated billId</returns>
    public async Task<int> AddBill(BillModel bill) => 
        await _db.ExecuteData("dbo.BillAdd", bill.AsSqlRow());

    public async Task DeleteBill(int BillId) => 
        await _db.ExecuteData("dbo.BillDelete", new { BillId });

    #endregion
}
