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
    public class DanhMucHinhThucDaoTaoController : ControllerBase
    {
        private readonly IDanhMucHinhThucDaoTaoService _danhMucHinhThucDaoTaoService;
        private readonly NhanSuContext _context;

        public DanhMucHinhThucDaoTaoController(IDanhMucHinhThucDaoTaoService danhMucHinhThucDaoTaoService, NhanSuContext context)
        {
            _danhMucHinhThucDaoTaoService = danhMucHinhThucDaoTaoService;
            _context = context;
        }

        [HttpGet("getDanhMucHinhThucDaoTao")]
        public async Task<IActionResult> GetDanhMucHinhThucDaoTao()
        {
            try
            {
                var listDanhMucHinhThucDaoTao = await _danhMucHinhThucDaoTaoService.GetDanhMucHinhThucDaoTao();
                return Ok(listDanhMucHinhThucDaoTao);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpGet("getDanhMucHinhThucDaoTaoById/{id}")]
        public async Task<IActionResult> GetDanhMucHinhThucDaoTaoById(int id)
        {
            try
            {
                var danhMucHinhThucDaoTao = await _danhMucHinhThucDaoTaoService.GetDanhMucHinhThucDaoTaoById(id);
                return Ok(danhMucHinhThucDaoTao);
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

        [HttpPost("addDanhMucHinhThucDaoTao")]
        public async Task<IActionResult> AddDanhMucHinhThucDaoTao([FromBody] HinhThucDaoTaoRequest req)
        {
            try
            {
                await _danhMucHinhThucDaoTaoService.AddDanhMucHinhThucDaoTao(req);
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

        [HttpDelete("deleteDanhMucHinhThucDaoTao/{id}")]
        public async Task<IActionResult> DeleteDanhMucHinhThucDaoTao(int id)
        {
            try
            {
                await _danhMucHinhThucDaoTaoService.DeleteDanhMucHinhThucDaoTao(id);
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

        [HttpPut("updateDanhMucHinhThucDaoTao/{id}")]
        public async Task<IActionResult> UpdateDanhMucHinhThucDaoTao([FromBody] HinhThucDaoTaoRequest req, int id)
        {
            try
            {
                await _danhMucHinhThucDaoTaoService.UpDateDanhMucHinhThucDaoTao(req, id);
                return StatusCode(200, "Sửa thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
