using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucNhomLuongController : ControllerBase
    {
        private readonly IDanhMucNhomLuongService _danhMucNhomLuongService;
        private readonly NhanSuContext _context;

        public DanhMucNhomLuongController(IDanhMucNhomLuongService danhMucNhomLuongService, NhanSuContext context)
        {
            _danhMucNhomLuongService = danhMucNhomLuongService;
            _context = context;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllNhomLuong()
        {
            try
            {
                var nhomLuongs = await _danhMucNhomLuongService.GetAllNhomLuongAsync();
                return Ok(nhomLuongs);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNhomLuongById(int id)
        {
            try
            {
                var nhomLuong = await _danhMucNhomLuongService.GetNhomLuongByIdAsync(id);

                if (nhomLuong == null)
                {
                    return NotFound("Nhóm lương không tồn tại.");
                }

                return Ok(nhomLuong);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddNhomLuong([FromBody] DanhMucNhomLuongRequest request)
        {
            try
            {
                await _danhMucNhomLuongService.AddNhomLuong(request);
                return StatusCode(StatusCodes.Status201Created, "Thêm nhóm lương thành công.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateNhomLuong(int id, [FromBody] DanhMucNhomLuongRequest request)
        {
            {
                try
                {
                    await _danhMucNhomLuongService.UpdateNhomLuongAsync(id, request);
                    return StatusCode(200, "Sửa nhóm lương thành công.");
                }
                catch (Exception ex)
                {
                    return StatusCode(501, ex.Message);
                }
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteNhomLuong(int id)
        {
            try
            {
                var result = await _danhMucNhomLuongService.DeleteNhomLuongAsync(id);
                if (result)
                {
                    return NoContent();
                }
                else
                {
                    return NotFound("Nhóm lương không tồn tại.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }
    }
}
