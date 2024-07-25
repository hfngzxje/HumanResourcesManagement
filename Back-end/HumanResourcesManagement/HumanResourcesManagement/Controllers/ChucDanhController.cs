using System.Runtime.CompilerServices;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChucDanhController : ControllerBase
    {
        private readonly NhanSuContext _context;
        private readonly IChucDanhService _chucDanhService;

        public ChucDanhController(NhanSuContext context, IChucDanhService chucDanhService)
        {
            _context = context;
            _chucDanhService = chucDanhService;
        }

        [HttpGet("getAllChucDanh")]
        public async Task<IActionResult> GetAllChucDanh()
        {
            var dm = await _chucDanhService.GetAllChucDanh();
            return Ok(dm);
        }

        [HttpGet("getChucDanhById/{id}")]
        public async Task<IActionResult> GetChucDanhById(int id)
        {
            var dt = await _chucDanhService.GetChucDanhById(id);
            return Ok(dt);
        }

        [HttpPost("addChucDanh")]
        public async Task<IActionResult> AddChucDanh(InsertChucDanh req)
        {
            try
            {
                await _chucDanhService.AddChucDanh(req);
                return StatusCode(200, "Thêm chức danh thành công.");
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }
        //removechucdanh
        [HttpDelete("removeChucDanh")]
        public async Task<IActionResult> RemoveChucDanh(int id)
        {
            try
            {
                await _chucDanhService.DeleteChucDanh(id);
                return StatusCode(200, "Xóa chức danh thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPut("updateChucDanh")]
        public async Task<IActionResult> UpdateChucDanh(int id, InsertChucDanh req)
        {
            try
            {
                await _chucDanhService.UpdateChucDanh(id, req);
                return StatusCode(200, "Cập nhật chức danh thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}