using AutoMapper;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class DanhMucKhenThuongKyLuatService : IDanhMucKhenThuongKyLuatService
    {
        private readonly NhanSuContext _context;
        private readonly IMapper _mapper;
        public DanhMucKhenThuongKyLuatService(IMapper mapper, NhanSuContext context)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public string GenerateCodeFromName(string ten)
        {
            if (string.IsNullOrEmpty(ten))
            {
                throw new ArgumentException("Tên không được để trống", nameof(ten));
            }
            var initials = string.Concat(ten.Split(' ').Select(word => word[0])).ToUpper();
            var existingEntries = _context.TblDanhMucKhenThuongKyLuats
                                           .Where(cd => cd.Ma.StartsWith(initials))
                                           .ToList();
            var existingNumbers = existingEntries
                .Select(cd => int.TryParse(cd.Ma.Substring(initials.Length), out int number) ? number : 0)
                .ToList();

            var uniqueNumber = existingNumbers.Any() ? existingNumbers.Max() + 1 : 1;

            return $"{initials}{uniqueNumber}";
        }
        public async Task AddDanhMucKhenThuongKyLuat(DanhMucKhenThuongKyLuatRequest req)
        {
            var cdTen = await _context.TblDanhMucKhenThuongKyLuats.FirstOrDefaultAsync(d => d.Ten == req.Ten);
            if (cdTen != null)
            {
                throw new Exception("Tên đã tồn tại");
            }
            var generatedCode = GenerateCodeFromName(req.Ten);
            var dmktkl = _mapper.Map<TblDanhMucKhenThuongKyLuat>(req);
            dmktkl.Ma = generatedCode;
            _context.TblDanhMucKhenThuongKyLuats.Add(dmktkl);
            await _context.SaveChangesAsync();
        }
        


        public async Task DeleteDanhMucKhenThuongKyLuat(int id)
        {
            var dmktkl = await _context.TblDanhMucKhenThuongKyLuats.FindAsync(id);
            if (dmktkl == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy {id}");
            }
            _context.TblDanhMucKhenThuongKyLuats.Remove(dmktkl);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<DanhMucKhenThuongKyLuatResponse>> GetDanhMucKhenThuongKyLuat()
        {
            var listKhenThuongKiLuat = await _context.TblDanhMucKhenThuongKyLuats
                .Select(dmktkl => new DanhMucKhenThuongKyLuatResponse
                {
                    Id = dmktkl.Id,
                    Ten = dmktkl.Ten,
                    Ma = dmktkl.Ma,
                })
                .ToListAsync();
            if (!listKhenThuongKiLuat.Any())
            {
                return null;
            }
            return listKhenThuongKiLuat;
        }
        public async Task<DanhMucKhenThuongKyLuatResponse> GetDanhMucKhenThuongKyLuatById(int id)
        {
            var listKhenThuongKiLuat = await _context.TblDanhMucKhenThuongKyLuats.FindAsync(id);
            if (listKhenThuongKiLuat == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy danh sách với {id}");
            }
            var ListKhenThuongKiLuat = await _context.TblDanhMucKhenThuongKyLuats.Where(nv => nv.Id == id)
                .Select(cm => new DanhMucKhenThuongKyLuatResponse
                {
                    Id = cm.Id,
                    Ten = cm.Ten,
                    Ma = cm.Ma,
                }).FirstOrDefaultAsync();
            if (ListKhenThuongKiLuat == null)
            {
                return null;
            }

            return ListKhenThuongKiLuat;
        }

        public async Task UpDateDanhMucKhenThuongKyLuat(DanhMucKhenThuongKyLuatRequest req,int id)
        {
            try
            {
                var danhMucKhenThuongKyLuat = await _context.TblDanhMucKhenThuongKyLuats.FindAsync(id);
                if (danhMucKhenThuongKyLuat == null)
                {
                    throw new KeyNotFoundException($"Không tìm thấy {id}");
                }
                var cdTen = await _context.TblDanhMucKhenThuongKyLuats.FirstOrDefaultAsync(d => d.Ten == req.Ten);
                if (cdTen != null)
                {
                    throw new Exception("Tên đã tồn tại");
                }
                _mapper.Map(req, danhMucKhenThuongKyLuat);
                danhMucKhenThuongKyLuat.Id = id;
                _context.TblDanhMucKhenThuongKyLuats.Update(danhMucKhenThuongKyLuat);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
