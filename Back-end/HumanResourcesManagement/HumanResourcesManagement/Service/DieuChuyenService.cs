﻿using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;

namespace HumanResourcesManagement.Service
{
    public class DieuChuyenService : IDieuChuyenService
    {
        private readonly NhanSuContext _context;
        private readonly IHoSoLuongService _hoSoLuongService;

        public DieuChuyenService(NhanSuContext context, IHoSoLuongService hoSoLuongService)
        {
            _context = context;
            _hoSoLuongService = hoSoLuongService;
        }
        public async Task<CongViecHienTaiDto> GetCongViecHienTai(string maNV)
        {
            var ht = await _context.TblNhanViens.Where(nv => nv.Ma == maNV)
                .Select(nt => new CongViecHienTaiDto
                {
                    Ma = nt.Ma,
                    Chucvuhientai = _context.TblDanhMucChucDanhs.FirstOrDefault(c => c.Id == nt.Chucvuhientai).Ten,
                    Ngaychinhthuc = nt.Ngayvaoban,
                    Phong = _context.TblDanhMucPhongBans.FirstOrDefault(p => p.Id == nt.Phong).Ten,
                    To = _context.TblDanhMucTos.FirstOrDefault(t => t.Id == nt.To).Ten,
                }).FirstAsync();
            if (ht == null)
            {
                return null;
            }
            return ht;
        }

        public async Task<TblDieuChuyen> AddDieuChuyen(InsertDieuChuyenRequest req)
        {
            var dieuChuyen0 = await _context.TblLichSuDieuChuyens.Where(dc => dc.Ma == req.Ma).ToListAsync();
            foreach (var item in dieuChuyen0)
            {
                if(item.TrangThai == 0)
                {
                    throw new Exception("Nhân viên này có lệnh điều chuyển đang chờ. Không thể tạo lệnh điều chuyển khác.");
                }
            }

            var hopDong = await _context.TblHopDongs.Where(hd => hd.Ma == req.Ma).OrderByDescending(hd => hd.Mahopdong).FirstOrDefaultAsync();

            if (hopDong == null || hopDong.TrangThai == 2)
            {
                throw new Exception("Hợp đồng không có hoặc đã hết hạn. Không thể điều chuyển nhân viên này.");
            }
            var ht = await GetCongViecHienTai(req.Ma);
            var cv = _context.TblDanhMucChucDanhs.FirstOrDefault(c => c.Ten == ht.Chucvuhientai).Id;
            var phongHienTai = _context.TblDanhMucPhongBans.FirstOrDefault(p => p.Id == req.Phong).Ten;
            var toHienTai = _context.TblDanhMucTos.FirstOrDefault(t => t.Id == req.To).Ten;
            if ((ht.Phong == phongHienTai && ht.To == toHienTai && cv == req.Chucvu))
            {
                throw new Exception("Điều chuyển phải khác với vị trí hiện tại.");
            }
            if (req.NgayHieuLuc < DateTime.Today)
            {
                throw new Exception("Ngày điều chuyển không hợp lệ.");
            }

            var dc = new TblDieuChuyen
            {
                Manv = req.Ma,
                Phong = req.Phong,
                To = req.To,
                Chucvu = req.Chucvu,
                Ngayhieuluc = req.NgayHieuLuc,
                Chitiet = req.ChiTiet,
            };
            await _context.TblDieuChuyens.AddAsync(dc);
            await _context.SaveChangesAsync();

            var ls = new TblLichSuDieuChuyen
            {
                IdDieuChuyen = dc.Id,
                Ma = req.Ma,
                NgayDieuChuyen = req.NgayHieuLuc,
                IdPhongCu = _context.TblDanhMucPhongBans.FirstOrDefault(p => p.Ten == ht.Phong)?.Id,
                IdPhongMoi = req.Phong,
                IdToCu = _context.TblDanhMucTos.FirstOrDefault(t => t.Ten == ht.To).Id,
                IdToMoi = req.To,
                IdChucVuCu = cv,
                IdChucVuMoi = req.Chucvu,
                GhiChu = req.ChiTiet,
                TrangThai = 0
            };

            await _context.TblLichSuDieuChuyens.AddAsync(ls);
            await _context.SaveChangesAsync();
            return dc;

        }

        public async Task CheckAndProcessDieuChuyen()
        {
            DateTime today = DateTime.Today.Date;
            var dieuChuyens = await _context.TblDieuChuyens
                .Where(dc => dc.Ngayhieuluc.Value.Date == today.Date)
                .ToListAsync();

            foreach (var dc in dieuChuyens)
            {
                await DieuChuyenNhanVien(dc.Manv, dc.Id);
            }
        }

        public async Task<TblNhanVien> DieuChuyenNhanVien(string maNV, int idDieuChuyen)
        {
            var nhanVien = await _context.TblNhanViens.FirstOrDefaultAsync(nv => nv.Ma == maNV);
            var dc = await _context.TblDieuChuyens.FindAsync(idDieuChuyen);

            if (nhanVien == null || dc == null)
                throw new InvalidOperationException("Nhân viên hoặc điều chuyển không tìm thấy.");

            var phongCu = nhanVien.Phong;
            var toCu = nhanVien.To;
            var chucVuCu = nhanVien.Chucvuhientai;

            var ls = await _context.TblLichSuDieuChuyens.FirstOrDefaultAsync(ls => ls.IdDieuChuyen == dc.Id);
            ls.TrangThai = 1;

            nhanVien.Phong = dc.Phong;
            nhanVien.To = dc.To;
            nhanVien.Chucvuhientai = dc.Chucvu;
            nhanVien.Ngayvaoban = dc.Ngayhieuluc;

            var hoSoLuongCu = await _context.TblHopDongs.FirstOrDefaultAsync(hd => hd.Ma == maNV);
            var isDiff = chucVuCu != dc.Chucvu;
            if (isDiff)
            {
                var oldHoSoLuongs = await _context.TblLuongs
                    .Where(x => x.Mahopdong == hoSoLuongCu.Mahopdong && x.Trangthai == 1)
                    .ToListAsync();

                foreach (var oldHsl in oldHoSoLuongs)
                {
                    oldHsl.Trangthai = 2;
                    _context.TblLuongs.Update(oldHsl);
                }
                await _context.SaveChangesAsync();
            }

            _context.Entry(ls).State = EntityState.Modified;
            _context.Entry(nhanVien).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return nhanVien;
        }




        public async Task<TblLichSuDieuChuyen> HuyDieuChuyen(int idDieuChuyen)
        {
            var dc = await _context.TblLichSuDieuChuyens.FirstOrDefaultAsync(l => l.IdDieuChuyen == idDieuChuyen);
            if (dc.TrangThai == 1 || dc.TrangThai == -1)
            {
                throw new Exception("Lệnh điều chuyển này đã được thực hiện hoặc đã hủy. Không thể điều chuyển.");
            }
            else
            {
                dc.TrangThai = -1;
                _context.Entry(dc).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return dc;
            }

        }
        public async Task<IEnumerable<DieuChuyenResponseDto>> getLichSuDieuChuyen(string maNV)
        {
            var all = await _context.TblLichSuDieuChuyens
                .Include(l => l.IdChucVuCuNavigation)
                .Include(l => l.IdChucVuMoiNavigation)
                .Include(l => l.IdPhongCuNavigation)
                .Include(l => l.IdPhongMoiNavigation)
                .Include(l => l.IdToCuNavigation)
                .Include(l => l.IdToMoiNavigation)
                .Where(l => l.Ma == maNV)
                .Select(ls => new DieuChuyenResponseDto
                {
                    Id = ls.Id,
                    IdDieuChuyen = ls.IdDieuChuyen,
                    Ma = ls.Ma,
                    NgayDieuChuyen = ls.NgayDieuChuyen.Value.ToString("dd/MM/yyyy"),
                    tuPhong = ls.IdPhongCuNavigation.Ten,
                    denPhong = ls.IdPhongMoiNavigation.Ten,
                    tuTo = ls.IdToCuNavigation.Ten,
                    denTo = ls.IdToMoiNavigation.Ten,
                    tuChucVu = ls.IdChucVuCuNavigation.Ten,
                    denChucVu = ls.IdChucVuMoiNavigation.Ten,
                    ChiTiet = ls.GhiChu,
                    trangThai = ls.TrangThai
                }).ToListAsync();
            if (all == null || !all.Any())
            {
                return null;
            }
            return all;
        }


        public async Task<IEnumerable<LichSuDieuChuyenResponse>> GetAllAsync(short? trangThai, DateTime? ngayDieuChuyen)
        {
            var query = _context.TblLichSuDieuChuyens.AsQueryable();

            if (trangThai.HasValue)
            {
                query = query.Where(x => x.TrangThai == trangThai.Value);
            }

            if (ngayDieuChuyen.HasValue)
            {
                query = query.Where(x => x.NgayDieuChuyen >= ngayDieuChuyen.Value);
            }

            var result = await query
                .Select(x => new LichSuDieuChuyenResponse
                {
                    Id = x.Id,
                    IdDieuChuyen = x.IdDieuChuyen,
                    Ma = x.Ma,
                    NgayDieuChuyen = x.NgayDieuChuyen,
                    IdPhongCu = x.IdPhongCu,
                    TenPhongCu = _context.TblDanhMucPhongBans.Where(p => p.Id == x.IdPhongCu).Select(p => p.Ten).FirstOrDefault(),
                    IdPhongMoi = x.IdPhongMoi,
                    TenPhongMoi = _context.TblDanhMucPhongBans.Where(p => p.Id == x.IdPhongMoi).Select(p => p.Ten).FirstOrDefault(),
                    IdToCu = x.IdToCu,
                    TenToCu = _context.TblDanhMucTos.Where(t => t.Id == x.IdToCu).Select(t => t.Ten).FirstOrDefault(),
                    IdToMoi = x.IdToMoi,
                    TenToMoi = _context.TblDanhMucTos.Where(t => t.Id == x.IdToMoi).Select(t => t.Ten).FirstOrDefault(),
                    IdChucVuCu = x.IdChucVuCu,
                    TenChucVuCu = _context.TblDanhMucChucDanhs.Where(c => c.Id == x.IdChucVuCu).Select(c => c.Ten).FirstOrDefault(),
                    IdChucVuMoi = x.IdChucVuMoi,
                    TenChucVuMoi = _context.TblDanhMucChucDanhs.Where(c => c.Id == x.IdChucVuMoi).Select(c => c.Ten).FirstOrDefault(),
                    GhiChu = x.GhiChu,
                    TrangThai = x.TrangThai
                })
                .ToListAsync();

            return result;
        }

    }
}
