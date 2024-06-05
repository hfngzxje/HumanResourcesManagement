using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.DTOS.Request;
namespace HumanResourcesManagement.Service.IService
{
    public interface IChuyenMonService
    {
        Task UpdateChuyenMon(ChuyenMonRequest req, int id);
        Task<IEnumerable<ChuyenMonResponse>> GetChuyenMon();
        Task DeleteChuyenMon(int id);
        Task AddChuyenMon(ChuyenMonRequest req);
        Task<IEnumerable<ChuyenMonResponse>> GetChuyenMonById(int id);
    }
}
