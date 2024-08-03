using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class DieuChuyenService : IDieuChuyenService
    {
        private readonly NhanSuContext _context;
        private readonly INhanVienService _nhanVienService;

        public DieuChuyenService(NhanSuContext context, INhanVienService nhanVienService)
        {
            _context = context;
            _nhanVienService = nhanVienService;
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
            try
            {
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
                    IdPhongCu = ht.Phong == phongHienTai ? null : _context.TblDanhMucPhongBans.FirstOrDefault(p => p.Ten == ht.Phong)?.Id,
                    IdPhongMoi = req.Phong,
                    IdToCu = ht.To == toHienTai ? null : _context.TblDanhMucTos.FirstOrDefault(t => t.Ten == ht.To)?.Id,
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
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<TblNhanVien> DieuChuyenNhanVien(string maNV, int idDieuChuyen)
        {
            var nhanVien = await _context.TblNhanViens.FirstOrDefaultAsync(nv => nv.Ma == maNV);
            var dc = _context.TblDieuChuyens.Find(idDieuChuyen);

            var phongCu = nhanVien.Phong;
            var toCu = nhanVien.To;
            var chucVuCu = nhanVien.Chucvuhientai;

            var ls = await _context.TblLichSuDieuChuyens.FirstOrDefaultAsync(ls => ls.IdDieuChuyen == dc.Id);
            ls.TrangThai = 1;

            _context.Entry(ls).State = EntityState.Modified;
            _context.Entry(nhanVien).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return nhanVien;

        }

        public async Task RemoveDieuChuyen(int id)
        {
            var dc = await _context.TblDieuChuyens.FindAsync(id);
            if (dc == null)
            {
                throw new KeyNotFoundException($"not found {id}");
            }
            _context.TblDieuChuyens.Remove(dc);
            await _context.SaveChangesAsync();
        }

        //public async Task<IEnumerable<DieuChuyenResponseDto>> GetAllDieuChuyen(string maNV)
        //{
        //    var dc = await _context.TblDieuChuyens.Where(nv => nv.Manv == maNV)
        //        .Select(dc => new DieuChuyenResponseDto
        //        {
        //            Id= dc.Id,
        //            NgayDieuChuyen = dc.Ngayhieuluc,
        //            Phong = _context.TblDanhMucPhongBans.FirstOrDefault(d => d.Id == dc.Phong).Ten,
        //            To = _context.TblDanhMucTos.FirstOrDefault(d => d.Id == dc.To).Ten,
        //            ChucVu = _context.TblDanhMucChucDanhs.FirstOrDefault(d => d.Id == dc.Chucvu).Ten,
        //            ChiTiet = dc.Chitiet,
        //        }).ToListAsync();
        //    return dc;
        //}
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
                    Id= ls.Id,
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
            if(all == null || !all.Any())
            {
                return null;
            }
            return all;
        }
    }
}
