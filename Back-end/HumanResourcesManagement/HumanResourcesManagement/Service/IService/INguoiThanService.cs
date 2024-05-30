using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.DTOS.Request;

namespace HumanResourcesManagement.Service.IService
{
    public interface INguoiThanService
    {
        Task<IEnumerable<NguoiThanDto>> GetNguoiThanByMaNV(string maNV);
        Task<TblNguoiThan> AddNguoiThan(InsertNguoiThanRequest req);
        Task<TblNguoiThan> UpdateNguoiThan(UpdateNguoiThanRequest req);
        Task DeleteNguoiThan(int id);
        Task<IEnumerable<TblDanhMucNguoiThan>> GetDanhMucNguoiThan();

    }
}
