using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DieuChuyenController : ControllerBase
    {
        private readonly IDieuChuyenService _dieuChuyenService;
        private readonly NhanSuContext _context;

        public DieuChuyenController(IDieuChuyenService dieuChuyenService, NhanSuContext context)
        {
            _dieuChuyenService = dieuChuyenService;
            _context = context;
        }

        [HttpGet("CongViecHienTai/{maNV}")]
        public async Task<IActionResult> GetCongViecHienTai(string maNV)
        {
            try
            {
                var ht = await _dieuChuyenService.GetCongViecHienTai(maNV);
                return StatusCode(200, ht);
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpPost("DieuChuyen")]
        public async Task<IActionResult> DieuChuyen(InsertDieuChuyenRequest req)
        {
            try
            {
                var newDieuChuyen = await _dieuChuyenService.AddDieuChuyen(req);
                return StatusCode(200, "add thanh cong");
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpDelete("RemoveDieuChuyen")]
        public async Task<IActionResult> RemoveDieuChuyen(int id)
        {
            try
            {
                await _dieuChuyenService.RemoveDieuChuyen(id);
                return StatusCode(200, "remove thanh cong");
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }
    }
}
