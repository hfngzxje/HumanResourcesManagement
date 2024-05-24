using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface INhanVienService
    {
        List<NhanVienResponse> GetAllNhanVien();
        void AddNhanVien(NhanVienRequest request);
        void UpdateNhanVien(string id, NhanVienRequest request);
        void DeleteNhanVien(string id);
        NhanVienResponse GetNhanVienById(string id);
        TblDanhMucDanToc GetDanTocById(int id);
        TblDanhMucTonGiao GetTonGiaoById(int id);
        TblDanhMucNgachCongChuc GetNgachCongChucById(int id);
        TblDanhMucTo GetToById(int id);
        TblDanhMucPhongBan GetPhongBanById(int id);
        TblDanhMucChucDanh GetChucVuById(int id);
    }
}
