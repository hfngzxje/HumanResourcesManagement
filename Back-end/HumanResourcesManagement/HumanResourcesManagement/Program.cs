using Microsoft.EntityFrameworkCore;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.Service;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Config.Mapper;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<INhanVienService, NhanVienService>();
        builder.Services.AddScoped<INguoiThanService, NguoiThanService>();
        builder.Services.AddScoped<IHopDongService, HopDongService>();
        builder.Services.AddScoped<IDieuChuyenService, DieuChuyenService>();
        builder.Services.AddScoped<ITrinhDoVanHoaService, TrinhDoVanHoaService>();
        builder.Services.AddScoped<INgoaiNguService, NgoaiNguService>();
        builder.Services.AddScoped<IKhenThuongKiLuatService, KhenThuongKiLuatService>();
        builder.Services.AddScoped<IDanhMucDanTocService, DanhMucDanTocService>();
        builder.Services.AddScoped<IDanhMucTonGiaoService, DanhMucTonGiaoService>();
        builder.Services.AddScoped<IChuyenMonService, ChuyenMonService>();
        builder.Services.AddScoped<ITrinhDoService, TrinhDoService>();
        builder.Services.AddScoped<IHoSoLuongService, HoSoLuongService>();
        builder.Services.AddScoped<IChucDanhService, ChucDanhService>();
        builder.Services.AddScoped<IPhongBanService, PhongBanService>();
        builder.Services.AddScoped<IDanhMucQuanHeService, DanhMucQuanHeService>();
        builder.Services.AddScoped<IImageService, ImageService>();




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
