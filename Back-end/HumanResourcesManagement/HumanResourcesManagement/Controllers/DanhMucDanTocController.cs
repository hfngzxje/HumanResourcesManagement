using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

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
            try
            {
                var dm = await _loaiHopDongService.GetAllLoaiHopDong();
                return Ok(dm);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpGet("getLoaiHopDongById/{id}")]
        public async Task<IActionResult> GetLoaiHopDongById(int id)
        {
            try
            {
                var dt = await _loaiHopDongService.GetLoaiHopDongById(id);
                return Ok(dt);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPost("addLoaiHopDong")]
        public async Task<IActionResult> AddLoaiHopDong([FromBody] InsertLoaiHopDongRequest req)
        {
            try
            {
                await _loaiHopDongService.AddLoaiHopDong(req);
                return StatusCode(200, "Thêm thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpDelete("removeLoaiHopDong/{id}")]
        public async Task<IActionResult> RemoveLoaiHopDong(int id)
        {
            try
            {
                await _loaiHopDongService.DeleteLoaiHopDong(id);
                return StatusCode(200, "Xóa thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPut("updateLoaiHopDong/{id}")]
        public async Task<IActionResult> UpdateLoaiHopDong(int id, [FromBody] InsertLoaiHopDongRequest req)
        {
            try
            {
                await _loaiHopDongService.UpdateLoaiHopDong(id, req);
                return StatusCode(200, "C?p nh?t thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }
    }
}
