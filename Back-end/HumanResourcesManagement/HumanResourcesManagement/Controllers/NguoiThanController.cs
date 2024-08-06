using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NguoiThanController : ControllerBase
    {
        private readonly INguoiThanService _nguoiThanService;

        public NguoiThanController(INguoiThanService nguoiThanService)
        {
            _nguoiThanService = nguoiThanService;
        }

        // Get danh muc nguoi than
        [HttpGet("getDanhMucNguoiThan")]
        public async Task<IActionResult> GetDanhMucNguoiThan()
        {
            try
            {
                var danhMuc = await _nguoiThanService.GetDanhMucNguoiThan();
                return Ok(danhMuc);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Get nhan vien by ma
        [HttpGet("getNguoiThanByMaNV/{maNV}")]
        public async Task<IActionResult> GetNguoiThanByMaNV(string maNV)
        {
            try
            {
                var listNguoiThan = await _nguoiThanService.GetNguoiThanByMaNV(maNV);
                return Ok(listNguoiThan);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("getNguoiThanById/{id}")]
        public async Task<IActionResult> GetNguoiThanById(int id)
        {
            try
            {
                var nt = await _nguoiThanService.GetNguoiThanById(id);
                return StatusCode(200, nt);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Them nguoi than
        [HttpPost("addNguoiThan")]
        public async Task<IActionResult> AddNguoiThan([FromBody] InsertNguoiThanRequest req)
        {
            try
            {
                var newNguoiThan = await _nguoiThanService.AddNguoiThan(req);
                return StatusCode(200, "Thêm người thân thành công.");
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

        [HttpDelete("removeNguoiThan/{id}")]
        public async Task<IActionResult> DeleteNguoiThan(int id)
        {
            try
            {
                await _nguoiThanService.DeleteNguoiThan(id);
                return StatusCode(200, "Xóa người thân thành công.");
            }
            catch (KeyNotFoundException ex)
            {
                return StatusCode(501, "Không tìm thấy người thân này.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("updateNguoiThan")]
        public async Task<IActionResult> UpdateNguoiThan([FromBody] UpdateNguoiThanRequest req)
        {
            try
            {
                await _nguoiThanService.UpdateNguoiThan(req);
                return StatusCode(200, "Cập nhật thông tin người thân thành công.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
