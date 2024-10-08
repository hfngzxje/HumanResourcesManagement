﻿using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.DTOS.Request;

namespace HumanResourcesManagement.Service.IService
{
    public interface IKhenThuongKiLuatService
    {
        Task<IEnumerable<KhenThuongKyLuatResponse>> GetAllKhenThuongKyLuat();
        Task<IEnumerable<KhenThuongKyLuatResponse>> GetKhenThuongKyLuatByMaNV(string maNV, string khenThuongOrKiLuat);
        Task AddKhenThuongKyLuat(KhenThuongKyLuatRequest req);
        Task DeleteKhenThuongKyLuat(int id);
        Task<IEnumerable<KhenThuongKyLuatListResponse>> GetKhenThuongAsync(DateTime? datetime);
        Task<IEnumerable<KhenThuongKyLuatListResponse>> GetKyLuatAsync(DateTime? datetime);
    }
}
