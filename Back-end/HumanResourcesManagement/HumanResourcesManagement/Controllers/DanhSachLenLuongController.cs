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


        [HttpPost("getDanhSachLenLuong")]
        public async Task<IActionResult> GetDanhSachLenLuong([FromForm]DanhSachLenLuongRequest req)
        {
            try
            {
                var listNhanVien = await _danhSachLenLuongService.getDanhSachNhanVienLenLuong(req);

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

        [HttpPost("ExportDanhSachLenLuongToExcel")]
        public async Task<IActionResult> ExportLenLuongToExcel(DanhSachLenLuongRequest req)
        {
            try
            {
                var (fileContent, fileName) = await _danhSachLenLuongService.ExportLenLuongToExcel(req);
                return File(fileContent, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
            }
            catch (Exception ex)
            {
                return StatusCode(501, "Lỗi khi xuất file excel. " + ex.Message);
            }
        }
    }
}
