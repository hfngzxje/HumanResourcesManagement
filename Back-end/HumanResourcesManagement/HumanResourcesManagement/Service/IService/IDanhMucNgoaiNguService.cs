using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.DTOS.Request;
namespace HumanResourcesManagement.Service.IService
{
    public interface IDanhMucNgoaiNguService
    {
        Task UpdateDanhMucNgoaiNgu(DanhMucNgoaiNguRequest req, int id);
        Task<IEnumerable<DanhMucNgoaiNguResponse>> GetDanhMucNgoaiNgu();
        Task DeleteDanhMucNgoaiNgu(int id);
        Task AddDanhMucNgoaiNgu(DanhMucNgoaiNguRequest req);
    }
}
