using DataAcess.Data;
using DataAcess.DBAccess;
using System.Runtime.CompilerServices;
namespace MiniAPI
{
    public class Program
    {
        public static void ConfigureAPI(ref WebApplication app)
        {
            app.ConfigureStudentAPI();
            app.ConfigureClassAPI();
            app.ConfigureSubjectAPI();
            app.ConfigureReportAPI();
            app.ConfigureTestAPI();
            app.ConfigureTeacherAPI();
            app.ConfigureBillAPI();
        }

        public static void DependancyInjection(ref WebApplicationBuilder builder)
        {
            //Data Access Services

            // Main SQL Access using Dapper
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
        }
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // add services using DependancyInjection method
            DependancyInjection(ref builder);

            // permissions
            // Allow all
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    );
            });
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseAuthorization();
            app.UseHttpsRedirection();

            app.UseCors("CorsPolicy");

            app.UseAuthorization();

            ConfigureAPI(ref app);

            app.Run();
        }
    }
}
