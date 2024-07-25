using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;

namespace HumanResourcesManagement.Service
{
    public class DangNhapService : IDangNhapService
    {
        private readonly NhanSuContext _context;
        private readonly IMemoryCache _memoryCache;
        private readonly string _baseUrl;
        private readonly TimeSpan _tokenExpiryDuration = TimeSpan.FromMinutes(5); 

        public DangNhapService(NhanSuContext context, IMemoryCache memoryCache, IOptions<AppSettings> appSettings)
        {
            _context = context;
            _memoryCache = memoryCache;
            _baseUrl = appSettings.Value.BaseUrl;
        }


        public async Task<TblNhanVien> AuthenticateAsync(string maNhanVien, string matKhau)
        {
            string hashedPassword = HashPassword(matKhau);
            var nhanVien = await _context.TblNhanViens
                .FirstOrDefaultAsync(nv => nv.Ma == maNhanVien && nv.MatKhau == hashedPassword);

            return nhanVien;
        }

        public async Task<bool> ChangePasswordAsync(DoiMatKhauRequest request)
        {
            var nhanVien = await _context.TblNhanViens.FirstOrDefaultAsync(nv => nv.Ma == request.MaNhanVien);
            if (nhanVien == null)
            {
                throw new Exception("Mã nhân viên không tồn tại.");
            }

            string oldHashedPassword = HashPassword(request.MatKhauCu);
            if (nhanVien.MatKhau != oldHashedPassword)
            {
                throw new Exception("Mật khẩu cũ không đúng.");
            }

            if (request.MatKhauMoi != request.XacNhanMatKhauMoi)
            {
                throw new Exception("Mật khẩu mới và nhập lại mật khẩu mới không khớp.");
            }

            if (!IsValidPassword(request.MatKhauMoi))
            {
                throw new Exception("Mật khẩu mới phải dài hơn 6 ký tự và chứa ít nhất một ký tự đặc biệt.");
            }

            nhanVien.MatKhau = HashPassword(request.MatKhauMoi);
            await _context.SaveChangesAsync();
            return true;
        }

        private bool IsValidPassword(string password)
        {
            if (password.Length < 6)
            {
                return false;
            }

            if (!password.Any(char.IsPunctuation) && !password.Any(char.IsSymbol))
            {
                return false;
            }

            return true;
        }



        public async Task<bool> SendPasswordResetEmailAsync(string email)
        {
            var nhanVien = await _context.TblNhanViens.FirstOrDefaultAsync(nv => nv.Email == email);
            if (nhanVien == null)
            {
                throw new Exception("Email không tồn tại.");
            }

            var token = Guid.NewGuid().ToString();
            _memoryCache.Set(token, email, TimeSpan.FromMinutes(10));

            var resetUrl = $"{_baseUrl}/pages/authentic/resetPassword.html?token={token}";

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                UseDefaultCredentials = false,
                Credentials = new System.Net.NetworkCredential("buiduchung300802@gmail.com", "ocpb abuz ztmj gmkc"),
                Port = 587,
                EnableSsl = true
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("buiduchung300802@gmail.com"),
                Subject = "Yêu cầu đặt lại mật khẩu",
                Body = $"Xin chào {nhanVien.Ten},<br><br>" +
                       $"Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng nhấp vào link sau để đặt lại mật khẩu:<br>" +
                       $"<a href='{resetUrl}'>Đặt lại mật khẩu</a><br><br>" +
                       "Link sẽ hết hạn sau 10 phút.<br><br>" +
                       "Trân trọng,<br>Phòng Nhân Sự",
                IsBodyHtml = true
            };

            mailMessage.To.Add(email);

            try
            {
                await smtpClient.SendMailAsync(mailMessage);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Không thể gửi email: " + ex.Message);
            }
        }

        public async Task<bool> ResetPasswordAsync(DatLaiMatKhauRequest request)
        {
            if (request.MatKhauMoi != request.XacNhanMatKhauMoi)
            {
                throw new Exception("Mật khẩu mới và xác nhận mật khẩu mới không khớp.");
            }

            if (!_memoryCache.TryGetValue(request.Token, out string email))
            {
                throw new Exception("Token không hợp lệ hoặc đã hết hạn.");
            }

            var nhanVien = await _context.TblNhanViens.FirstOrDefaultAsync(nv => nv.Email == email);
            if (nhanVien == null)
            {
                throw new Exception("Email không tồn tại.");
            }

            if (!IsValidPassword(request.MatKhauMoi))
            {
                throw new Exception("Mật khẩu mới phải dài hơn 6 ký tự và chứa ít nhất một ký tự đặc biệt.");
            }

            nhanVien.MatKhau = HashPassword(request.MatKhauMoi);
            _context.TblNhanViens.Update(nhanVien);
            await _context.SaveChangesAsync();

            return true;
        }



        private string HashPassword(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }


    }
}
