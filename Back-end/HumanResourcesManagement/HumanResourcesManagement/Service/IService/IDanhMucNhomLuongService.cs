using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace HumanResourcesManagement.Service.IService
{
    public interface IDanhMucNhomLuongService
    {
        Task<TblDanhMucNhomLuong> AddNhomLuong(DanhMucNhomLuongRequest request);

        Task<TblDanhMucNhomLuong> UpdateNhomLuongAsync(int id, DanhMucNhomLuongRequest request);

        Task<bool> DeleteNhomLuongAsync(int id);

        Task<IEnumerable<DanhMucNhomLuongResponse>> GetAllNhomLuongAsync();

        Task<TblDanhMucNhomLuong?> GetNhomLuongByIdAsync(int id);
    }
}
