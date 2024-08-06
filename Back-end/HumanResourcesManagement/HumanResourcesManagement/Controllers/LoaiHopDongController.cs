using System.Runtime.CompilerServices;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucDanTocController : ControllerBase
    {
        private readonly NhanSuContext _context;
        private readonly IDanhMucDanTocService _danhMucDanTocService;

        public DanhMucDanTocController(NhanSuContext context, IDanhMucDanTocService danhMucDanTocService)
        {
            _context = context;
            _danhMucDanTocService = danhMucDanTocService;
        }

        [HttpGet("getDanhMucDanToc")]
        public async Task<IActionResult> GetDanhMucDanToc()
        {
            try
            {
                var dm = await _danhMucDanTocService.GetAllDanToc();
                return Ok(dm);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("getDanhMucDanTocById/{id}")]
        public async Task<IActionResult> GetDanhMucDanTocById(int id)
        {
            try
            {
                var dt = await _danhMucDanTocService.GetDanTocById(id);
                return Ok(dt);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("addDanhMucDanToc")]
        public async Task<IActionResult> AddDanToc(InsertDanTocRequest req)
        {
            try
            {
                await _danhMucDanTocService.AddDanToc(req);
                return StatusCode(200, "Thêm dân t?c thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpDelete("removeDanToc/{id}")]
        public async Task<IActionResult> RemoveDanToc(int id)
        {
            try
            {
                await _danhMucDanTocService.DeleteDanToc(id);
                return StatusCode(200, "Xóa dân t?c thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("updateDanToc")]
        public async Task<IActionResult> UpdateDanToc(UpdateDanTocRequest req)
        {
            try
            {
                await _danhMucDanTocService.UpdateDanToc(req);
                return StatusCode(200, "C?p nh?t dân t?c thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
