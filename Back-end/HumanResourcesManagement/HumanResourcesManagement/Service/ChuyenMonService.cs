using AutoMapper;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class ChuyenMonService : IChuyenMonService
    {
        private readonly NhanSuContext _context;
        private readonly IMapper _mapper;

        public ChuyenMonService(IMapper mapper, NhanSuContext context)
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
            var existingEntries = _context.TblDanhMucChuyenMons
                                           .Where(cd => cd.Ma.StartsWith(initials))
                                           .ToList();
            var existingNumbers = existingEntries
                .Select(cd => int.TryParse(cd.Ma.Substring(initials.Length), out int number) ? number : 0)
                .ToList();

            var uniqueNumber = existingNumbers.Any() ? existingNumbers.Max() + 1 : 1;

            return $"{initials}{uniqueNumber}";
        }
        public async Task AddChuyenMon(ChuyenMonRequest req)
        {
            if (req == null)
            {
                throw new ArgumentNullException(nameof(req), "Chuyên môn không được để trống");
            }

            //if (req.Ma.Length > 5)
            //{
            //    throw new ArgumentException("Mã phải nhỏ hơn 5 ký tự.", nameof(req.Ma));
            //}

            //var exists = await _context.TblDanhMucChuyenMons.AnyAsync(cm => cm.Ma == req.Ma);
            //if (exists)
            //{
            //    throw new InvalidOperationException($"Mã '{req.Ma}' đã tồn tại.");
            //}
            var cdTen = await _context.TblDanhMucChuyenMons.FirstOrDefaultAsync(d => d.Ten == req.Ten);
            if (cdTen != null)
            {
                throw new Exception($"Tên '{req.Ten}'  đã tồn tại");
            }
            var generatedCode = GenerateCodeFromName(req.Ten);
            var chuyenMon = _mapper.Map<TblDanhMucChuyenMon>(req);
            chuyenMon.Ma = generatedCode;
            _context.TblDanhMucChuyenMons.Add(chuyenMon);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteChuyenMon(int id)
        {
            var chuyenmon = await _context.TblDanhMucChuyenMons.FindAsync(id);
            if (chuyenmon == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy {id}");
            }
            _context.TblDanhMucChuyenMons.Remove(chuyenmon);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ChuyenMonResponse>> GetChuyenMon()
        {
            var listChuyenMon = await _context.TblDanhMucChuyenMons
                .Select(cm => new ChuyenMonResponse
                {
                    Id = cm.Id,
                    Ten = cm.Ten,
                    Ma = cm.Ma.Trim()
                }).ToListAsync();

            if (listChuyenMon == null)
            {
                return null;
            }

            return listChuyenMon;
        }

        public async Task<ChuyenMonResponse> GetChuyenMonById(int id)
        {
            var chuyenmon = await _context.TblDanhMucChuyenMons.FindAsync(id);
            if (chuyenmon == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy {id}");
            }

            var chuyenMonResponse = await _context.TblDanhMucChuyenMons
                .Where(nv => nv.Id == id)
                .Select(cm => new ChuyenMonResponse
                {
                    Id = cm.Id,
                    Ten = cm.Ten,
                    Ma = cm.Ma.Trim()
                })
                .FirstOrDefaultAsync();

            if (chuyenMonResponse == null)
            {
                throw new KeyNotFoundException($"Không có bản ghi nào cho id {id}");
            }

            return chuyenMonResponse;
        }

        public async Task UpdateChuyenMon(ChuyenMonRequest req, int id)
        {
            try
            {
                var chuyenmon = await _context.TblDanhMucChuyenMons.FindAsync(id);
                if (chuyenmon == null)
                {
                    throw new KeyNotFoundException($"Không tìm thấy {id}");
                }
                var cdTen = await _context.TblDanhMucChuyenMons.FirstOrDefaultAsync(d => d.Ten == req.Ten);
                if (cdTen != null)
                {
                    throw new Exception($"Tên '{req.Ten}'  đã tồn tại");
                }

                _mapper.Map(req, chuyenmon);
                chuyenmon.Id = id;
                chuyenmon.Ten = GenerateCodeFromName(req.Ten);
                _context.TblDanhMucChuyenMons.Update(chuyenmon);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
