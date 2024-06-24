using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;

namespace HumanResourcesManagement.Service.IService
{
    public interface IHoSoLuongService
    {
        void themHoSoLuong(InsertHoSoLuong request);

        double tinhLuong(TinhLuongRequest request);

        void suaHoSoLuong(int id, InsertHoSoLuong request);
        void xoaHoSoLuong(int id);
        List<TblLuong> getAllHoSoLuongByMaNV(string maNV);
        TblLuong getHoSoLuongById(int id);
    }
}
