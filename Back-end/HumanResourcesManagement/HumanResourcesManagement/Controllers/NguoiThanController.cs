using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NguoiThanController : ControllerBase
    {
        private readonly INguoiThanService _nguoiThanService;
        private readonly NhanSuContext _context;

        public NguoiThanController(INguoiThanService nguoiThanService, NhanSuContext context)
        {
            _nguoiThanService = nguoiThanService;
            _context = context;
        }

        //get danh muc nguoi than
        [HttpGet("getDanhMucNguoiThan")]
        public async Task<IActionResult> GetDanhMucNguoiThan()
        {

            var danhMuc = await _nguoiThanService.GetDanhMucNguoiThan();
            return Ok(danhMuc);

        }

        //get nhan vien by ma
        [HttpGet("getNguoiThanByMaNV/{maNV}")]
        public async Task<IActionResult> GetNguoiThanByMaNV(string maNV)
        {

            var listNguoiThan = await _nguoiThanService.GetNguoiThanByMaNV(maNV);
            return Ok(listNguoiThan);

        }

        //them nguoi than
        [HttpPost("addNguoiThan")]
        public async Task<IActionResult> AddNguoiThan([FromBody] InsertNguoiThanRequest req)
        {
            try
            {
                var newNguoiThan = await _nguoiThanService.AddNguoiThan(req);
                return StatusCode(200, "add thanh cong");
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
                return StatusCode(200, "xoa thanh cong");
            }
            catch (KeyNotFoundException ex)
            {
                return StatusCode(501, "khong tim thay");
            }
            catch(Exception ex)
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
                return StatusCode(200, "sua thanh cong");
            }catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
