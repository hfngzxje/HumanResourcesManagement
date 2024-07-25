using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucToController : ControllerBase
    {
        private readonly IDanhMucToService _danhMucToService;
        private readonly NhanSuContext _context;

        public DanhMucToController(IDanhMucToService danhMucToService, NhanSuContext context)
        {
            _danhMucToService = danhMucToService;
            _context = context;
        }

        [HttpGet("getDanhMucTo")]
        public async Task<IActionResult> GetDanhMucTo()
        {
            try
            {
                var listDanhMucTo = await _danhMucToService.GetDanhMucTo();
                return Ok(listDanhMucTo);
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

        [HttpGet("getDanhMucToById/{id}")]
        public async Task<IActionResult> GetDanhMucToById(int id)
        {
            try
            {
                var listDanhMucTo = await _danhMucToService.GetDanhMucToById(id);
                return Ok(listDanhMucTo);
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

        [HttpPost("addDanhMucTo")]
        public async Task<IActionResult> AddDanhMucTo([FromBody] DanhMucToRequest req)
        {
            try
            {
                await _danhMucToService.AddDanhMucTo(req);
                return StatusCode(200, "Thêm thành công");
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

        [HttpDelete("deleteDanhMucTo/{id}")]
        public async Task<IActionResult> DeleteDanhMucTo(int id)
        {
            try
            {
                await _danhMucToService.DeleteDanhMucTo(id);
                return StatusCode(200, "Xóa thành công");
            }
            catch (KeyNotFoundException ex)
            {
                return StatusCode(501, "Không tìm thấy");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("updateDanhMucTo/{id}")]
        public async Task<IActionResult> UpdateDanhMucTo([FromBody] DanhMucToRequest req, int id)
        {
            try
            {
                await _danhMucToService.UpdateDanhMucTo(req, id);
                return StatusCode(200, "Sửa thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
