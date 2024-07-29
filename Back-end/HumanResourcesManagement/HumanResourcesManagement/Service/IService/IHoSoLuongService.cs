using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Service.IService
{
    public interface IHoSoLuongService
    {
        void ThemHoSoLuong(InsertHoSoLuong request);

        double tinhLuong(TinhLuongRequest request);

        void suaHoSoLuong(int id, InsertHoSoLuong request);
        void xoaHoSoLuong(int id);
        List<TblLuong> getAllHoSoLuongByMaNV(string maNV);
        TblLuong getHoSoLuongById(int id);

        IdAndName getChucDanhByHopDong(string maHopDong);

        ActionResult<TblDanhMucChucDanh> getPhuCapByChucDanh(int id);

        Task<List<TblDanhMucNhomLuong>> GetBacLuongByChucDanhAsync(int chucDanhId);

        Task<List<TblDanhMucNhomLuong>> GetLuongDetailsAsync(int? chucDanhId, int? bacLuongId);

    }
}
