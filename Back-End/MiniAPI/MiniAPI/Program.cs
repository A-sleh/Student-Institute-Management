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

            builder.AddServices();
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
            //app.Use((context, next) =>
            //{
            //    if (!context.Request.Headers.ContainsKey("login-status"))
            //    {
            //        context.Response.StatusCode = 401;
            //        context.Response.WriteAsync("unauthorized");
            //        return next();
            //    }
            //    return next(context);
            //});
            app.ConfigureAPI();

            app.Run();
        }
    }
}
