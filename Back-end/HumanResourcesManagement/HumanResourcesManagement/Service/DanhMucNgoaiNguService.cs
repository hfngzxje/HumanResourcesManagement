using AutoMapper;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class DanhMucNgoaiNguService : IDanhMucNgoaiNguService
    {
        private readonly NhanSuContext _context;
        private readonly IMapper _mapper;
        public DanhMucNgoaiNguService(IMapper mapper, NhanSuContext context)
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
            var existingEntries = _context.TblDanhMucNgoaiNgus
                                           .Where(cd => cd.Ma.StartsWith(initials))
                                           .ToList();
            var existingNumbers = existingEntries
                .Select(cd => int.TryParse(cd.Ma.Substring(initials.Length), out int number) ? number : 0)
                .ToList();

            var uniqueNumber = existingNumbers.Any() ? existingNumbers.Max() + 1 : 1;

            return $"{initials}{uniqueNumber}";
        }
        public async Task AddDanhMucNgoaiNgu(DanhMucNgoaiNguRequest req)
        {
            if (req == null)
            {
                throw new ArgumentNullException(nameof(req), "DanhMucNgoaiNgu không được để trống.");
            }
            var cdTen = await _context.TblDanhMucNgoaiNgus.FirstOrDefaultAsync(d => d.Ten == req.Ten);
            if (cdTen != null)
            {
                throw new Exception("Tên đã tồn tại");
            }
            var danhMucNgoaiNgu = _mapper.Map<TblDanhMucNgoaiNgu>(req);
            danhMucNgoaiNgu.Ma = GenerateCodeFromName(req.Ten);
            _context.TblDanhMucNgoaiNgus.Add(danhMucNgoaiNgu);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteDanhMucNgoaiNgu(int id)
        {
            var danhMucNgoaiNgu = await _context.TblDanhMucNgoaiNgus.FindAsync(id);
            if (danhMucNgoaiNgu == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy ngoại ngữ với id {id}");
            }
            _context.TblDanhMucNgoaiNgus.Remove(danhMucNgoaiNgu);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<DanhMucNgoaiNguResponse>> GetDanhMucNgoaiNgu()
        {
            var listDanhMucNgoaiNgu = await _context.TblDanhMucNgoaiNgus
                .Select(dmnn => new DanhMucNgoaiNguResponse
                {
                    Id = dmnn.Id,
                    Ten = dmnn.Ten,
                    Ma = dmnn.Ma,
                }).ToListAsync();
            if (listDanhMucNgoaiNgu == null || !listDanhMucNgoaiNgu.Any())
            {
                throw new KeyNotFoundException($"Danh sách trống");
            }

            return listDanhMucNgoaiNgu;
        }
        public async Task<DanhMucNgoaiNguResponse> GetDanhMucNgoaiNguById(int id)
        {
            var danhMucNgoaiNgu = await _context.TblDanhMucNgoaiNgus.FindAsync(id);
            if (danhMucNgoaiNgu == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy ngoại ngữ với id {id}");
            }

            var ngoaiNguResponse = await _context.TblDanhMucNgoaiNgus
                .Where(nv => nv.Id == id)
                .Select(cm => new DanhMucNgoaiNguResponse
                {
                    Id = cm.Id,
                    Ten = cm.Ten,
                    Ma = cm.Ma,
                })
                .FirstOrDefaultAsync();

            if (ngoaiNguResponse == null)
            {
                throw new KeyNotFoundException($"Không có dữ liệu cho id {id}");
            }

            return ngoaiNguResponse;
        }

        public async Task UpdateDanhMucNgoaiNgu(DanhMucNgoaiNguRequest req, int id)
        {
            try
            {
                var danhMucNgoaiNgu = await _context.TblDanhMucNgoaiNgus.FindAsync(id);
                if (danhMucNgoaiNgu == null)
                {
                    throw new KeyNotFoundException($"Không tìm thấy ngoại ngữ với id {id}");
                }
                var cdTen = await _context.TblDanhMucNgoaiNgus.FirstOrDefaultAsync(d => d.Ten == req.Ten);
                if (cdTen != null)
                {
                    throw new Exception("Tên đã tồn tại");
                }
                _mapper.Map(req, danhMucNgoaiNgu);

                danhMucNgoaiNgu.Id = id;

                _context.TblDanhMucNgoaiNgus.Update(danhMucNgoaiNgu);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
