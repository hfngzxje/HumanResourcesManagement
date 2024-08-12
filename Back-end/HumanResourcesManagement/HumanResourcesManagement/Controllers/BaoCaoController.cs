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

        //nhanvien
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
        //nhan vien excel
        [HttpPost("ExportBaoCaoNhanVienToExcel")]
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

        //nhan vien pdf
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

        //dang vien
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


        //dang vien excel
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
        //dang vien pdf
        [HttpPost("ExportBaoCaoDangVienToPDF")]
        public async Task<IActionResult> ExportBaoCaoDangVienPDF([FromForm] DanhSachDangVienRequest req)
        {
            try
            {
                var (fileContent, fileName) = await _baoCaoService.ExportBaoCaoDangVienToPdf(req);
                return File(fileContent, "application/pdf", fileName);
            }
            catch (Exception ex)
            {
                return StatusCode(501, "Lỗi khi xuất file PDF.");
            }
        }
        //nguoi than
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

        //nguoi than excel
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
        //nguoi than pdf
        [HttpPost("ExportBaoCaoNguoiThanToPDF")]
        public async Task<IActionResult> ExportBaoCaoNguoiThanPDF([FromForm] DanhSachNguoiThanRequest req)
        {
            try
            {
                var (fileContent, fileName) = await _baoCaoService.ExportBaoCaoNguoiThanToPdf(req);
                return File(fileContent, "application/pdf", fileName);
            }
            catch (Exception ex)
            {
                return StatusCode(501, "Lỗi khi xuất file PDF.");
            }
        }
        // dien chinh sach
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
        //dien chinh sach excel
        [HttpPost("ExportBaoCaoDienChinhSachToExecl")]
        public async Task<IActionResult> ExportBaoCaoDienChinhSachExcel ([FromForm] DanhSachDienChinhSachRequest req)
        {
            try
            {
                var (fileContent, fileName) = await _baoCaoService.ExportDienChinhSachToExcel(req);
                return File(fileContent, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
            }
            catch (Exception ex)
            {

                return StatusCode(501, "Lỗi khi xuất file excel");
            }
        }
        //dien chinh sach pdf
        [HttpPost("ExportBaoCaoDienChinhSachToPDF")]
        public async Task<IActionResult> ExportBaoCaoDienChinhSachPDF([FromForm] DanhSachDienChinhSachRequest req)
        {
            try
            {
                var (fileContent, fileName) = await _baoCaoService.ExportDienChinhSachToPdf(req);
                return File(fileContent, "application/pdf", fileName);
            }
            catch (Exception ex)
            {
                return StatusCode(501, "Lỗi khi xuất file PDF.");
            }
        }
        //nhom luong
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
        //nhom luong excel
        [HttpPost("ExportBaoCaoNhomLuongToExcel")]
        public async Task<IActionResult> ExportBaoCaoNhomLuongExcel([FromForm] DanhSachNhomLuongRequest req)
        {
            try
            {
                var (fileContent, fileName) = await _baoCaoService.ExportNhomLuongToExcel(req);
                return File(fileContent, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
            }
            catch (Exception ex)
            {
                return StatusCode(501, "Lỗi khi xuất file Excel.");
            }
        }
        //nhom luong pdf
        [HttpPost("ExportBaoCaoNhomLuongToPDF")]
        public async Task<IActionResult> ExportBaoCaoNhomLuongPDF([FromForm] DanhSachNhomLuongRequest req)
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

        //bao hiem
        [HttpPost("getBaoCaoDanhSachBaoHiem")]
        public async Task<IActionResult> GetReportDanhSachBaoHiem([FromForm] DanhSachBaoHiemRequest req)
        {
            try
            {
                var list = await _baoCaoService.getDanhSachBaoHiem(req);
                return StatusCode(200, list);
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
            }
        }
        //bao hiem excel
        [HttpPost("ExportBaoCaoBaoHiemToExcel")]
        public async Task<IActionResult> ExportBaoCaoBaoHiemExcel([FromForm] DanhSachBaoHiemRequest req)
        {
            try
            {
                var (fileContent, fileName) = await _baoCaoService.ExportBaoHiemToExcel(req);
                return File(fileContent, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
            }
            catch (Exception ex)
            {
                return StatusCode(501, "Lỗi khi xuất file Excel.");
            }
        }
        //bao hiem pdf
        [HttpPost("ExportBaoCaoBaoHiemToPDF")]
        public async Task<IActionResult> ExportBaoCaoBaoHiemPDF([FromForm] DanhSachBaoHiemRequest req)
        {
            try
            {
                var (fileContent, fileName) = await _baoCaoService.ExportBaoHiemToPdf(req);
                return File(fileContent, "application/pdf", fileName);
            }
            catch (Exception ex)
            {
                return StatusCode(501, "Lỗi khi xuất file PDF.");
            }
        }


        //sinh nhat
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
        //bao hiem excel
        [HttpPost("ExportBaoCaoSinhNhatToExcel")]
        public async Task<IActionResult> ExportBaoCaoSinhNhatExcel([FromForm] DanhSachSinhNhatRequest req)
        {
            try
            {
                var (fileContent, fileName) = await _baoCaoService.ExportBaoCaoSinhNhatToExcel(req);
                return File(fileContent, "application/pdf", fileName);
            }
            catch (Exception ex)
            {
                return StatusCode(501, "Lỗi khi xuất file Excel.");
            }
        }
        //bao hiem pdf
        [HttpPost("ExportBaoCaoSinhNhatToPDF")]
        public async Task<IActionResult> ExportBaoCaoSinhNhatPDF([FromForm] DanhSachSinhNhatRequest req)
        {
            try
            {
                var (fileContent, fileName) = await _baoCaoService.ExportBaoCaoSinhNhatToPdf(req);
                return File(fileContent, "application/pdf", fileName);
            }
            catch (Exception ex)
            {
                return StatusCode(501, "Lỗi khi xuất file PDF.");
            }
        }

    }
}