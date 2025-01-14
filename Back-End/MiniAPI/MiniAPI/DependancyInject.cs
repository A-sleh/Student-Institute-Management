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
        /// Configureing and Mapping Endpoints
        /// </summary>
        /// <param name="app">Already Built Application With specific services</param>
        public static void ConfigureAPI(this WebApplication app)
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
        /// <summary>
        /// Adds Specified Services
        /// </summary>
        /// <param name="builder">application builder</param>
        public static void AddServices(this WebApplicationBuilder builder)
        {

            builder.Services.AddSingleton<HtmlEncoder>(
                HtmlEncoder.Create(allowedRanges:
                [
                    UnicodeRanges.All
                ])
            );
            //Data Access Services

            // Main SQL Access Service using Dapper
            builder.Services.AddSingleton<ISqlDataAccess, SqlDataAccess>();

            // Services
            builder.Services.AddSingleton<IStudentData, StudentData>();
            builder.Services.AddSingleton<IClassData, ClassData>();
            builder.Services.AddSingleton<ISubjectData, SubjectData>();
            builder.Services.AddSingleton<IReportData, ReportData>();
            builder.Services.AddSingleton<ITestData, TestData>();
            builder.Services.AddSingleton<ITeacherData, TeacherData>();
            builder.Services.AddSingleton<IBillData, BillData>();
            builder.Services.AddSingleton<ITeacherSubjectData, TeacherSubjectData>();
            builder.Services.AddSingleton<IGradeData, GradeData>();
            builder.Services.AddSingleton<ISettingsData, SettingsData>();
        }
    }


}
