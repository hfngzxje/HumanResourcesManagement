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
            var dm = await _phongBanService.GetAllPhongBan();
            return Ok(dm);
        }

        [HttpGet("getPhongBanById/{id}")]
        public async Task<IActionResult> GetPhongBanById(int id)
        {
            var dt = await _phongBanService.GetPhongBanById(id);
            return Ok(dt);
        }

        [HttpPost("addPhongBan")]
        public async Task<IActionResult> AddPhongBan(InsertPhongBan req)
        {
            try
            {
                await _phongBanService.AddPhongBan(req);
                return StatusCode(200, "add thanh cong");
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
                return StatusCode(200, "xoa chuc danh thanh cong");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPut("updatePhongBan")]
        public async Task<IActionResult> UpdatePhongBan(int id,InsertPhongBan req)
        {
            try
            {
                await _phongBanService.UpdatePhongBan(id,req);
                return StatusCode(200, "cap nhat phong ban thanh cong");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}