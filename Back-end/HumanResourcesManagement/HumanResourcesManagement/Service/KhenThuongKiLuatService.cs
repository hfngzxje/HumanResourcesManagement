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
        public async Task<TblKhenThuongKyLuat> AddKhenThuongKyLuat(TblKhenThuongKyLuat req)
        {
            var nv = await _context.TblNhanViens.FirstOrDefaultAsync(nv => nv.Ma.Trim() == req.Ma);
            if (nv == null)
            {
                throw new KeyNotFoundException($"not found {req.Ma}");
            }
           
            var ktkl = new TblKhenThuongKyLuat
            {
                Ngay = req.Ngay,
                Noidung = req.Noidung,
                Lido = req.Lido,
                Khenthuongkiluat = req.Khenthuongkiluat,
                Ma = req.Ma
            };
            _context.TblKhenThuongKyLuats.Add(ktkl);
            await _context.SaveChangesAsync();
            return ktkl;
        }

        public async Task DeleteKhenThuongKyLuat(int id)
        {
            var ktkl = await _context.TblKhenThuongKyLuats.FindAsync(id);
            if (ktkl == null)
            {
                throw new KeyNotFoundException($"not found {id}");
            }
            _context.TblKhenThuongKyLuats.Remove(ktkl);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<TblKhenThuongKyLuat>> GetKhenThuongKyLuatByMaNV(string maNV, int khenThuongOrKiLuat)
        {
            if (string.IsNullOrWhiteSpace(maNV))
            {
                throw new ArgumentException("maNV không được để trống", nameof(maNV));
            }

            var exists = await _context.TblKhenThuongKyLuats.AnyAsync(nv => nv.Ma == maNV);
            if (!exists)
            {
                throw new KeyNotFoundException($"Không tìm thấy nhân viên với mã {maNV}");
            }

            if (_context.TblKhenThuongKyLuats == null)
            {
                throw new InvalidOperationException("no data");
            }

            var listKhenThuongKiLuat = new List<TblKhenThuongKyLuat>();

            if (khenThuongOrKiLuat == 1)
            {
                var listKhenThuong = await _context.TblKhenThuongKyLuats
                    .Where(nv => nv.Ma == maNV && nv.Khenthuongkiluat == 1)
                    .Select(kt => new TblKhenThuongKyLuat
                    {
                        Id = kt.Id,
                        Ten = kt.Ten,
                        Ngay = kt.Ngay ?? DateTime.MinValue, // Handle nullable DateTime
                        Noidung = kt.Noidung,
                        Lido = kt.Lido,
                        Ma = kt.Ma.Trim()
                    })
                    .ToListAsync();

                listKhenThuongKiLuat = listKhenThuong;
                if (!listKhenThuong.Any())
                {
                    throw new KeyNotFoundException($"list is empty {maNV}");
                }
            }
            else
            {
                var listKiLuat = await _context.TblKhenThuongKyLuats
                    .Where(nv => nv.Ma == maNV && nv.Khenthuongkiluat == 2)
                    .Select(kt => new TblKhenThuongKyLuat
                    {
                        Id = kt.Id,
                        Ten = kt.Ten,
                        Ngay = kt.Ngay ?? DateTime.MinValue, // Handle nullable DateTime
                        Noidung = kt.Noidung,
                        Lido = kt.Lido,
                        Ma = kt.Ma.Trim()
                    })
                    .ToListAsync();

                listKhenThuongKiLuat = listKiLuat;
                if (!listKiLuat.Any())
                {
                    throw new KeyNotFoundException($"list is empty {maNV}");
                }
            }

            return listKhenThuongKiLuat;
        }
    }
}
