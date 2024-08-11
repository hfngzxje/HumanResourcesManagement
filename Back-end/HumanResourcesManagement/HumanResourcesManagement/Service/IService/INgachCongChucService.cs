using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface INgachCongChucService
    {
        Task<IEnumerable<TblDanhMucNgachCongChuc>> GetAllNgachCongChuc();
        Task<TblDanhMucNgachCongChuc> AddNgachCongChuc(InsertNgachCongChuc req);
        Task DeleteNgachCongChuc(int id);
        Task<TblDanhMucNgachCongChuc> GetNgachCongChucById(int id);
        Task<TblDanhMucNgachCongChuc> UpdateNgachCongChuc(UpdateNgachCongChucRequest req);
    }
}
