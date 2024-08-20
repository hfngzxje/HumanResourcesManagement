using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhenThuongKiLuatController : ControllerBase
    {
        private readonly IKhenThuongKiLuatService _khenThuongKiLuatService;
        private readonly NhanSuContext _context;

        public KhenThuongKiLuatController(IKhenThuongKiLuatService khenThuongKiLuatService, NhanSuContext context)
        {
            _khenThuongKiLuatService = khenThuongKiLuatService;
            _context = context;
        }

        [HttpGet("getKhenThuongKiLuatByMaNV/{maNV}/{khenThuongOrKiLuat}")]
        public async Task<IActionResult> GetKhenThuongKiLuatByMaNV(string maNV, string khenThuongOrKiLuat)
        {
            try
            {
                var listKhenThuongKiLuat = await _khenThuongKiLuatService.GetKhenThuongKyLuatByMaNV(maNV, khenThuongOrKiLuat);
                return Ok(listKhenThuongKiLuat);
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

        [HttpGet("getAllKhenThuongKyLuat")]
        public async Task<IActionResult> GetAllKhenThuongKyLuat()
        {
            try
            {
                var resp = await _khenThuongKiLuatService.GetAllKhenThuongKyLuat();
                return Ok(resp);
            }catch(Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpPost("addKhenThuongKiLuat")]
        public async Task<IActionResult> AddKhenThuongKiLuat([FromBody] KhenThuongKyLuatRequest req)
        {
            try
            {
                await _khenThuongKiLuatService.AddKhenThuongKyLuat(req);
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

        [HttpDelete("deleteKhenThuongKiLuat/{id}")]
        public async Task<IActionResult> DeleteKhenThuongKiLuat(int id)
        {
            try
            {
                await _khenThuongKiLuatService.DeleteKhenThuongKyLuat(id);
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

        [HttpGet("khen-thuong")]
        public async Task<IActionResult> GetKhenThuongAsync([FromQuery] DateTime? fromDate)
        {
            var results = await _khenThuongKiLuatService.GetKhenThuongAsync(fromDate);
            return Ok(results);
        }

        [HttpGet("ky-luat")]
        public async Task<IActionResult> GetKyLuatAsync([FromQuery] DateTime? fromDate)
        {
            var results = await _khenThuongKiLuatService.GetKyLuatAsync(fromDate);
            return Ok(results);
        }
    }
}
