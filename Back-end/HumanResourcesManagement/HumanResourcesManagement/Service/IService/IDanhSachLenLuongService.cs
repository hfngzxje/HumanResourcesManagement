using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using Microsoft.EntityFrameworkCore;
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

        Task<IEnumerable<DanhSachNangLuongResponse>> GetAllAsync(int? phongId, int? chucDanhId);

        Task<DanhSachNangLuongDetailsResponse?> GetByIdAsync(int id);

        Task<bool> DeleteAsync(int id);

        Task<IEnumerable<DanhSachNangLuongResponse>> GetAllStatus1And3Async(int? phongId, int? chucDanhId);
        Task<IEnumerable<DanhSachNangLuongResponse>> GetAllStatus2Async();

    }
}
