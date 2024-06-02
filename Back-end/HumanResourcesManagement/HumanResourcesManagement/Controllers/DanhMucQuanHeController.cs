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

        [HttpGet("getDanhMucDanToc")]
        public async Task<IActionResult> GetDanhMucQuanHe()
        {
            var dm = await _danhMucQuanHeService.GetAllQuanHe();
            return Ok(dm);
        }

        [HttpGet("getDanhMucDanTocById/{id}")]
        public async Task<IActionResult> GetDanhMucQuanHeById(int id)
        {
            var dt = await _danhMucQuanHeService.GetQuanHeById(id);
            return Ok(dt);
        }

        [HttpPost("addDanhMucQuanHe")]
        public async Task<IActionResult> AddQuanHe(QuanHeRequest req)
        {
            try
            {
                await _danhMucQuanHeService.AddQuanHe(req);
                return StatusCode(200, "add thanh cong");
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
                return StatusCode(200, "xoa quan he thanh cong");
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
                return StatusCode(200, "cap nhat dan toc thanh cong");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}