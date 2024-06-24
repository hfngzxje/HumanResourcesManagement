using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.DTOS.Request;

namespace HumanResourcesManagement.Service.IService
{
    public interface IKhenThuongKiLuatService
    {
        Task<IEnumerable<TblKhenThuongKyLuat>> GetKhenThuongKyLuatByMaNV(string maNV,int khenThuongOrKiLuat);
        Task<TblKhenThuongKyLuat> AddKhenThuongKyLuat(TblKhenThuongKyLuat req);
        Task DeleteKhenThuongKyLuat(int id);
    }
}
