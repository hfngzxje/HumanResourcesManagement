using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface ILoaiHopDongService
    {
        Task<IEnumerable<TblDanhMucLoaiHopDong>> GetAllLoaiHopDong();
        Task<TblDanhMucLoaiHopDong> AddLoaiHopDong(InsertLoaiHopDongRequest req);
        Task DeleteLoaiHopDong(int id);
        Task<TblDanhMucLoaiHopDong> GetLoaiHopDongById(int id);
        Task<TblDanhMucLoaiHopDong> UpdateLoaiHopDong(int id , InsertLoaiHopDongRequest req);
    }
}
