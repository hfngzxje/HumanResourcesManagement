using AutoMapper;
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
        private readonly IMapper _mapper;
        public KhenThuongKiLuatService(IMapper mapper, NhanSuContext context)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        // Thêm mới khen thưởng kỷ luật
        public async Task AddKhenThuongKyLuat(KhenThuongKyLuatRequest req)
        {
            var nv = await _context.TblNhanViens.FirstOrDefaultAsync(nv => nv.Ma.Trim() == req.Ma);
            if (nv == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy nhân viên với mã {req.Ma}");
            }
            if ( req.Ngay <= DateTime.Now) {
                var ktkl = _mapper.Map<TblKhenThuongKyLuat>(req);
                _context.TblKhenThuongKyLuats.Add(ktkl);
                await _context.SaveChangesAsync();
            }
            else throw new KeyNotFoundException($"thời gian phải nhỏ hơn hoặc bằng thời điểm hiện tại ");
            
        }

        // Xóa khen thưởng kỷ luật theo id
        public async Task DeleteKhenThuongKyLuat(int id)
        {
            var ktkl = await _context.TblKhenThuongKyLuats.FindAsync(id);
            if (ktkl == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy khen thưởng kỷ luật với id {id}");
            }
            _context.TblKhenThuongKyLuats.Remove(ktkl);
            await _context.SaveChangesAsync();
        }

        // Lấy danh sách khen thưởng kỷ luật theo mã nhân viên và loại khen thưởng/kỷ luật
        public async Task<IEnumerable<KhenThuongKyLuatResponse>> GetKhenThuongKyLuatByMaNV(string maNV, string khenThuongOrKiLuat)
        {
            if (string.IsNullOrWhiteSpace(maNV))
            {
                throw new ArgumentException("Mã nhân viên không được để trống", nameof(maNV));
            }

            //var exists = await _context.TblKhenThuongKyLuats.AnyAsync(nv => nv.Ma == maNV);
            //if (!exists)
            //{
            //    throw new KeyNotFoundException($"Không tìm thấy nhân viên với mã {maNV}");
            //}

            //if (_context.TblKhenThuongKyLuats == null)
            //{
            //    return null;
            //}

            var query = _context.TblKhenThuongKyLuats.Where(nv => nv.Ma == maNV);

            if (!string.IsNullOrWhiteSpace(khenThuongOrKiLuat))
            {
                if (khenThuongOrKiLuat.ToLower().Trim() == "khen thưởng")
                {
                    query = query.Where(nv => nv.Khenthuongkiluat == 1);
                }
                else if (khenThuongOrKiLuat.ToLower().Trim() == "kỷ luật")
                {
                    query = query.Where(nv => nv.Khenthuongkiluat == 2);
                }
                else if (khenThuongOrKiLuat.ToLower().Trim() == "khen thưởng và kỷ luật")
                {
                    query = query.Where(nv => nv.Khenthuongkiluat == 2 && nv.Khenthuongkiluat == 1);
                }
            }

            var listKhenThuongKiLuat = await query
                .Select(kt => new KhenThuongKyLuatResponse
                {
                    Id = kt.Id,
                    Ten = kt.TenNavigation.Ten,
                    Ngay = kt.Ngay ?? DateTime.MinValue,
                    Noidung = kt.Noidung,
                    Lido = kt.Lido,
                    Ma = kt.Ma.Trim()
                })
                .ToListAsync();

            if (!listKhenThuongKiLuat.Any())
            {
                return null;
            }

            return listKhenThuongKiLuat;
        }

        public async Task<IEnumerable<KhenThuongKyLuatResponse>> GetAllKhenThuongKyLuat()
        {
            var all = await _context.TblKhenThuongKyLuats.ToListAsync();
            var resp = all.Select(r => new KhenThuongKyLuatResponse
            {
                Id = r.Id,
                Ten = _context.TblDanhMucKhenThuongKyLuats.FirstOrDefault(k => k.Id == r.Khenthuongkiluat).Ten,
                Ngay = r.Ngay ?? DateTime.MinValue,
                Noidung = r.Noidung,
                Lido = r.Lido,
                Khenthuongkiluat = r.Khenthuongkiluat,
                Ma = r.Ma?.Trim()
            }).ToList();

            if (!resp.Any() || resp == null)
            {
                return null;
            }
            return resp;
        }

        public async Task<IEnumerable<KhenThuongKyLuatListResponse>> GetKhenThuongAsync(DateTime? fromDate)
        {
            var query = _context.TblKhenThuongKyLuats
                .Where(x => x.Khenthuongkiluat == 1);

            if (fromDate.HasValue)
            {
                query = query.Where(x => x.Ngay >= fromDate.Value);
            }

            return await query
                .Select(x => new KhenThuongKyLuatListResponse
                {
                    Id = x.Id,
                    Ma = x.Ma,
                    TenNV = _context.TblNhanViens
                        .Where(nv => nv.Ma == x.Ma)
                        .Select(nv => nv.Ten)
                        .FirstOrDefault(),
                    Ngay = x.Ngay,
                    Noidung = x.Noidung,
                    Lido = x.Lido,
                    TenId = x.Ten,
                    Ten = _context.TblDanhMucKhenThuongKyLuats
                        .Where(dm => dm.Id == x.Ten)
                        .Select(dm => dm.Ten)
                        .FirstOrDefault()
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<KhenThuongKyLuatListResponse>> GetKyLuatAsync(DateTime? fromDate)
        {
            var query = _context.TblKhenThuongKyLuats
                .Where(x => x.Khenthuongkiluat == 2);

            if (fromDate.HasValue)
            {
                query = query.Where(x => x.Ngay >= fromDate.Value);
            }

            return await query
                .Select(x => new KhenThuongKyLuatListResponse
                {
                    Id = x.Id,
                    Ma = x.Ma,
                    TenNV = _context.TblNhanViens
                        .Where(nv => nv.Ma == x.Ma)
                        .Select(nv => nv.Ten)
                        .FirstOrDefault(),
                    Ngay = x.Ngay,
                    Noidung = x.Noidung,
                    Lido = x.Lido,
                    TenId = x.Ten,
                    Ten = _context.TblDanhMucKhenThuongKyLuats
                        .Where(dm => dm.Id == x.Ten)
                        .Select(dm => dm.Ten)
                        .FirstOrDefault()
                })
                .ToListAsync();
        }
    }
}
