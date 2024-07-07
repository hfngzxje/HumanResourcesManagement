using AutoMapper;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

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
        public async Task AddDanhMucHinhThucDaoTao(HinhThucDaoTaoRequest req)
        {
            var dmhtdt = _mapper.Map<TblHinhThucDaoTao>(req);
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
