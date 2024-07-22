using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Service.IService
{
    public interface IDangNhapService
    {
        Task<bool> ChangePasswordAsync(DoiMatKhauRequest request);
        Task<TblNhanVien> AuthenticateAsync(string maNhanVien, string matKhau);
        Task<bool> SendPasswordResetEmailAsync(string email);
        Task<bool> ResetPasswordAsync(DatLaiMatKhauRequest request);
    }
}
