using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;

namespace HumanResourcesManagement.Service.IService
{
    public interface IBaoCaoService
    {
        //1.nhan vien
        Task<IEnumerable<DanhSachNhanVienResponse>> getDanhSachNhanVien(DanhSachNhanVienRequest req);
        Task<(byte[] fileContent, string fileName)> ExportBaoCaoNhanVienToExcel(DanhSachNhanVienRequest req);
        Task<(byte[] fileContent, string fileName)> ExportNhanVienToPdf(DanhSachNhanVienRequest req);
        //2.nguoi than
        Task<IEnumerable<DanhSachNguoiThanResponse>> getDanhSachNguoiThan(DanhSachNguoiThanRequest req);
        Task<(byte[] fileContent, string fileName)> ExportBaoCaoNguoiThanToExcel(DanhSachNguoiThanRequest req);
        Task<(byte[] fileContent, string fileName)> ExportBaoCaoNguoiThanToPdf(DanhSachNguoiThanRequest req);
        //3.sinh nhat
        Task<IEnumerable<DanhSachSinhNhatResponse>> getDanhSachSinhNhat(DanhSachSinhNhatRequest req);
        Task<(byte[] fileContent, string fileName)> ExportBaoCaoSinhNhatToExcel(DanhSachSinhNhatRequest req);
        Task<(byte[] fileContent, string fileName)> ExportBaoCaoSinhNhatToPdf(DanhSachSinhNhatRequest req);
        //4.dien chinh sach
        Task<IEnumerable<DanhSachDienChinhSachResponse>> getDanhSachDienChinhSach(DanhSachDienChinhSachRequest req);
        Task<(byte[] fileContent, string fileName)> ExportDienChinhSachToExcel(DanhSachDienChinhSachRequest req);
        Task<(byte[] fileContent, string fileName)> ExportDienChinhSachToPdf(DanhSachDienChinhSachRequest req);
        //5.bao hiem
        Task<IEnumerable<DanhSachBaoHiemResponse>> getDanhSachBaoHiem(DanhSachBaoHiemRequest req);
        Task<(byte[] fileContent, string fileName)> ExportBaoHiemToExcel(DanhSachBaoHiemRequest req);
        Task<(byte[] fileContent, string fileName)> ExportBaoHiemToPdf(DanhSachBaoHiemRequest req);
        //6.nhom luong
        Task<IEnumerable<DanhSachNhomLuongResponse>> getDanhSachNhomLuong(DanhSachNhomLuongRequest req);
        Task<(byte[] fileContent, string fileName)> ExportNhomLuongToExcel(DanhSachNhomLuongRequest req);
        Task<(byte[] fileContent, string fileName)> ExportNhomLuongToPdf(DanhSachNhomLuongRequest req);
        //7. dang vien
        Task<IEnumerable<DanhSachDangVienResponse>> getDanhSachDangVien(DanhSachDangVienRequest req);
        Task<(byte[] fileContent, string fileName)> ExportBaoCaoDangVienToExcel(DanhSachDangVienRequest req);
        Task<(byte[] fileContent, string fileName)> ExportBaoCaoDangVienToPdf(DanhSachDangVienRequest req);

        //8.ho so luong




        //9. nang luong



        //10. quyet dinh len luong
    }
}
