using DataAcess.Data;
using DataAcess.Exceptions;
using DataAcess.Models;
using Microsoft.AspNetCore.Rewrite;
using System.Data.SqlClient;

namespace MiniAPI.APIs
{
    public static class SettingsAPI
    {
        public static void ConfigureSettingsAPI(this WebApplication app) 
        {
            app.MapGet("/Settings", GetConfigs);
            app.MapPost("/User/Login", Login);
            app.MapPost("/User/Logout", Logout);
            app.MapPost("/User/Password", ChangePassword);
            app.MapPut("/Settings", UpdateConfigs);
        }
        private static async Task<IResult> ChangePassword(ISettingsData data, Credential[] credentials)
        {
            if(credentials.Length < 2)
            {
                return Results.BadRequest("must pass the old and new credentials");
            }
            try
            {
                await data.ChangePassword(credentials[0].Password, credentials[1].Password);
                return Results.Ok();
            }
            catch (SqlException sqlEx)
            {
                return Results.BadRequest(sqlEx.Message);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private async static Task<IResult> Login(ISettingsData data, Credential credential)
        {
            try
            {
                await data.Login(credential.Username, credential.Password);
                return Results.Accepted();
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

        private async static Task<IResult> Logout(ISettingsData data)
        {
            try
            {
                await data.Logout();
                return Results.Ok();
            }
            catch (LoginException loginEx)
            {
                return Results.BadRequest(loginEx.Message);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }
        private async static Task<IResult> UpdateConfigs(ISettingsData data, Dictionary<string, string> configs)
        {
            try
            {
                await data.EditConfig(configs);
                return Results.Ok();
            }
            catch (SqlException sqlEx)
            {
                return Results.BadRequest(sqlEx);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }
        private async static Task<IResult> GetConfigs(ISettingsData data)
        {
			try
			{
                var configs = await data.LoadConfigs();
                return Results.Ok(configs);
			}
			catch (Exception e)
			{
                return Results.Problem(e.Message);
			}
        }
    }
}
