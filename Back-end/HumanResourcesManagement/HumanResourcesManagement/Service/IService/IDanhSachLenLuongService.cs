using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface IDanhSachLenLuongService
    {
        Task<IEnumerable<TblNhanVien>> getDanhSachNhanVienLenLuong();

        void TaoMoiHoSoLuongKhongActivce(InsertHoSoLuongKhongActive request);

        void PheDuyetQuyetDinhLenLuong(int id);


    }
}
