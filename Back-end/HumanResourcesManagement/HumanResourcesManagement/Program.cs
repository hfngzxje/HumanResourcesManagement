using Microsoft.EntityFrameworkCore;
using HumanResourcesManagement.Service.IService;
using HumanResourcesManagement.Service;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Config.Mapper;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Config;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

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
        builder.Services.AddScoped<IDanhMucNgoaiNguService, DanhMucNgoaiNguService>();
        builder.Services.AddScoped<IDanhMucToService, DanhMucToService>();
        builder.Services.AddScoped<IDanhMucKhenThuongKyLuatService, DanhMucKhenThuongKyLuatService>();
        builder.Services.AddScoped<IDanhMucHinhThucDaoTaoService, DanhMucHinhThucDaoTaoService>();
        builder.Services.AddScoped<ILoaiHopDongService, LoaiHopDongService>();
        builder.Services.AddScoped<IDangNhapService, DangNhapService>();
        builder.Services.AddScoped<IBaoCaoService, BaoCaoService>();
        builder.Services.AddScoped<IDanhMucNhomLuongService, DanhMucNhomLuongService>();








        builder.Services.AddHostedService<BirthdayEmailBackgroundService>();

        builder.Services.AddScoped<EmailService>();
        builder.Services.AddScoped<BirthdayService>();


        builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

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
        builder.Services.AddSession();
        builder.Services.AddMemoryCache();
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
        app.UseSession();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });

        app.Run();


        var host = Host.CreateDefaultBuilder(args)
                .ConfigureServices((context, services) =>
                 {
                       services.AddSingleton<EmailService>();
                       services.AddSingleton<BirthdayService>();
                       services.AddHostedService<BirthdayCheckHostedService>();
                }).Build();

        host.Run();
    }
}
