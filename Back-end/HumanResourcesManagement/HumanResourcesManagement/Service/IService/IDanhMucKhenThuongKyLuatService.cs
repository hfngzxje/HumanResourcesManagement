using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface IDanhMucKhenThuongKyLuatService
    {
        Task<IEnumerable<TblDanhMucKhenThuongKyLuat>> GetDanhMucKhenThuongKyLuat();
        Task<TblDanhMucKhenThuongKyLuat> AddDanhMucKhenThuongKyLuat(TblDanhMucKhenThuongKyLuat req);
        Task<TblDanhMucKhenThuongKyLuat> UpDateDanhMucKhenThuongKyLuat(TblDanhMucKhenThuongKyLuat req);
        Task DeleteDanhMucKhenThuongKyLuat(int id);
        Task<IEnumerable<TblDanhMucKhenThuongKyLuat>> GetDanhMucKhenThuongKyLuatById(int id);
    }
}
