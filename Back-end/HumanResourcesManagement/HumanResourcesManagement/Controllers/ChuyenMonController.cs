using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChuyenMonController : ControllerBase
    {
        private readonly IChuyenMonService _chuyenMonService;
        private readonly NhanSuContext _context;

        public ChuyenMonController(IChuyenMonService chuyenMonService, NhanSuContext context)
        {
            _chuyenMonService = chuyenMonService;
            _context = context;
        }

        [HttpGet("getChuyenMon")]
        public async Task<IActionResult> GetChuyenMon()
        {
            try
            {
                var listChuyenMon = await _chuyenMonService.GetChuyenMon();
                return Ok(listChuyenMon);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Đã xảy ra lỗi trong quá trình xử lý yêu cầu." });
            }
        }

        [HttpGet("getChuyenMonById/{id}")]
        public async Task<IActionResult> GetChuyenMonById(int id)
        {
            try
            {
                var chuyenMon = await _chuyenMonService.GetChuyenMonById(id);
                return Ok(chuyenMon);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Đã xảy ra lỗi trong quá trình xử lý yêu cầu." });
            }
        }

        [HttpPost("addChuyenMon")]
        public async Task<IActionResult> AddChuyenMon([FromBody] ChuyenMonRequest req)
        {
            try
            {
                await _chuyenMonService.AddChuyenMon(req);
                return StatusCode(200, "Thêm thành công");
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

        [HttpDelete("deleteChuyenMon/{id}")]
        public async Task<IActionResult> DeleteChuyenMon(int id)
        {
            try
            {
                await _chuyenMonService.DeleteChuyenMon(id);
                return StatusCode(200, "Xóa thành công");
            }
            catch (KeyNotFoundException ex)
            {
                return StatusCode(501, "Không tìm thấy");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("updateChuyenMon/{id}")]
        public async Task<IActionResult> UpdateChuyenMon([FromBody] ChuyenMonRequest req, int id)
        {
            try
            {
                await _chuyenMonService.UpdateChuyenMon(req, id);
                return StatusCode(200, "Sửa thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
