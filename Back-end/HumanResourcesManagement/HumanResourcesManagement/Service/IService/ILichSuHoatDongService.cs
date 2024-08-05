using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface ILichSuHoatDongService
    {
        void AddLichSuHoatDong(LichSuHoatDongRequest request);
        IEnumerable<LichSuHoatDongResponse> GetAll();
        LichSuHoatDongResponse? GetDetails(int id);
        bool Delete(int id);
    }
}
