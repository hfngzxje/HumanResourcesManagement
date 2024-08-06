using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucKhenThuongKyLuatController : ControllerBase
    {
        private readonly IDanhMucKhenThuongKyLuatService _danhMucKhenThuongKyLuatService;
        private readonly NhanSuContext _context;

        public DanhMucKhenThuongKyLuatController(IDanhMucKhenThuongKyLuatService danhMucKhenThuongKyLuatService, NhanSuContext context)
        {
            _danhMucKhenThuongKyLuatService = danhMucKhenThuongKyLuatService;
            _context = context;
        }

        [HttpGet("getDanhMucKhenThuongKyLuat")]
        public async Task<IActionResult> GetDanhMucKhenThuongKyLuat()
        {
            try
            {
                var listDanhMucKhenThuongKyLuat = await _danhMucKhenThuongKyLuatService.GetDanhMucKhenThuongKyLuat();
                return Ok(listDanhMucKhenThuongKyLuat);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpGet("getDanhMucKhenThuongKyLuatById/{id}")]
        public async Task<IActionResult> GetDanhMucKhenThuongKyLuatById(int id)
        {
            try
            {
                var danhMucKhenThuongKyLuat = await _danhMucKhenThuongKyLuatService.GetDanhMucKhenThuongKyLuatById(id);
                return Ok(danhMucKhenThuongKyLuat);
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

        [HttpPost("addDanhMucKhenThuongKyLuat")]
        public async Task<IActionResult> AddDanhMucKhenThuongKyLuat([FromBody] DanhMucKhenThuongKyLuatRequest req)
        {
            try
            {
                await _danhMucKhenThuongKyLuatService.AddDanhMucKhenThuongKyLuat(req);
                return StatusCode(200, "Thêm thành công");
            }
            catch (KeyNotFoundException ex)
            {
                return StatusCode(StatusCodes.Status501NotImplemented, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status502BadGateway, ex.Message);
            }
        }

        [HttpDelete("deleteDanhMucKhenThuongKyLuat/{id}")]
        public async Task<IActionResult> DeleteDanhMucKhenThuongKyLuat(int id)
        {
            try
            {
                await _danhMucKhenThuongKyLuatService.DeleteDanhMucKhenThuongKyLuat(id);
                return StatusCode(200, "Xóa thành công");
            }
            catch (KeyNotFoundException ex)
            {
                return StatusCode(StatusCodes.Status501NotImplemented, "Không tìm thấy");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("updateDanhMucKhenThuongKyLuat/{id}")]
        public async Task<IActionResult> UpdateDanhMucKhenThuongKyLuat([FromBody] DanhMucKhenThuongKyLuatRequest req, int id)
        {
            try
            {
                await _danhMucKhenThuongKyLuatService.UpDateDanhMucKhenThuongKyLuat(req, id);
                return StatusCode(200, "Sửa thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
