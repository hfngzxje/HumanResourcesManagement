using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.DTOS.Request;
namespace HumanResourcesManagement.Service.IService
{
    public interface ITrinhDoVanHoaService
    {
        Task<IEnumerable<TrinhDoVanHoaDto>> GetTrinhDoVanHoaByMaNV(string maNV);
        Task<TrinhDoVanHoaDto> GetTrinhDoVanHoaById(int id);
        Task<TblTrinhDoVanHoa> AddTrinhDoVanHoa(InsertTrinhDoVanHoaRequest req);
        Task<TblTrinhDoVanHoa> UpdateTrinhDoVanHoa(UpdateTrinhDoVanHoaRequest req);
        Task DeleteTrinhDoVanHoa(int id);
    }
}
