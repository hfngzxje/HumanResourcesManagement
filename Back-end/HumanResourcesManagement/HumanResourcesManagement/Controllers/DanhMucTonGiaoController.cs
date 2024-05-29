using System.Runtime.CompilerServices;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucTonGiaoController : ControllerBase
    {
        private readonly NhanSuContext _context;
        private readonly IDanhMucTonGiaoService _danhMucTonGiaoService;

        public DanhMucTonGiaoController(NhanSuContext context, IDanhMucTonGiaoService danhMucTonGiaoService)
        {
            _context = context;
            _danhMucTonGiaoService = danhMucTonGiaoService;
        }

        [HttpGet("getDanhMucTonGiao")]
        public async Task<IActionResult> GetDanhMucTonGiao()
        {
            var dm = await _danhMucTonGiaoService.GetAllTonGiao();
            return Ok(dm);
        }

        [HttpGet("getDanhMucTonGiaoById/{id}")]
        public async Task<IActionResult> GetDanhMucTonGiaoById(int id)
        {
            var dt = await _danhMucTonGiaoService.GetTonGiaoById(id);
            return Ok(dt);
        }

        [HttpPost("addDanhMucTonGiao")]
        public async Task<IActionResult> AddTonGiao(InsertTonGiaoRequest req)
        {
            try
            {
                await _danhMucTonGiaoService.AddTonGiao(req);
                return StatusCode(200, "add ton giao thanh cong");
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpDelete("removeTonGiao")]
        public async Task<IActionResult> RemoveTonGiao(int id)
        {
            try
            {
                await _danhMucTonGiaoService.DeleteTonGiao(id);
                return StatusCode(200, "xoa ton giao thanh cong");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPut("updateTonGiao")]
        public async Task<IActionResult> UpdateTonGiao(UpdateTonGiaoRequest req)
        {
            try
            {
                await _danhMucTonGiaoService.UpdateTonGiao(req);
                return StatusCode(200, "cap nhat ton giao thanh cong");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}