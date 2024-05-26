using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.DTOS.Request;

namespace HumanResourcesManagement.Service.IService
{
    public interface IKhenThuongKiLuatService
    {
        Task<IEnumerable<TblDanhMucKhenThuongKyLuat>> GetKhenThuongKyLuatByMaNV(string maNV,int khenThuongOrKiLuat);
        Task<TblDanhMucKhenThuongKyLuat> AddKhenThuongKyLuat(TblDanhMucKhenThuongKyLuat req);
        Task DeleteKhenThuongKyLuat(int id);
    }
}
