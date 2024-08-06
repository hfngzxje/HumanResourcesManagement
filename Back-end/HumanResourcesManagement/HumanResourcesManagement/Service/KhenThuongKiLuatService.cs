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
            if (req.Ngay <= DateTime.Now)
            {
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

            var exists = await _context.TblKhenThuongKyLuats.AnyAsync(nv => nv.Ma == maNV);
            if (!exists)
            {
                throw new KeyNotFoundException($"Không tìm thấy nhân viên với mã {maNV}");
            }

            if (_context.TblKhenThuongKyLuats == null)
            {
                throw new InvalidOperationException("Không có dữ liệu");
            }

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
                throw new KeyNotFoundException($"Danh sách trống cho mã nhân viên {maNV}");
            }

            return listKhenThuongKiLuat;
        }
    }
}
