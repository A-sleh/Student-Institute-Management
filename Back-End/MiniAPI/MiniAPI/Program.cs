using DataAcess.Data;
using DataAcess.DBAccess;
using MiniAPI.APIs;
using System.Buffers.Text;
using System.Diagnostics.SymbolStore;
using System.Runtime.CompilerServices;
using System.Text.Json;
namespace MiniAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            // Add services to the container.
            builder.Services.AddControllers();
            builder.AddProjectServices();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    );
            });
            var app = builder.Build();
            app.UseRouting();
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseHttpsRedirection();

            app.UseCors("CorsPolicy");

            app.UseEndpointsMapper();

            app.Run();
        }
    }
}
