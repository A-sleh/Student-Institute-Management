using DataAcess.Data;
using DataAcess.DBAccess;
using DataAcess.Models;
using MiniAPI.APIs;
using System.Text.Encodings.Web;
using System.Text.Unicode;

namespace MiniAPI
{
    public static class DependancyInjection
    {
        /// <summary>
        /// Configureing and mapping web application endpoints
        /// </summary>
        public static void UseEndpointsMapper(this WebApplication app)
        {
            app.ConfigureStudentAPI();
            app.ConfigureClassAPI();
            app.ConfigureSubjectAPI();
            app.ConfigureReportAPI();
            app.ConfigureTestAPI();
            app.ConfigureTeacherAPI();
            app.ConfigureBillAPI();
            app.ConfigureGradeAPI();
            app.ConfigureSettingsAPI();
        }

        public static void AddProjectServices(this WebApplicationBuilder builder)
        {

            builder.Services.AddSingleton<HtmlEncoder>(
                HtmlEncoder.Create(allowedRanges:
                [
                    UnicodeRanges.All
                ])
            );
            //Data Access Services

            // Main SQL Access Service using Dapper
            builder.Services.AddTransient<ISqlDataAccess, SqlDataAccess>();

            // Services
            builder.Services.AddSingleton<IStudentData, StudentData>();
            builder.Services.AddScoped<IClassData, ClassData>();
            builder.Services.AddScoped<ISubjectData, SubjectData>();
            builder.Services.AddScoped<IReportData, ReportData>();
            builder.Services.AddScoped<ITestData, TestData>();
            builder.Services.AddScoped<ITeacherData, TeacherData>();
            builder.Services.AddScoped<IBillData, BillData>();
            builder.Services.AddScoped<ITeacherSubjectData, TeacherSubjectData>();
            builder.Services.AddScoped<IGradeData, GradeData>();
            builder.Services.AddSingleton<ISettingsData, SettingsData>();
        }
    }


}
