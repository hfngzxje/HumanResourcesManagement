using System.Runtime.CompilerServices;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoaiHopDongController : ControllerBase
    {
        private readonly NhanSuContext _context;
        private readonly ILoaiHopDongService _loaiHopDongService;

        public LoaiHopDongController(NhanSuContext context, ILoaiHopDongService loaiHopDongService)
        {
            _context = context;
            _loaiHopDongService = loaiHopDongService;
        }

        [HttpGet("getLoaiHopDong")]
        public async Task<IActionResult> GetLoaiHopDong()
        {
            var dm = await _loaiHopDongService.GetAllLoaiHopDong();
            return Ok(dm);
        }

        [HttpGet("getLoaiHopDongById/{id}")]
        public async Task<IActionResult> GetLoaiHopDongById(int id)
        {
            var dt = await _loaiHopDongService.GetLoaiHopDongById(id);
            return Ok(dt);
        }

        [HttpPost("addLoaiHopDong")]
        public async Task<IActionResult> AddLoaiHopDong(InsertLoaiHopDongRequest req)
        {
            try
            {
                await _loaiHopDongService.AddLoaiHopDong(req);
                return StatusCode(200, "add thanh cong");
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpDelete("removeLoaiHopDong")]
        public async Task<IActionResult> RemoveLoaiHopDong(int id)
        {
            try
            {
                await _loaiHopDongService.DeleteLoaiHopDong(id);
                return StatusCode(200, "xoa dan toc thanh cong");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPut("updateLoaiHopDong")]
        public async Task<IActionResult> UpdateLoaiHopDong(int id, InsertLoaiHopDongRequest req)
        {
            try
            {
                await _loaiHopDongService.UpdateLoaiHopDong(id,req);
                return StatusCode(200, "cap nhat dan toc thanh cong");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}