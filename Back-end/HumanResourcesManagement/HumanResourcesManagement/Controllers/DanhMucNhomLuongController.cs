using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucNhomLuongController : ControllerBase
    {
        private readonly IDanhMucNhomLuongService _danhMucNhomLuongService;
        private readonly NhanSuContext _context;

        public DanhMucNhomLuongController(IDanhMucNhomLuongService mucNhomLuongService, NhanSuContext context)
        {
            _danhMucNhomLuongService = mucNhomLuongService;
            _context = context;
        }


        [HttpGet("all")]
        public async Task<IActionResult> GetAllQuanHe()
        {
            try
            {
                var nhomLuongs = await _danhMucNhomLuongService.GetAllNhomLuongAsync();
                return Ok(nhomLuongs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuanHeById(int id)
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
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }




        [HttpPost("add")]
        public async Task<IActionResult> AddQuanHe(DanhMucNhomLuongRequest request)
        {
            try
            {
                await _danhMucNhomLuongService.AddNhomLuong(request);
                return StatusCode(200, "Thêm nhóm lương thành công.");
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateQuanHe(int id, DanhMucNhomLuongRequest request)
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

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteQuanHe(int id)
        {
            try
            {
                var result = await _danhMucNhomLuongService.DeleteNhomLuongAsync(id);
                return result ? NoContent() : NotFound("Nhóm lương không tồn tại.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



    }
}
