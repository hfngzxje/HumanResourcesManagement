using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface INhanVienService
    {
        List<TblNhanVien> GetAllNhanVien();
        void AddNhanVien(NhanVienRequest request);
        void UpdateNhanVien(string id, NhanVienRequest request);
        void DeleteNhanVien(string id);
    }
}
