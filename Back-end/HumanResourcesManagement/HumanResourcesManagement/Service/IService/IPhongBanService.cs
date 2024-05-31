using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface IPhongBanService
    {
        Task<IEnumerable<TblDanhMucPhongBan>> GetAllPhongBan();
        Task<TblDanhMucPhongBan> AddPhongBan(InsertPhongBan req);
        Task DeletePhongBan(int id);
        Task<TblDanhMucPhongBan> GetPhongBanById(int id);
        Task<TblDanhMucPhongBan> UpdatePhongBan(int id, InsertPhongBan req);
    }
}
