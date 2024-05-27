using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface IDanhMucTonGiaoService
    {
        Task<IEnumerable<TblDanhMucTonGiao>> GetAllTonGiao();
        Task<TblDanhMucTonGiao> AddTonGiao(InsertTonGiaoRequest req);
        Task DeleteTonGiao(int id);
        Task<TblDanhMucTonGiao> GetTonGiaoById(int id);
        Task<TblDanhMucTonGiao> UpdateTonGiao(UpdateTonGiaoRequest req);
    }
}
