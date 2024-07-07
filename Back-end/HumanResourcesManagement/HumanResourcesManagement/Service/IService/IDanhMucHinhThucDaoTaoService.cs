using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface IDanhMucHinhThucDaoTaoService
    {
        Task<IEnumerable<HinhThucDaoTaoResponse>> GetDanhMucHinhThucDaoTao();
        Task AddDanhMucHinhThucDaoTao(HinhThucDaoTaoRequest req);
        Task UpDateDanhMucHinhThucDaoTao(HinhThucDaoTaoRequest req , int id);
        Task DeleteDanhMucHinhThucDaoTao(int id);
        Task<HinhThucDaoTaoResponse> GetDanhMucHinhThucDaoTaoById(int id);
    }
}
