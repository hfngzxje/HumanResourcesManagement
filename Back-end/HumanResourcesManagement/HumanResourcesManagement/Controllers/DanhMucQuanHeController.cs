using System.Runtime.CompilerServices;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucQuanHeController : ControllerBase
    {
        private readonly NhanSuContext _context;
        private readonly IDanhMucQuanHeService _danhMucQuanHeService;

        public DanhMucQuanHeController(NhanSuContext context, IDanhMucQuanHeService danhMucQuanHeService)
        {
            _context = context;
            _danhMucQuanHeService = danhMucQuanHeService;
        }

        [HttpGet("getDanhMucQuanHe")]
        public async Task<IActionResult> GetDanhMucQuanHe()
        {
            try
            {
                var dm = await _danhMucQuanHeService.GetAllQuanHe();
                return Ok(dm);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("getDanhMucQuanHeById/{id}")]
        public async Task<IActionResult> GetDanhMucQuanHeById(int id)
        {
            try
            {
                var dt = await _danhMucQuanHeService.GetQuanHeById(id);

                if (dt == null)
                {
                    return NotFound("Danh mục quan hệ không tồn tại.");
                }

                return Ok(dt);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("addDanhMucQuanHe")]
        public async Task<IActionResult> AddQuanHe(QuanHeRequest req)
        {
            try
            {
                await _danhMucQuanHeService.AddQuanHe(req);
                return StatusCode(200, "Thêm danh mục quan hệ thành công.");
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpDelete("removeQuanHe")]
        public async Task<IActionResult> RemoveQuanHe(int id)
        {
            try
            {
                await _danhMucQuanHeService.DeleteQuanHe(id);
                return StatusCode(200, "Xóa danh mục quan hệ thành công.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPut("updateQuanHe")]
        public async Task<IActionResult> UpdateQuanHe(int id, QuanHeRequest req)
        {
            try
            {
                await _danhMucQuanHeService.UpdateQuanHe(id, req);
                return StatusCode(200, "Cập nhật danh mục quan hệ thành công.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}