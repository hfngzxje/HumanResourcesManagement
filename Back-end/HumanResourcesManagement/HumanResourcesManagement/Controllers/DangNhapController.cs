using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DangNhapController : ControllerBase
    {
        private readonly NhanSuContext _context;
        private readonly IDangNhapService _dangNhapService;

        public DangNhapController(NhanSuContext context, IDangNhapService dangNhapService)
        {
            _context = context;
            _dangNhapService = dangNhapService;
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login([FromBody] DangNhapRequest request)
        {
            if (string.IsNullOrEmpty(request.MaNhanVien) || string.IsNullOrEmpty(request.MatKhau))
            {
                return BadRequest("Mã nhân viên và mật khẩu không được để trống.");
            }

            var nhanVien = await _dangNhapService.AuthenticateAsync(request.MaNhanVien, request.MatKhau);

            if (nhanVien == null)
            {
                return Unauthorized("Mã nhân viên hoặc mật khẩu không đúng.");
            }

            HttpContext.Session.SetString("MaNhanVien", nhanVien.Ma);
            HttpContext.Session.SetInt32("VaiTroId", nhanVien.VaiTroId.GetValueOrDefault());

            return Ok(new
            {
                Message = "Đăng nhập thành công",
                NhanVien = new
                {
                    Ma = nhanVien.Ma,
                    Ten = nhanVien.Ten,
                    Email = nhanVien.Email,
                    VaiTroId = nhanVien.VaiTroId
                }
            });
        }


        [HttpPost("ChangePassword")]
        public async Task<ActionResult> ChangePassword([FromBody] DoiMatKhauRequest request)
        {
            if (string.IsNullOrEmpty(request.MaNhanVien) || string.IsNullOrEmpty(request.MatKhauCu) ||
                string.IsNullOrEmpty(request.MatKhauMoi) || string.IsNullOrEmpty(request.XacNhanMatKhauMoi))
            {
                return BadRequest("Tất cả cần được điền.");
            }

            try
            {
                await _dangNhapService.ChangePasswordAsync(request);
                return Ok("Đổi mật khẩu thành công.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
