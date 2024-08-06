using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;

namespace HumanResourcesManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaoCaoController : ControllerBase
    {
        private readonly IBaoCaoService _baoCaoService;
        public BaoCaoController(IBaoCaoService baoCaoService)
        {
            _baoCaoService= baoCaoService;
        }

        [HttpPost("getBaoCaoDanhSachNhanVien")]
        public async Task<IActionResult> GetReportDanhSachNhanVien([FromForm] DanhSachNhanVienRequest req)
        {
            try
            {
                var list = await _baoCaoService.getDanhSachNhanVien(req);
                return StatusCode(200, list);
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpPost("ExportBaoCaoNhanVienToExecl")]
        public async Task<IActionResult> ExportBaoCaoNhanVien([FromForm]DanhSachNhanVienRequest req)
        {
            try
            {
                var (fileContent, fileName) = await _baoCaoService.ExportBaoCaoNhanVienToExcel(req);
                return File(fileContent, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
            }
            catch (Exception ex)
            {
                return StatusCode(501, "Lỗi khi xuất file excel.");
            }
            
        }
        [HttpPost("getBaoCaoDanhSachDangVien")]
        public async Task<IActionResult> GetReportDanhSachDangVien([FromForm] DanhSachDangVienRequest req)
        {
            try
            {
                var list = await _baoCaoService.getDanhSachDangVien(req);
                return StatusCode(200, list);
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpPost("ExportBaoCaoDangVienToExecl")]
        public async Task<IActionResult> ExportBaoCaoDangVien([FromForm] DanhSachDangVienRequest req)
        {
            try
            {
                var (fileContent, fileName) = await _baoCaoService.ExportBaoCaoDangVienToExcel(req);
                return File(fileContent, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
            }
            catch (Exception ex)
            {
                return StatusCode(501, "Lỗi khi xuất file excel.");
            }

        }


        [HttpPost("ExportBaoCaoNhanVienToPDF")]
        public async Task<IActionResult> ExportBaoCaoNhanVienPDF([FromForm] DanhSachNhanVienRequest req)
        {
            try
            {
                var (fileContent, fileName) = await _baoCaoService.ExportNhanVienToPdf(req);
                return File(fileContent, "application/pdf", fileName);
            }
            catch (Exception ex)
            {
                return StatusCode(501, "Lỗi khi xuất file PDF.");
            }

        }

        [HttpPost("getBaoCaoDanhSachNguoiThan")]
        public async Task<IActionResult> GetReportDanhSachNguoiThan([FromForm] DanhSachNguoiThanRequest req)
        {
            try
            {
                var list = await _baoCaoService.getDanhSachNguoiThan(req);
                return StatusCode(200, list);
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpPost("ExportBaoCaoNguoiThanToExecl")]
        public async Task<IActionResult> ExportBaoCaoNguoiThan([FromForm] DanhSachNguoiThanRequest req)
        {
            try
            {
                var (fileContent, fileName) = await _baoCaoService.ExportBaoCaoNguoiThanToExcel(req);
                return File(fileContent, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
            }
            catch (Exception ex)
            {

                return StatusCode(501, "Lỗi khi xuất file excel");
            }
            
        }
        [HttpPost("getBaoCaoDanhSachDienChinhSach")]
        public async Task<IActionResult> GetReportDanhSachDienChinhSach([FromForm] DanhSachDienChinhSachRequest req)
        {
            try
            {
                var list = await _baoCaoService.getDanhSachDienChinhSach(req);
                return StatusCode(200, list);
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }
        [HttpPost("getBaoCaoDanhSachNhomLuong")]
        public async Task<IActionResult> GetReportDanhSachNhomLuong([FromForm] DanhSachNhomLuongRequest req)
        {
            try
            {
                var list = await _baoCaoService.getDanhSachNhomLuong(req);
                return StatusCode(200, list);
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }

        [HttpPost("ExportBaoCaoNhomLuongToPDF")]
        public async Task<IActionResult> ExportBaoCaoNhomLuonngPDF([FromForm] DanhSachNhomLuongRequest req)
        {
            try
            {
                var (fileContent, fileName) = await _baoCaoService.ExportNhomLuongToPdf(req);
                return File(fileContent, "application/pdf", fileName);
            }
            catch (Exception ex)
            {
                return StatusCode(501, "Lỗi khi xuất file PDF.");
            }
        }

        [HttpPost("getBaoCaoSinhNhat")]
        public async Task<IActionResult> GetReportSinhNhat([FromForm] DanhSachSinhNhatRequest req)
        {
            try
            {
                var list = await _baoCaoService.getDanhSachSinhNhat(req);
                return StatusCode(200, list);
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }
    }
}