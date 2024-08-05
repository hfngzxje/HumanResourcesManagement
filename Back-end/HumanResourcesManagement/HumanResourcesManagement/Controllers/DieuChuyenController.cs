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

        [HttpPost("LuuLichSuDieuChuyen")]
        public async Task<IActionResult> LuuDieuChuyen(InsertDieuChuyenRequest req)
        {
            try
            {
                var newDieuChuyen = await _dieuChuyenService.AddDieuChuyen(req);
                return StatusCode(200, "Lưu điều chuyển thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpPost("DieuChuyen")]
        public async Task<IActionResult> DieuChuyen(string maNV, int id)
        {
            try
            {
                var dc = await _dieuChuyenService.DieuChuyenNhanVien(maNV, id);
                return StatusCode(200, "Điều chuyển thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpPut("HuyDieuChuyen")]
        public async Task<IActionResult> HuyDieuChuyen(int idDieuChuyen)
        {
            try
            {
                await _dieuChuyenService.HuyDieuChuyen(idDieuChuyen);
                return StatusCode(200, "Hủy điều chuyển thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpGet("getLichSuDieuChuyen")]
        public async Task<IActionResult> GetLichSuDieuChuyen(string maNV)
        {
            try
            {
                var ht = await _dieuChuyenService.getLichSuDieuChuyen(maNV);
                return StatusCode(200, ht);
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }
    }
}
