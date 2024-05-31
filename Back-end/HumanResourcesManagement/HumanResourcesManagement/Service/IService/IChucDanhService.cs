using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface IChucDanhService
    {
        Task<IEnumerable<TblDanhMucChucDanh>> GetAllChucDanh();
        Task<TblDanhMucChucDanh> AddChucDanh(InsertChucDanh req);
        Task DeleteChucDanh(int id);
        Task<TblDanhMucChucDanh> GetChucDanhById(int id);
        Task<TblDanhMucChucDanh> UpdateChucDanh(int id, InsertChucDanh req);
    }
}
