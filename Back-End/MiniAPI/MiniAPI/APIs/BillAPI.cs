using Dapper;
using DataAcess.Data;
using DataAcess.Exceptions;
using DataAcess.Models;
using System.Data.SqlClient;
using System.Runtime.CompilerServices;

namespace MiniAPI.APIs;

public static class BillAPI
{
    public static void ConfigureBillAPI(this WebApplication app)
    {
        // Get All Bills
        app.MapGet("/Bill", GetBills);

        // Get Incomes and outcomes infos about a certain class
        app.MapGet("/Bill/Class/{classId}", GetClassTotalBill);

        //Get Bills Of A Student by studentId
        app.MapGet("/Bill/Student/{studentId}", GetStudentBills);

        // Get Student Total Pays (balance) By Id
        app.MapGet("/Bill/Student/{studentId}/balance", GetStudentTotalPays);

        // Get Teacher Total Pays (balance) By Id
        app.MapGet("/Bill/Teacher/{teacherId}/balance", GetTeacherTotalPays);

        // Get Teacher Bills by teacherId
        app.MapGet("/Bill/Teacher/{teacherId}", GetTeacherBills);

        // Get Total Income Value
        app.MapGet("/Bill/Total/Income", GetTotalIn);

        // Get Total Outcome Value
        app.MapGet("/Bill/Total/Outcome", GetTotalOut);

        // Get Bills That is External (not related with a teacher or student)
        // pass date in query to filter the results
        app.MapGet("/Bill/External/{Type}", GetExternal);

        // Add Bill using Bill Model
        app.MapPost("/Bill", AddBill);

        // Remove a Bill
        app.MapDelete("Bill/{billId}", DeleteBill);

        // Get Rest Income or Outcome that will be gained/paid in future
        app.MapGet("/Bill/Rest/{type}", GetRestOf);

        

    }
    private static async Task<IResult> GetRestOf(IBillData data, string type)
    {
        try
        {
            var res = await data.GetRestOf(type);
            return Results.Ok(res);
        }
        catch (Exception e)
        {
            return Results.Problem(e.Message);
        }
    }

    private static async Task<IResult> GetBills(
        IBillData data,
        BillModel.BillOwnership? type = null,
        string? paymentType = null,
        DateTime? startDate = null,
        DateTime? endDate = null,
        int limit = 100,
        int page = 1,
        string orderBy = "Date",
        string orderingType = "DESC"
        )
    {
        try
        {
            var bills = await data.GetBills(paymentType, type, limit, page, orderBy, orderingType, startDate, endDate);
            return Results.Ok(bills);
        }
        catch (Exception e)
        {
            return Results.BadRequest($"{e.Message} | {e.InnerException?.Message}");
        }

    }

    private static async Task<IResult> GetClassTotalBill(IBillData data, int classId)
    {
        try
        {
            var res = await data.GetClassTotalPays(classId);
            return Results.Ok(res);
        }
        catch (Exception e)
        {
            return Results.Problem(e.Message);
        }
    }

    private static async Task<IResult> GetStudentBills(IBillData data, int studentId)
    {
        try
        {
            var res = await data.GetStudentBills(studentId);
            return Results.Ok(res);
        }
        catch (Exception e)
        {
            return Results.BadRequest(e.Message);
        }
    }

    /// <summary>
    /// <item>Gets totals for specified student</item>
    /// <item>based on <paramref name="studentId"/></item>
    /// </summary>
    /// <param name="data">data implementing interface</param>
    /// <param name="type">balance type (income/outcome)</param>
    /// <returns>
    /// dynamic object with memebers:
    /// <list type="table">
    /// <item>Paid</item>
    /// <item>Required</item>
    /// <item>Total</item>
    /// </list>
    /// </returns>
    private static async Task<IResult> GetStudentTotalPays(IBillData data, int studentId)
    {
        try
        {
            var res = await data.GetTotalPays(studentId: studentId);
            return Results.Ok(res);
        }
        catch (ArgumentException ArgEx)
        {
            return Results.BadRequest(ArgEx.Message);
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    /// <summary>
    /// <item>Gets totals for specified teacher</item>
    /// <item>based on <paramref name="teacherId"/></item>
    /// </summary>
    /// <param name="data">data implementing interface</param>
    /// <param name="type">balance type (income/outcome)</param>
    /// <returns>
    /// dynamic object with memebers:
    /// <list type="table">
    /// <item>Paid</item>
    /// <item>Required</item>
    /// <item>Total</item>
    /// </list>
    /// </returns>
    private static async Task<IResult> GetTeacherTotalPays(IBillData data, int teacherId)
    {
        try
        {
            var res = await data.GetTotalPays(teacherId: teacherId);
            return Results.Ok(res);
        }
        catch (ArgumentException argEx)
        {
            return Results.BadRequest($"Paramenters invalid: {argEx.Message}");
        }
        catch (Exception e)
        {
            return Results.BadRequest(e.Message);
        }
    }

    private static async Task<IResult> GetTeacherBills(IBillData data, int teacherId)
    {
        try
        {
            var res = await data.GetTeacherBills(teacherId);
            return Results.Ok(res);
        }
        catch (Exception e)
        {
            return Results.BadRequest(e.Message);
        }
    }

    private static async Task<IResult> GetTotalIn(IBillData data, DateTime? startDate = null, DateTime? endDate = null)
    {
        try
        {
            var res = await data.GetTotalByParam(startDate, endDate, "in");
            return Results.Ok(res);
        }
        catch (ArgumentException argEx)
        {
            return Results.BadRequest($"Paramenters invalid: {argEx.Message}");
        }
        catch (Exception e)
        {
            return Results.BadRequest(e.Message);
        }
    }

    private static async Task<IResult> GetTotalOut(IBillData data, DateTime? startDate = null, DateTime? endDate = null)
    {
        try
        {
            var res = await data.GetTotalByParam(startDate, endDate, "out");
            return Results.Ok(res);
        }
        catch (ArgumentException argEx)
        {
            return Results.BadRequest($"Paramenters invalid: {argEx.Message}");
        }
        catch (Exception e)
        {
            return Results.BadRequest(e.Message);
        }
    }

    private static async Task<IResult> GetExternal(IBillData data, DateTime? date, string Type)
    {
        try
        {
            var res = await data.GetExternal(date, Type);
            return Results.Ok(res);
        }
        catch (Exception e)
        {
            return Results.BadRequest(e.Message);
        }
    }

    private static async Task<IResult> AddBill(IBillData data, BillModel model)
    {
        try
        {
            model.BillId = await data.AddBill(model);
            return Results.Ok(model);
        }
        catch (SqlException sqlEx)
        {
            return Results.BadRequest(sqlEx.Message);
        }
        catch (Exception e)
        {
            return Results.Problem(e.Message);
        }
    }

    private static async Task<IResult> DeleteBill(IBillData data, int billId)
    {
        try
        {
            await data.DeleteBill(billId);
            return Results.Ok("DeleteSuccess");
        }
        catch (SqlException sqlEx)
        {
            return Results.BadRequest($"Error: {sqlEx.Message}");
        }
        catch (Exception e)
        {
            return Results.Problem(e.Message);
        }
    }
}
