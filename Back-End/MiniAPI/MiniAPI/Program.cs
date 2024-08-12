using DataAcess.Data;
using DataAcess.DBAccess;
namespace MiniAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddSingleton<ISqlDataAccess, SqlDataAccess>();
            builder.Services.AddSingleton<IStudentData, StudentData>();
<<<<<<< HEAD
            builder.Services.AddCors(options =>{
=======
            builder.Services.AddSingleton<IClassData, ClassData>();
            builder.Services.AddCors(options =>
            {
>>>>>>> fad73456fc89438228a7894797464c1ed56fd7a9
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

            app.UseDefaultFiles()  ;
            app.UseStaticFiles() ;
            app.UseCors("CorsPolicy");
            app.UseAuthorization() ;
            app.UseHttpsRedirection();

            app.UseCors("CorsPolicy");

            app.UseAuthorization();

            app.ConfigureStudentAPI();
            app.ConfigureClassAPI();

            app.Run();
        }
    }
}
