using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.DTOS.Request;

namespace HumanResourcesManagement.Service.IService
{
    public interface IKhenThuongKiLuatService
    {
        Task<IEnumerable<KhenThuongKyLuatResponse>> GetKhenThuongKyLuatByMaNV(string maNV,int khenThuongOrKiLuat);
        Task AddKhenThuongKyLuat(KhenThuongKyLuatRequest req);
        Task DeleteKhenThuongKyLuat(int id);
    }
}
