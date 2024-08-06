using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DieuChuyenController : ControllerBase
    {
        private readonly IDieuChuyenService _dieuChuyenService;
        private readonly NhanSuContext _context;

        public DieuChuyenController(IDieuChuyenService dieuChuyenService, NhanSuContext context)
        {
            _dieuChuyenService = dieuChuyenService;
            _context = context;
        }

        [HttpGet("CongViecHienTai/{maNV}")]
        public async Task<IActionResult> GetCongViecHienTai(string maNV)
        {
            try
            {
                var ht = await _dieuChuyenService.GetCongViecHienTai(maNV);
                if (ht == null)
                {
                    return NotFound(new { message = "Công việc hiện tại không tìm thấy." });
                }
                return Ok(ht);
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
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Có lỗi xảy ra khi xử lý yêu cầu.", details = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Đã xảy ra lỗi trong quá trình xử lý yêu cầu.", details = ex.Message });
            }
        }

        [HttpPost("DieuChuyen")]
        public async Task<IActionResult> DieuChuyen([FromBody] InsertDieuChuyenRequest req)
        {
            try
            {
                var newDieuChuyen = await _dieuChuyenService.AddDieuChuyen(req);
                return StatusCode(StatusCodes.Status201Created, new { message = "Thêm thành công", data = newDieuChuyen });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Có lỗi xảy ra khi xử lý yêu cầu.", details = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Đã xảy ra lỗi trong quá trình xử lý yêu cầu.", details = ex.Message });
            }
        }

        [HttpDelete("RemoveDieuChuyen")]
        public async Task<IActionResult> RemoveDieuChuyen(int id)
        {
            try
            {
                await _dieuChuyenService.RemoveDieuChuyen(id);
                return StatusCode(200, "remove thanh cong");
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpGet("GetAllDieuChuyen")]
        public async Task<IActionResult> GetAllDieuChuyen(string maNV)
        {
            try
            {
                var ht = await _dieuChuyenService.GetAllDieuChuyen(maNV);
                if (ht == null || !ht.Any())
                {
                    return NotFound(new { message = "Danh sách chuyển nhượng không tìm thấy." });
                }
                return Ok(ht);
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
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Có lỗi xảy ra khi xử lý yêu cầu.", details = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Đã xảy ra lỗi trong quá trình xử lý yêu cầu.", details = ex.Message });
            }
        }
    }
}
