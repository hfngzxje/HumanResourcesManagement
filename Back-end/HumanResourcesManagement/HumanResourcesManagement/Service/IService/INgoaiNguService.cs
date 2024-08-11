using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.DTOS.Request;
namespace HumanResourcesManagement.Service.IService
{
    public interface INgoaiNguService 
    {
        Task<IEnumerable<NgoaiNguDto>> GetNgoaiNguByMaNV(string maNV);
        Task<NgoaiNguDto> GetNgoaiNguById(int id);
        Task<TblNgoaiNgu> AddNgoaiNgu(InsertNgoaiNguRequest req);
        Task<TblNgoaiNgu> UpdateNgoaiNgu(UpdateNgoaiNguRequest req);
        Task DeleteNgoaiNgu(int id);
    }
}
