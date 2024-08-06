using System.Runtime.CompilerServices;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhongBanController : ControllerBase
    {
        private readonly NhanSuContext _context;
        private readonly IPhongBanService _phongBanService;

        public PhongBanController(NhanSuContext context, IPhongBanService phongBanService)
        {
            _context = context;
            _phongBanService = phongBanService;
        }

        [HttpGet("getAllPhongBan")]
        public async Task<IActionResult> GetAllPhongBan()
        {
            try
            {
                var dm = await _phongBanService.GetAllPhongBan();
                return Ok(dm);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("getPhongBanById/{id}")]
        public async Task<IActionResult> GetPhongBanById(int id)
        {
            try
            {
                var dt = await _phongBanService.GetPhongBanById(id);
                return Ok(dt);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("addPhongBan")]
        public async Task<IActionResult> AddPhongBan(InsertPhongBan req)
        {
            try
            {
                await _phongBanService.AddPhongBan(req);
                return StatusCode(200, "Thêm phòng ban thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpDelete("removePhongBan")]
        public async Task<IActionResult> RemovePhongBan(int id)
        {
            try
            {
                await _phongBanService.DeletePhongBan(id);
                return StatusCode(200, "Xóa phòng ban thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("updatePhongBan")]
        public async Task<IActionResult> UpdatePhongBan(int id, InsertPhongBan req)
        {
            try
            {
                await _phongBanService.UpdatePhongBan(id, req);
                return StatusCode(200, "Cập nhật phòng ban thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
