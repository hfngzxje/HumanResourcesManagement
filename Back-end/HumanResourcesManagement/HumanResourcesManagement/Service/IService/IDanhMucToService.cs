using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.DTOS.Request;
namespace HumanResourcesManagement.Service.IService
{
    public interface IDanhMucToService
    {
        Task UpdateDanhMucTo(DanhMucToRequest req, int id);
        Task<IEnumerable<DanhMucToResponse>> GetDanhMucTo();
        Task DeleteDanhMucTo(int id);
        Task AddDanhMucTo(DanhMucToRequest req);
        Task<DanhMucToResponse> GetDanhMucToById(int id);
    }
}
