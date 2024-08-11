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
    public class DanhSachLenLuongController : ControllerBase
    {
        private readonly IDanhSachLenLuongService _danhSachLenLuongService;
        private readonly NhanSuContext _context;

        public DanhSachLenLuongController(IDanhSachLenLuongService danhSachLenLuongService, NhanSuContext context)
        {
            _danhSachLenLuongService = danhSachLenLuongService;
            _context = context;
        }


        [HttpGet("getDanhSachLenLuong")]
        public async Task<IActionResult> GetDanhSachLenLuong()
        {
            try
            {
                var listNhanVien = await _danhSachLenLuongService.getDanhSachNhanVienLenLuong();

                return Ok(listNhanVien);
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpPost("taoMoiHoSoLuongKhongActive")]
        public async Task<IActionResult> TaoMoiHoSoLuongKhongActive([FromBody] InsertHoSoLuongKhongActive request)
        {
            try
            {
                _danhSachLenLuongService.TaoMoiHoSoLuongKhongActivce(request);
                return Ok("Tạo mới hồ sơ lương thành công.");
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }


        [HttpPut("pheDuyetQuyetDinhLenLuong/{id}")]
        public IActionResult PheDuyetQuyetDinhLenLuong(int id)
        {
            try
            {
                _danhSachLenLuongService.PheDuyetQuyetDinhLenLuong(id);
                return Ok("Phê duyệt quyết định lương thành công.");
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }


    }
}
