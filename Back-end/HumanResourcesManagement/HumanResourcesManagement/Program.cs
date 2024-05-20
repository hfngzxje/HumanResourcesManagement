using Microsoft.EntityFrameworkCore;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.Service;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Config.Mapper;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<INhanVienService, NhanVienService>();


        builder.Services.AddAutoMapper(typeof(NhanVienMapper));

        builder.Services.AddSession(options =>
        {
            options.IdleTimeout = TimeSpan.FromMinutes(30);
            options.Cookie.HttpOnly = true;
            options.Cookie.IsEssential = true;
        });
        builder.Services.AddHttpContextAccessor();
        builder.Services.AddDistributedMemoryCache();
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddCors(opts =>
        {
            opts.AddPolicy("CORSPolicy", builder => builder.AllowAnyHeader().AllowAnyMethod().AllowCredentials().SetIsOriginAllowed((host) => true));
        });

        builder.Services.AddDbContext<NhanSuContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("MyDB")));


        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
        }
        app.UseSession();
        app.UseHttpsRedirection();
        app.UseCors("CORSPolicy");
        app.MapControllers();
        app.UseRouting();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });

        app.Run();
    }
}