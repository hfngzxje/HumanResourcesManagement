using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface IDanhMucDanTocService
    {
        Task<IEnumerable<TblDanhMucDanToc>> GetAllDanToc();
        Task<TblDanhMucDanToc> AddDanToc(InsertDanTocRequest req);
        Task DeleteDanToc(int id);
        Task<TblDanhMucDanToc> GetDanTocById(int id);
        Task<TblDanhMucDanToc> UpdateDanToc(UpdateDanTocRequest req);
    }
}
