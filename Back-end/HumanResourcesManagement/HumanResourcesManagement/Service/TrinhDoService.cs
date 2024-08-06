using AutoMapper;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class TrinhDoService : ITrinhDoService
    {
        private readonly NhanSuContext _context;
        private readonly IMapper _mapper;

        public TrinhDoService(IMapper mapper, NhanSuContext context)
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
            var existingEntries = _context.TblDanhMucTrinhDos
                                           .Where(cd => cd.Ma.StartsWith(initials))
                                           .ToList();
            var existingNumbers = existingEntries
                .Select(cd => int.TryParse(cd.Ma.Substring(initials.Length), out int number) ? number : 0)
                .ToList();

            var uniqueNumber = existingNumbers.Any() ? existingNumbers.Max() + 1 : 1;

            return $"{initials}{uniqueNumber}";
        }
        // Thêm mới trình độ
        public async Task AddTrinhDo(TrinhDoRequest req)
        {
            if (req == null)
            {
                throw new ArgumentNullException(nameof(req), "Tên không được để trống.");
            }
            var cdTen = await _context.TblDanhMucTrinhDos.FirstOrDefaultAsync(d => d.Ten == req.Ten);
            if (cdTen != null)
            {
                throw new Exception("Tên đã tồn tại");
            }
            var trinhDo = _mapper.Map<TblDanhMucTrinhDo>(req);
            trinhDo.Ma = GenerateCodeFromName(req.Ten);
            _context.TblDanhMucTrinhDos.Add(trinhDo);
            await _context.SaveChangesAsync();
        }

        // Xóa trình độ theo id
        public async Task DeleteTrinhDo(int id)
        {
            var trinhDo = await _context.TblDanhMucTrinhDos.FindAsync(id);
            if (trinhDo == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy trình độ với id {id}");
            }

            _context.TblDanhMucTrinhDos.Remove(trinhDo);
            await _context.SaveChangesAsync();
        }

        // Lấy danh sách trình độ
        public async Task<IEnumerable<TrinhDoResponse>> GetTrinhDo()
        {
            var listTrinhDo = await _context.TblDanhMucTrinhDos
                .Select(td => new TrinhDoResponse
                {
                    Id = td.Id,
                    Ten = td.Ten,
                    Ma = td.Ma
                }).ToListAsync();

            if (listTrinhDo == null || !listTrinhDo.Any())
            {
                return null;
            }

            return listTrinhDo;
        }

        // Lấy trình độ theo id
        public async Task<TrinhDoResponse> GetTrinhDoById(int id)
        {
            var trinhDo = await _context.TblDanhMucTrinhDos.FindAsync(id);
            if (trinhDo == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy trình độ với id {id}");
            }

            var trinhDoResponse = await _context.TblDanhMucTrinhDos
                .Where(td => td.Id == id)
                .Select(td => new TrinhDoResponse
                {
                    Id = td.Id,
                    Ten = td.Ten,
                    Ma = td.Ma
                })
                .FirstOrDefaultAsync();

            if (trinhDoResponse == null)
            {
                throw new KeyNotFoundException($"Không có dữ liệu cho id {id}");
            }

            return trinhDoResponse;
        }

        // Cập nhật thông tin trình độ
        public async Task UpdateTrinhDo(TrinhDoRequest req, int id)
        {
            try
            {
                var trinhDo = await _context.TblDanhMucTrinhDos.FindAsync(id);
                if (trinhDo == null)
                {
                    throw new KeyNotFoundException($"Không tìm thấy trình độ với id {id}");
                }
                var cdTen = await _context.TblDanhMucTrinhDos.FirstOrDefaultAsync(d => d.Ten == req.Ten);
                if (cdTen != null)
                {
                    throw new Exception("Tên đã tồn tại");
                }
                _mapper.Map(req, trinhDo);
                trinhDo.Id = id;

                _context.TblDanhMucTrinhDos.Update(trinhDo);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
