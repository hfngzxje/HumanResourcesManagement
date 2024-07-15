using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface IDanhMucKhenThuongKyLuatService
    {
        Task<IEnumerable<DanhMucKhenThuongKyLuatResponse>> GetDanhMucKhenThuongKyLuat();
        Task AddDanhMucKhenThuongKyLuat(DanhMucKhenThuongKyLuatRequest req);
        Task UpDateDanhMucKhenThuongKyLuat(DanhMucKhenThuongKyLuatRequest req,int id);
        Task DeleteDanhMucKhenThuongKyLuat(int id);
        Task<DanhMucKhenThuongKyLuatResponse> GetDanhMucKhenThuongKyLuatById(int id);
    }
}
