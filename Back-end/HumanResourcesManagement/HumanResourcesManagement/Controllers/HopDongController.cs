using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HopDongController : ControllerBase
    {
        private readonly IHopDongService _hopDongService;
        private readonly NhanSuContext _context;

        public HopDongController(IHopDongService hopDongService, NhanSuContext context)
        {
            _hopDongService = hopDongService;
            _context = context;
        }

        [HttpPost("TaoMoiHopDong")]
        public IActionResult CreateHopDong([FromBody] InsertHopDongRequest request)
        {
            try
            {
                _hopDongService.TaoHopDong(request);
                return StatusCode(StatusCodes.Status201Created, "Tạo hợp đồng thành công!");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Lỗi khi xử lý yêu cầu.", details = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Đã xảy ra lỗi trong quá trình xử lý yêu cầu.", details = ex.Message });
            }
        }

        [HttpPut("SuaMoiHopDong/{id}")]
        public IActionResult UpdateHopDong(string id, [FromBody] UpdateHopDongRequest request)
        {
            try
            {
                _hopDongService.SuaHopDong(id, request);
                return Ok("Cập nhật hợp đồng thành công!");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Lỗi khi xử lý yêu cầu.", details = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Đã xảy ra lỗi trong quá trình xử lý yêu cầu.", details = ex.Message });
            }
        }

        [HttpDelete("xoaHopDong/{id}")]
        public IActionResult DeleteHopDong(string id)
        {
            try
            {
                _hopDongService.XoaHopDong(id);
                return StatusCode(StatusCodes.Status204NoContent, "Xóa hợp đồng thành công.");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = "Hợp đồng không tồn tại." });
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Lỗi khi xử lý yêu cầu.", details = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Đã xảy ra lỗi trong quá trình xử lý yêu cầu.", details = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetAllHopDong()
        {
            try
            {
                var hopDong = _hopDongService.GetAllHopDong();
                return Ok(hopDong);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Đã xảy ra lỗi trong quá trình lấy dữ liệu.", details = ex.Message });
            }
        }

        [HttpGet("id")]
        public IActionResult GetHopDongByMaHopDong(string id)
        {
            try
            {
                var hopDong = _hopDongService.GetHopDongByMaHopDong(id);
                if (hopDong == null)
                {
                    return NotFound(new { message = "Hợp đồng không tồn tại." });
                }
                return Ok(hopDong);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Lỗi khi xử lý yêu cầu.", details = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Đã xảy ra lỗi trong quá trình xử lý yêu cầu.", details = ex.Message });
            }
        }

        [HttpGet("GetHopDongByMaNV/{id}")]
        public IActionResult GetHopDongByMaNV(string id)
        {
            try
            {
                var hopDong = _hopDongService.GetAllHopDongByMaNV(id);
                if (hopDong == null || !hopDong.Any())
                {
                    return NotFound(new { message = "Danh sách hợp đồng không tồn tại." });
                }
                return Ok(hopDong);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Lỗi khi xử lý yêu cầu.", details = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Đã xảy ra lỗi trong quá trình xử lý yêu cầu.", details = ex.Message });
            }
        }

        [HttpGet("loaiHopDong")]
        public IActionResult GetAllLoaiHopDong()
        {
            try
            {
                var loaiHopDong = _hopDongService.GetAllLoaiHopDong();
                return Ok(loaiHopDong);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Đã xảy ra lỗi trong quá trình lấy dữ liệu.", details = ex.Message });
            }
        }

        [HttpGet("chucDanh")]
        public IActionResult GetAllChucDanh()
        {
            try
            {
                var chucDanh = _hopDongService.GetAllChucDanh();
                return Ok(chucDanh);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Đã xảy ra lỗi trong quá trình lấy dữ liệu.", details = ex.Message });
            }
        }
    }
}
