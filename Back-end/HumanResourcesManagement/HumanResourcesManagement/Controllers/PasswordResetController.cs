using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordResetController : ControllerBase
    {
        private readonly IDangNhapService _dangNhapService;

        public PasswordResetController(IDangNhapService dangNhapService)
        {
            _dangNhapService = dangNhapService;
        }

        [HttpPost("send-reset-email")]
        public async Task<IActionResult> SendPasswordResetEmail([FromBody] string email)
        {
            try
            {
                bool result = await _dangNhapService.SendPasswordResetEmailAsync(email);
                if (result)
                {
                    return Ok(new { Message = "Email reset password đã được gửi thành công." });
                }
                return BadRequest(new { Message = "Không thể gửi email reset password." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] DatLaiMatKhauRequest request)
        {
            try
            {
                bool result = await _dangNhapService.ResetPasswordAsync(request);
                if (result)
                {
                    return Ok(new { Message = "Mật khẩu đã được thay đổi thành công." });
                }
                return BadRequest(new { Message = "Không thể thay đổi mật khẩu." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }
    }
}
