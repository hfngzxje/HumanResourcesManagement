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
    public class HoSoLuongController : ControllerBase
    {
        private readonly IHoSoLuongService _hoSoLuongService;
        private readonly NhanSuContext _context;
        public HoSoLuongController(IHoSoLuongService hoSoLuongService, NhanSuContext context)
        {
            _hoSoLuongService = hoSoLuongService;
            _context = context;
        }

        [HttpPost("TaoMoiHoSoLuong")]
        public IActionResult TaoMoiHoSoLuong([FromBody] InsertHoSoLuong request)
        {
            try
            {
                _hoSoLuongService.ThemHoSoLuong(request);
                return Ok("Thêm hồ sơ lương thành công!!");
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("TinhLuong")]
        public IActionResult TinhLuong([FromBody] TinhLuongRequest request)
        {
            try
            {
                var luong = _hoSoLuongService.tinhLuong(request);
                return Ok(luong);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("ChinhSuaHoSoLuong/{id}")]
        public IActionResult ChinhSuaHoSoLuong(int id, [FromBody] InsertHoSoLuong request)
        {
            try
            {
                _hoSoLuongService.suaHoSoLuong(id, request);
                return Ok("Cập nhật thành công!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Lỗi: {ex.Message}");
            }
        }

        [HttpDelete("XoaHoSoLuong/{id}")]
        public IActionResult XoaHoSoLuong(int id)
        {
            try
            {
                _hoSoLuongService.xoaHoSoLuong(id);
                return Ok("Xóa hồ sơ lương thành công.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Lỗi: {ex.Message}");
            }
        }

        [HttpGet("GetAllLuongByMaNV/{maNV}")]
        public IActionResult GetAllLuongByMaNV(string maNV)
        {
            try
            {
                var hoSoLuong = _hoSoLuongService.getAllHoSoLuongByMaNV(maNV);
                return Ok(hoSoLuong);
            }
            catch (Exception ex)
            {
                return BadRequest($"Lỗi: {ex.Message}");
            }
        }

        [HttpGet("GetLuongById/{id}")]
        public IActionResult GetLuongById(int id)
        {
            try
            {
                var hoSoLuong = _hoSoLuongService.getHoSoLuongById(id);
                return Ok(hoSoLuong);
            }
            catch (Exception ex)
            {
                return BadRequest($"Lỗi: {ex.Message}");
            }
        }

        [HttpGet("GetChucDanhByHopDong/{maHopDong}")]
        public ActionResult<IdAndName> GetChucDanhByHopDong(string maHopDong)
        {
            try
            {
                var chucDanh = _hoSoLuongService.getChucDanhByHopDong(maHopDong);
                return Ok(chucDanh);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetPhuCapByChucDanh/{id}")]
        public ActionResult<TblDanhMucChucDanh> GetPhuCapByChucDanh(int id)
        {
            try
            {
                var chucDanh = _hoSoLuongService.getPhuCapByChucDanh(id);
                return Ok(chucDanh);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetBacLuongByChucDanh/{id}")]
        public async Task<ActionResult<List<TblDanhMucNhomLuong>>> GetBacLuongByChucDanh(int id)
        {
            try
            {
                var bacLuongs = await _hoSoLuongService.GetBacLuongByChucDanhAsync(id);
                if (bacLuongs == null || bacLuongs.Count == 0)
                {
                    return NotFound("Không tìm thấy bậc lương cho chức danh với ID tương ứng.");
                }
                return Ok(bacLuongs);
            }
            catch (Exception ex)
            {
                return BadRequest($"Lỗi: {ex.Message}");
            }
        }

        [HttpGet("GetLuongDetails")]
        public async Task<ActionResult<List<TblDanhMucNhomLuong>>> GetLuongDetails([FromQuery] int? chucDanhId, [FromQuery] int? bacLuongId)
        {
            try
            {
                var luongs = await _hoSoLuongService.GetLuongDetailsAsync(chucDanhId, bacLuongId);
                if (luongs == null || luongs.Count == 0)
                {
                    return NotFound("Không tìm thấy thông tin lương cho các tham số được cung cấp.");
                }
                return Ok(luongs);
            }
            catch (Exception ex)
            {
                return BadRequest($"Lỗi: {ex.Message}");
            }
        }
    }
}
