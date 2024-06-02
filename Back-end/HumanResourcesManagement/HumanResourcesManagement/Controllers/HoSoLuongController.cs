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
                _hoSoLuongService.themHoSoLuong(request);
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
    }
}
