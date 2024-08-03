using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface ILichSuHoatDongService
    {
        void AddLichSuHoatDong(LichSuHoatDongRequest request);
        IEnumerable<TblLichSuHoatDong> GetAll();
        TblLichSuHoatDong? GetDetails(int id);
        bool Delete(int id);
    }
}
