using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface IHopDongService
    {
        void TaoHopDong(HopDongRequest request);
        void SuaHopDong(string id, HopDongRequest request);
        void XoaHopDong(string id);
        List<HopDongResponse> GetAllHopDong();

        HopDongResponse GetHopDongByMaHopDong(string id);
    }
}
