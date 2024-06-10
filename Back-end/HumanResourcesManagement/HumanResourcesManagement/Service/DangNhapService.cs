using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace HumanResourcesManagement.Service
{
    public class DangNhapService : IDangNhapService
    {
        private readonly NhanSuContext _context;
        public DangNhapService(NhanSuContext context)
        {
            _context = context;
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

            nhanVien.MatKhau = HashPassword(request.MatKhauMoi);
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
