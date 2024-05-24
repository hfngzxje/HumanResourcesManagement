using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class NgoaiNguController : ControllerBase
    {
        private readonly INgoaiNguService _ngoaiNguService;
        private readonly NhanSuContext _context;
        public NgoaiNguController(INgoaiNguService ngoaiNguService, NhanSuContext context)
        {
            _ngoaiNguService = ngoaiNguService;
            _context = context;
        }
    


        [HttpGet("getNgoaiNguByMaNV/{maNV}")]
        public async Task<IActionResult> GetNgoaiNguByMaNV(string maNV)
        {
            try
            {
                var listNgoaiNgu = await _ngoaiNguService.GetNgoaiNguByMaNV(maNV);
                return Ok(listNgoaiNgu);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Đã xảy ra lỗi trong quá trình xử lý yêu cầu." });
            }

        }


        [HttpPost("addNgoaiNgu")]
        public async Task<IActionResult> AddNgoaiNgu([FromBody] InsertNgoaiNguRequest req)
        {
            try
            {
                var newNgoaiNgu = await _ngoaiNguService.AddNgoaiNgu(req);
                return StatusCode(200, "add thanh cong");
            }
            catch (KeyNotFoundException ex)
            {
                return StatusCode(501, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(502, ex.Message);
            }
        }

        [HttpDelete("deleteNgoaiNgu/{id}")]
        public async Task<IActionResult> DeleteNgoaiNgu(int id)
        {
            try
            {
                await _ngoaiNguService.DeleteNgoaiNgu(id);
                return StatusCode(200, "xoa thanh cong");
            }
            catch (KeyNotFoundException ex)
            {
                return StatusCode(501, "khong tim thay");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("updateNgoaiNgu")]
        public async Task<IActionResult> UpdateNgoaiNgu([FromBody] UpdateNgoaiNguRequest req)
        {
            try
            {
                await _ngoaiNguService.UpdateNgoaiNgu(req);
                return StatusCode(200, "sua thanh cong");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
