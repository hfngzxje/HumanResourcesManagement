using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;
namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucNgoaiNguController : ControllerBase
    {
        private readonly IDanhMucNgoaiNguService _danhMucNgoaiNguService;
        private readonly NhanSuContext _context;
        public DanhMucNgoaiNguController(IDanhMucNgoaiNguService danhMucNgoaiNguService, NhanSuContext context)
        {
            _danhMucNgoaiNguService = danhMucNgoaiNguService;
            _context = context;
        }

        [HttpGet("getDanhMucNgoaiNgu")]
        public async Task<IActionResult> GetDanhMucNgoaiNgu()
        {
            try
            {
                var listDanhMucNgoaiNgu = await _danhMucNgoaiNguService.GetDanhMucNgoaiNgu();
                return Ok(listDanhMucNgoaiNgu);
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
        [HttpPost("addDanhMucNgoaiNgu")]
        public async Task<IActionResult> AddDanhMucNgoaiNgu([FromBody] DanhMucNgoaiNguRequest req)
        {
            try
            {
                await _danhMucNgoaiNguService.AddDanhMucNgoaiNgu(req);
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

        [HttpDelete("deleteDanhMucNgoaiNgu/{id}")]
        public async Task<IActionResult> DeleteDanhMucNgoaiNgu(int id)
        {
            try
            {
                await _danhMucNgoaiNguService.DeleteDanhMucNgoaiNgu(id);
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

        [HttpPut("updateDanhMucNgoaiNgu/{id}")]
        public async Task<IActionResult> UpdateDanhMucNgoaiNgu([FromBody] DanhMucNgoaiNguRequest req, int id)
        {
            try
            {
                await _danhMucNgoaiNguService.UpdateDanhMucNgoaiNgu(req, id);
                return StatusCode(200, "sua thanh cong");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
