using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface IDieuChuyenService
    {
        Task<CongViecHienTaiDto> GetCongViecHienTai(string maNV);
        Task<TblDieuChuyen> AddDieuChuyen(InsertDieuChuyenRequest req);
        Task<TblLichSuDieuChuyen> HuyDieuChuyen(int idDieuChuyen);
        //Task<IEnumerable<DieuChuyenResponseDto>> GetAllDieuChuyen(string maNV);
        Task<TblNhanVien> DieuChuyenNhanVien(string maNV, int id); 
        Task<IEnumerable<DieuChuyenResponseDto>> getLichSuDieuChuyen(string maNV);
        Task<IEnumerable<LichSuDieuChuyenResponse>> GetAllAsync(short? trangThai, DateTime? ngayDieuChuyen);

    }
}
