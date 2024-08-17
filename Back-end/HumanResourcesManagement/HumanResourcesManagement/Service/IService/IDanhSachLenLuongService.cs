using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using OfficeOpenXml;

namespace HumanResourcesManagement.Service.IService
{
    public interface IDanhSachLenLuongService
    {
        Task<IEnumerable<DanhSachLenLuongResponse>> getDanhSachNhanVienLenLuong();

        Task<int> TaoVaThemDanhSachNangLuong(InsertHoSoLuongKhongActive request);

        Task PheDuyetQuyetDinhLenLuong(int id, int trangThai);

        Task<(byte[] fileContent, string fileName)> ExportLenLuongToExcel();
        Task<(byte[] fileContent, string fileName)> ExportLenLuongToPdf();

    }
}
