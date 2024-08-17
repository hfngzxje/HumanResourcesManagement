using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service.IService
{
    public interface INhanVienService
    {
        Task<IEnumerable<NhanVienResponse>> GetAllNhanVien();
        Task AddNhanVienAsync(NhanVienRequest request);
        void UpdateNhanVien(string id, NhanVienRequest request);
        void DeleteNhanVien(string id);
        TblNhanVien GetNhanVienByMa(string ma);
        TblDanhMucDanToc GetDanTocById(int id);
        TblDanhMucTonGiao GetTonGiaoById(int id);
        TblDanhMucNgachCongChuc GetNgachCongChucById(int id);
        TblDanhMucTo GetToById(int id);
        TblDanhMucPhongBan GetPhongBanById(int id);
        TblDanhMucChucDanh GetChucVuById(int id);

        List<TblDanhMucDanToc> GetAllDanToc();
        List<TblDanhMucTonGiao> GetAllTonGiao();
        List<TblDanhMucChucDanh> GetAllChucDanh();
        List<TblDanhMucNgachCongChuc> GetAllNgachCongChuc();
        List<TblDanhMucPhongBan> GetAllPhong();
        List<TblDanhMucTo> GetAllTo();

        Task<IEnumerable<TblNhanVien>> getNhanVienByPhongBan(int idPhong, bool? gioiTinh);
        Task<IEnumerable<TblNhanVien>> getNhanVienByTo(int idTo);
        Task<List<TblNhanVien>> SearchNhanVienAsync(string? search);

        Task<NhanVienResponse> GetNhanVienByIdAsync(string id);
    }
}
