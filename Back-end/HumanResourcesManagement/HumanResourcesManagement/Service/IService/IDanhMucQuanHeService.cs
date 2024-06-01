using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface IDanhMucQuanHeService
    {
        Task<IEnumerable<TblDanhMucNguoiThan>> GetAllQuanHe();
        Task<TblDanhMucNguoiThan> GetQuanHeById(int id);
        Task<TblDanhMucNguoiThan> AddQuanHe(QuanHeRequest req);
        Task<TblDanhMucNguoiThan> UpdateQuanHe(int id, QuanHeRequest req);
        Task DeleteQuanHe(int id);
    }
}
