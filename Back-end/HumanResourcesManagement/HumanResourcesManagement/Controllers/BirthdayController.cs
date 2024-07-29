using HumanResourcesManagement.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BirthdayController : ControllerBase
    {
        private readonly BirthdayService _birthdayService;

        public BirthdayController(BirthdayService birthdayService)
        {
            _birthdayService = birthdayService;
        }

        [HttpPost("check-and-send")]
        public IActionResult CheckAndSendBirthdayEmails()
        {
            try {
                _birthdayService.CheckAndSendBirthdayEmails();
                return Ok("Gửi email thành công!!");
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("email-history")]
        public IActionResult GetEmailHistories([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate, [FromQuery] string? employeeId)
        {
            try {
                var emailHistories = _birthdayService.GetEmailHistories(startDate, endDate, employeeId);
                return Ok(emailHistories);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

