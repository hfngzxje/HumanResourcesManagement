using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface IDanhMucHinhThucDaoTaoService
    {
        Task<IEnumerable<TblHinhThucDaoTao>> GetDanhMucHinhThucDaoTao();
        Task<TblHinhThucDaoTao> AddDanhMucHinhThucDaoTao(TblHinhThucDaoTao req);
        Task<TblHinhThucDaoTao> UpDateDanhMucHinhThucDaoTao(TblHinhThucDaoTao req);
        Task DeleteDanhMucHinhThucDaoTao(int id);
        Task<TblHinhThucDaoTao> GetDanhMucHinhThucDaoTaoById(int id);
    }
}
