using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface IHopDongService
    {
        Task<TblHopDong> TaoHopDong(InsertHopDongRequest request);
        void SuaHopDong(string id, UpdateHopDongRequest request);
        void XoaHopDong(string id);
        List<HopDongResponse> GetAllHopDong();

        TblHopDong GetHopDongByMaHopDong(string id);

        List<TblHopDong> GetAllHopDongByMaNV(string id);

        List<TblDanhMucLoaiHopDong> GetAllLoaiHopDong();
        List<TblDanhMucChucDanh> GetAllChucDanh();
    }
}
