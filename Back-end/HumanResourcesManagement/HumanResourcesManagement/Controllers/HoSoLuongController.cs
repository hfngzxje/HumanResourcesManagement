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
                return Ok("Them ho so luong thanh cong!!");
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
                return Ok("Update thanh cong!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpDelete("xoaHoSoLuong/{id}")]
        public IActionResult XoaHoSoLuong(int id)
        {
            try
            {
                _hoSoLuongService.xoaHoSoLuong(id);
                return Ok("Xóa hồ sơ lương thành công.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet("getAllLuongByMaNV/{maNV}")]
        public IActionResult GetAllLuongByMaNV(string maNV)
        {
            try
            {
                var hoSoLuong = _hoSoLuongService.getAllHoSoLuongByMaNV(maNV);
                return Ok(hoSoLuong);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet("getLuongById/{id}")]
        public IActionResult GetLuongById(int id)
        {
            try
            {
                var hoSoLuong = _hoSoLuongService.getHoSoLuongById(id);
                return Ok(hoSoLuong);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }


        [HttpGet("getChucDanhByHopDong/{maHopDong}")]
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


        [HttpGet("getPhuCapByChucDanh/{id}")]
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


        [HttpGet("getBacLuongByChucDanh/{id}")]
        public async Task<ActionResult<List<TblDanhMucNhomLuong>>> GetBacLuongByChucDanh(int id)
        {
            var bacLuongs = await _hoSoLuongService.GetBacLuongByChucDanhAsync(id);

            if (bacLuongs == null || bacLuongs.Count == 0)
            {
                return NotFound("Không tìm thấy bậc lương cho chức danh với ID tương ứng.");
            }

            return Ok(bacLuongs);
        }


        [HttpGet("getLuongDetails")]
        public async Task<ActionResult<List<TblDanhMucNhomLuong>>> GetLuongDetails([FromQuery] int? chucDanhId, [FromQuery] int? bacLuongId)
        {
            var luongs = await _hoSoLuongService.GetLuongDetailsAsync(chucDanhId, bacLuongId);

            if (luongs == null || luongs.Count == 0)
            {
                return NotFound("Không tìm thấy thông tin lương cho các tham số được cung cấp.");
            }

            return Ok(luongs);
        }



    }
}
