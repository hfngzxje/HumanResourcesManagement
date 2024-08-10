using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;

namespace HumanResourcesManagement.Service
{
    public class DanhMucNhomLuongService : IDanhMucNhomLuongService
    {

        private readonly NhanSuContext _context;

        public DanhMucNhomLuongService(NhanSuContext context)
        {
            _context = context;
        }
        public async Task<TblDanhMucNhomLuong> AddNhomLuong(DanhMucNhomLuongRequest request)
        {
            var nhomLuong = new TblDanhMucNhomLuong
            {
                Hesoluong = request.Hesoluong,
                Bacluong = request.Bacluong,
                Ghichu = request.Ghichu,
                Ngachcongchuc = request.Ngachcongchuc,
                Luongcoban = request.Luongcoban
            };

            _context.TblDanhMucNhomLuongs.Add(nhomLuong);
            await _context.SaveChangesAsync();
            return nhomLuong;
        }


        public async Task<TblDanhMucNhomLuong> UpdateNhomLuongAsync(int id, DanhMucNhomLuongRequest request)
        {
            var nhomLuong = await _context.TblDanhMucNhomLuongs.FindAsync(id);

            if (nhomLuong == null)
            {
                throw new KeyNotFoundException("Nhóm lương không tồn tại.");
            }

            nhomLuong.Hesoluong = request.Hesoluong;
            nhomLuong.Bacluong = request.Bacluong;
            nhomLuong.Ghichu = request.Ghichu;
            nhomLuong.Ngachcongchuc = request.Ngachcongchuc;
            nhomLuong.Luongcoban = request.Luongcoban;

            _context.TblDanhMucNhomLuongs.Update(nhomLuong);
            await _context.SaveChangesAsync();

            return nhomLuong;
        }

        public async Task<bool> DeleteNhomLuongAsync(int id)
        {
            var nhomLuong = await _context.TblDanhMucNhomLuongs.FindAsync(id);

            if (nhomLuong == null)
            {
                throw new KeyNotFoundException("Nhóm lương không tồn tại.");
            }

            _context.TblDanhMucNhomLuongs.Remove(nhomLuong);
            await _context.SaveChangesAsync();

            return true;
        }


        public async Task<List<TblDanhMucNhomLuong>> GetAllNhomLuongAsync()
        {
            return await _context.TblDanhMucNhomLuongs.ToListAsync();
        }

        public async Task<TblDanhMucNhomLuong?> GetNhomLuongByIdAsync(int id)
        {
            return await _context.TblDanhMucNhomLuongs.FindAsync(id);
        }

    }
}
