using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using OfficeOpenXml;

namespace HumanResourcesManagement.Service.IService
{
    public interface IDanhSachLenLuongService
    {
        Task<IEnumerable<DanhSachLenLuongResponse>> getDanhSachNhanVienLenLuong(DanhSachLenLuongRequest req);

        void TaoMoiHoSoLuongKhongActivce(InsertHoSoLuongKhongActive request);

        void PheDuyetQuyetDinhLenLuong(int id);

        Task<(byte[] fileContent, string fileName)> ExportLenLuongToExcel(DanhSachLenLuongRequest req);
        Task<(byte[] fileContent, string fileName)> ExportLenLuongToPdf(DanhSachLenLuongRequest req);

    }
}
