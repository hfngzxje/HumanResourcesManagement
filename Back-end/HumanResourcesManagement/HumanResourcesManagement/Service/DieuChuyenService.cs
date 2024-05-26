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
            _nhanVienService= nhanVienService;
        }
        public async Task<CongViecHienTaiDto> GetCongViecHienTai(string maNV)
        {
            var ht = await _context.TblNhanViens.Where(nv => nv.Ma == maNV)
                .Select(nt => new CongViecHienTaiDto
                {
                    Ma = nt.Ma,
                    Chucvuhientai = _context.TblDanhMucChucDanhs.FirstOrDefault(c => c.Id == nt.Chucvuhientai).Ten,
                    Ngaychinhthuc = nt.Ngaychinhthuc,
                    Phong = nt.Phong,
                    To = nt.To,
                }).FirstAsync();
            if (ht == null)
            {
                throw new KeyNotFoundException($"list is empty {maNV}");
            }
            return ht;
        }

        public async Task<TblDieuChuyen> AddDieuChuyen(InsertDieuChuyenRequest req)
        {
            try
            {
                var ht = await GetCongViecHienTai(req.Ma);
                var cv = _context.TblDanhMucChucDanhs.FirstOrDefault(c => c.Ten == ht.Chucvuhientai).Id;
                if ((ht.Phong == req.Phong && ht.To == req.To && cv == req.Chucvu))
                {
                    throw new Exception("dieu chuyen phai khac voi hien tai.");
                }
                if (req.NgayHieuLuc < DateTime.Today)
                {
                    throw new Exception("ngay dieu chuyen khong duoc la ngay trong qua khu");
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

                TblNhanVien nhanVien = new TblNhanVien();
                nhanVien = _nhanVienService.GetNhanVienByMa(req.Ma);
                nhanVien.Phong = dc.Phong;
                nhanVien.To = dc.To;
                nhanVien.Chucvuhientai = dc.Chucvu;
                nhanVien.Ngaychinhthuc = dc.Ngayhieuluc;

                _context.TblDieuChuyens.Add(dc);
                await _context.SaveChangesAsync();
                return dc;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
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

    }
}
