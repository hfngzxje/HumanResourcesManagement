using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
        public interface IBaoCaoService
        {
                Task<IEnumerable<DanhSachNhanVienResponse>> getDanhSachNhanVien(DanhSachNhanVienRequest req);
                Task<(byte[] fileContent, string fileName)> ExportBaoCaoNhanVienToExcel(DanhSachNhanVienRequest req);
                Task<IEnumerable<DanhSachNguoiThanResponse>> getDanhSachNguoiThan(DanhSachNguoiThanRequest req);
                Task<(byte[] fileContent, string fileName)> ExportBaoCaoNguoiThanToExcel(DanhSachNguoiThanRequest req);
                Task<IEnumerable<DanhSachSinhNhatResponse>> getDanhSachSinhNhat(DanhSachSinhNhatRequest req);
                Task<IEnumerable<DanhSachDienChinhSachResponse>> getDanhSachDienChinhSach(DanhSachDienChinhSachRequest req);

                Task<IEnumerable<DanhSachNhomLuongResponse>> getDanhSachNhomLuong(DanhSachNhomLuongRequest req);
                Task<IEnumerable<DanhSachDangVienResponse>> getDanhSachDangVien(DanhSachDangVienRequest req);
                Task<(byte[] fileContent, string fileName)> ExportBaoCaoDangVienToExcel(DanhSachDangVienRequest req);
                Task<(byte[] fileContent, string fileName)> ExportNhanVienToPdf(DanhSachNhanVienRequest req);
                Task<(byte[] fileContent, string fileName)> ExportNhomLuongToPdf(DanhSachNhomLuongRequest req);
        }
}
