using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class DanhMucHinhThucDaoTaoService : IDanhMucHinhThucDaoTaoService
    {
        private readonly NhanSuContext _context;
        public DanhMucHinhThucDaoTaoService(NhanSuContext context)
        {
            _context = context;
        }
        public async Task<TblHinhThucDaoTao> AddDanhMucHinhThucDaoTao(TblHinhThucDaoTao req)
        {
            var dmhtdt = new TblHinhThucDaoTao
            {
                Ten = req.Ten,
            };
            _context.TblHinhThucDaoTaos.Add(dmhtdt);
            await _context.SaveChangesAsync();
            return dmhtdt;
        }

        public async Task DeleteDanhMucHinhThucDaoTao(int id)
        {
            var dmhtdt = await _context.TblHinhThucDaoTaos.FindAsync(id);
            if (dmhtdt == null)
            {
                throw new KeyNotFoundException($"not found {id}");
            }
            _context.TblHinhThucDaoTaos.Remove(dmhtdt);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<TblHinhThucDaoTao>> GetDanhMucHinhThucDaoTao()
        {
            var listHinhthucdaotao = await _context.TblHinhThucDaoTaos
               .Select(dmhtdt => new TblHinhThucDaoTao
               {
                   Id = dmhtdt.Id,
                   Ten = dmhtdt.Ten,
               })
               .ToListAsync();
            if (!listHinhthucdaotao.Any())
            {
                throw new KeyNotFoundException($"list is empty");
            }
            return listHinhthucdaotao;
        }
        public async Task<TblHinhThucDaoTao> GetDanhMucHinhThucDaoTaoById(int id)
        {
            var listHinhthucdaotao = await _context.TblHinhThucDaoTaos.FindAsync(id);
            if (listHinhthucdaotao == null)
            {
                throw new KeyNotFoundException($"not found {id}");
            }
            var listhinhthucdaotao = await _context.TblHinhThucDaoTaos.Where(nv => nv.Id == id)
                .Select(cm => new TblHinhThucDaoTao
                {
                    Id = cm.Id,
                    Ten = cm.Ten,
                }).FirstOrDefaultAsync();
            if (listhinhthucdaotao == null)
            {
                throw new KeyNotFoundException($"list is empty");
            }

            return listhinhthucdaotao;
        }

        public async Task<TblHinhThucDaoTao> UpDateDanhMucHinhThucDaoTao(TblHinhThucDaoTao req)
        {
            try
            {
                var danhMucHinhThucDaoTao = await _context.TblHinhThucDaoTaos.FindAsync(req.Id);
                if (danhMucHinhThucDaoTao == null)
                {
                    throw new KeyNotFoundException($"not found {req.Id}");
                }
                danhMucHinhThucDaoTao.Ten = req.Ten;
                _context.TblHinhThucDaoTaos.Update(danhMucHinhThucDaoTao);
                _context.Entry(danhMucHinhThucDaoTao).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return danhMucHinhThucDaoTao;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
