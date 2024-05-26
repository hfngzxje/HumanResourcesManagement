using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class KhenThuongKiLuatService : IKhenThuongKiLuatService
    {
        private readonly NhanSuContext _context;
        public KhenThuongKiLuatService(NhanSuContext context)
        {
            _context = context;
        }
        public async Task<TblDanhMucKhenThuongKyLuat> AddKhenThuongKyLuat(TblDanhMucKhenThuongKyLuat req)
        {
            var nv = await _context.TblNhanViens.FirstOrDefaultAsync(nv => nv.Ma.Trim() == req.Ma);
            if (nv == null)
            {
                throw new KeyNotFoundException($"not found {req.Ma}");
            }
           
            var ktkl = new TblDanhMucKhenThuongKyLuat
            {
                Ngay = req.Ngay,
                Noidung = req.Noidung,
                Lido = req.Lido,
                Khenthuongkiluat = req.Khenthuongkiluat,
                Ma = req.Ma
            };
            _context.TblDanhMucKhenThuongKyLuats.Add(ktkl);
            await _context.SaveChangesAsync();
            return ktkl;
        }

        public async Task DeleteKhenThuongKyLuat(int id)
        {
            var ktkl = await _context.TblDanhMucKhenThuongKyLuats.FindAsync(id);
            if (ktkl == null)
            {
                throw new KeyNotFoundException($"not found {id}");
            }
            _context.TblDanhMucKhenThuongKyLuats.Remove(ktkl);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<TblDanhMucKhenThuongKyLuat>> GetKhenThuongKyLuatByMaNV(string maNV, int khenThuongOrKiLuat)
        {
            if (string.IsNullOrWhiteSpace(maNV))
            {
                throw new ArgumentException("maNV không được để trống ", nameof(maNV));
            }
            var exists = await _context.TblDanhMucKhenThuongKyLuats.AnyAsync(nv => nv.Ma == maNV);
            if (!exists)
            {
                throw new KeyNotFoundException($"Không tìm thấy nhân viên với mã {maNV}");
            }

            if (_context.TblDanhMucKhenThuongKyLuats == null)
            {
                throw new InvalidOperationException("no data");
            }
            var listKhenThuongKiLuat =new List<TblDanhMucKhenThuongKyLuat>();
            if (khenThuongOrKiLuat == 1)
            {
                var listKhenThuong= await _context.TblDanhMucKhenThuongKyLuats.Where(nv => nv.Ma == maNV &&nv.Khenthuongkiluat == 1)
                    .Select(kt => new TblDanhMucKhenThuongKyLuat
                    {
                        Id = kt.Id,
                        Ngay = kt.Ngay,
                        Noidung = kt.Noidung,
                        Lido = kt.Lido,
                        Ma = kt.Ma.Trim()
                    }).ToListAsync();
                listKhenThuongKiLuat = listKhenThuong;
                if (listKhenThuong == null)
                {
                    throw new KeyNotFoundException($"list is empty {maNV}");
                }
            }
            else
            {
                var listKiLuat = await _context.TblDanhMucKhenThuongKyLuats.Where(nv => nv.Ma == maNV && nv.Khenthuongkiluat == 2)
                   .Select(kt => new TblDanhMucKhenThuongKyLuat
                   {
                       Id = kt.Id,
                       Ngay = kt.Ngay,
                       Noidung = kt.Noidung,
                       Lido = kt.Lido,
                       Ma = kt.Ma.Trim()
                   }).ToListAsync();
                listKhenThuongKiLuat = listKiLuat;
                if (listKiLuat == null)
                {
                    throw new KeyNotFoundException($"list is empty {maNV}");
                }
            }
            return listKhenThuongKiLuat;


        }
    }
}
