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

        [HttpPost("taoVaThemDanhSachNangLuong")]
        public async Task<IActionResult> TaoVaThemDanhSachNangLuong([FromBody] InsertHoSoLuongKhongActive request)
        {
            if (request == null)
            {
                return BadRequest("Yêu cầu không hợp lệ.");
            }
            try
            {
                var id = await _danhSachLenLuongService.TaoVaThemDanhSachNangLuong(request);
                return Ok(new { Id = id });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Có lỗi xảy ra: {ex.Message}");
            }
        }


        [HttpPut("pheDuyetQuyetDinhLenLuong")]
        public async Task<IActionResult> PheDuyetQuyetDinhLenLuong(int id, [FromQuery] int trangThai)
        {
            try
            {
                await _danhSachLenLuongService.PheDuyetQuyetDinhLenLuong(id, trangThai);

                if (trangThai == 1)
                {
                    return Ok("Phê duyệt quyết định lương thành công.");
                }
                else if (trangThai == 3)
                {
                    return Ok("Hủy quyết định lương thành công.");
                }
                else
                {
                    return BadRequest("Trạng thái không hợp lệ.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPost("ExportDanhSachLenLuongToExcel")]
        public async Task<IActionResult> ExportLenLuongToExcel()
        {
            try
            {
                var (fileContent, fileName) = await _danhSachLenLuongService.ExportLenLuongToExcel();
                return File(fileContent, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
            }
            catch (Exception ex)
            {
                return StatusCode(501, "Lỗi khi xuất file excel. " + ex.Message);
            }
        }


        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<DanhSachNangLuongResponse>>> GetAll()
        {
            try
            {
                var nangLuongs = await _danhSachLenLuongService.GetAllAsync();
                return Ok(nangLuongs);
            }catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DanhSachNangLuongDetailsResponse>> GetById(int id)
        {
            var nangLuong = await _danhSachLenLuongService.GetByIdAsync(id);
            if (nangLuong == null)
            {
                return NotFound();
            }
            return Ok(nangLuong);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _danhSachLenLuongService.DeleteAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpGet("getAllStatus1And3")]
        public async Task<ActionResult<IEnumerable<DanhSachNangLuongResponse>>> getAllStatus1And3()
        {
            try
            {
                var nangLuongs = await _danhSachLenLuongService.GetAllStatus1And3Async();
                return Ok(nangLuongs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("getAllStatus2")]
        public async Task<ActionResult<IEnumerable<DanhSachNangLuongResponse>>> getAllStatus2()
        {
            try
            {
                var nangLuongs = await _danhSachLenLuongService.GetAllStatus2Async();
                return Ok(nangLuongs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
