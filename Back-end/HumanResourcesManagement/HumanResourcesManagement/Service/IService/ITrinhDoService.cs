using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.DTOS.Request;
namespace HumanResourcesManagement.Service.IService
{
    public interface ITrinhDoService
    {
        Task UpdateTrinhDo(TrinhDoRequest req, int id);
        Task<IEnumerable<TrinhDoResponse>> GetTrinhDo();
        Task DeleteTrinhDo(int id);
        Task AddTrinhDo(TrinhDoRequest req);
        Task<IEnumerable<TrinhDoResponse>> GetTrinhDoById(int id);
    }
}
