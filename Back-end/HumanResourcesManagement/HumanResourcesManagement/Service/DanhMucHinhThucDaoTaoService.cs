using AutoMapper;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace HumanResourcesManagement.Service
{
    public class DanhMucHinhThucDaoTaoService : IDanhMucHinhThucDaoTaoService
    {
        private readonly NhanSuContext _context;
        private readonly IMapper _mapper;
        public DanhMucHinhThucDaoTaoService(IMapper mapper,NhanSuContext context)
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
            var existingEntries = _context.TblHinhThucDaoTaos
                               .Where(cd => cd.Ma.StartsWith(initials))
                               .ToList();
            var existingNumbers = existingEntries
                .Select(cd => int.TryParse(cd.Ma.Substring(initials.Length), out int number) ? number : 0)
                .ToList();

            var uniqueNumber = existingNumbers.Any() ? existingNumbers.Max() + 1 : 1;

            return $"{initials}{uniqueNumber}";
        }
        public async Task AddDanhMucHinhThucDaoTao(HinhThucDaoTaoRequest req)
        {
            var cdTen = await _context.TblHinhThucDaoTaos.FirstOrDefaultAsync(d => d.Ten == req.Ten);
            if (cdTen != null)
            {
                throw new Exception("Tên đã tồn tại");
            }
            var dmhtdt = _mapper.Map<TblHinhThucDaoTao>(req);
            dmhtdt.Ma = GenerateCodeFromName(req.Ten);
            _context.TblHinhThucDaoTaos.Add(dmhtdt);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteDanhMucHinhThucDaoTao(int id)
        {
            var dmhtdt = await _context.TblHinhThucDaoTaos.FindAsync(id);
            if (dmhtdt == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy {id}");
            }
            _context.TblHinhThucDaoTaos.Remove(dmhtdt);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<HinhThucDaoTaoResponse>> GetDanhMucHinhThucDaoTao()
        {
            var listHinhthucdaotao = await _context.TblHinhThucDaoTaos
               .Select(dmhtdt => new HinhThucDaoTaoResponse
               {
                   Id = dmhtdt.Id,
                   Ten = dmhtdt.Ten,
                   Ma = dmhtdt.Ma
               })
               .ToListAsync();
            if (!listHinhthucdaotao.Any())
            {
                throw new KeyNotFoundException($"Danh sách trống");
            }
            return listHinhthucdaotao;
        }
        public async Task<HinhThucDaoTaoResponse> GetDanhMucHinhThucDaoTaoById(int id)
        {
            var listHinhthucdaotao = await _context.TblHinhThucDaoTaos.FindAsync(id);
            if (listHinhthucdaotao == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy {id}");
            }
            var listhinhthucdaotao = await _context.TblHinhThucDaoTaos.Where(nv => nv.Id == id)
                .Select(cm => new HinhThucDaoTaoResponse
                {
                    Id = cm.Id,
                    Ten = cm.Ten,
                    Ma = cm.Ma
                }).FirstOrDefaultAsync();
            if (listhinhthucdaotao == null)
            {
                throw new KeyNotFoundException($"Danh sách trống");
            }

            return listhinhthucdaotao;
        }

        public async Task UpDateDanhMucHinhThucDaoTao(HinhThucDaoTaoRequest req,int id)
        {
            try
            {
                var danhMucHinhThucDaoTao = await _context.TblHinhThucDaoTaos.FindAsync(id);
                if (danhMucHinhThucDaoTao == null)
                {
                    throw new KeyNotFoundException($"Không tìm thấy {id}");
                }
                var cdTen = await _context.TblHinhThucDaoTaos.FirstOrDefaultAsync(d => d.Ten == req.Ten);
                if (cdTen != null)
                {
                    throw new Exception("Tên đã tồn tại");
                }
                _mapper.Map(req, danhMucHinhThucDaoTao);
                danhMucHinhThucDaoTao.Id = id;
                _context.TblHinhThucDaoTaos.Update(danhMucHinhThucDaoTao);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
