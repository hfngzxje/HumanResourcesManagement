using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class DanhMucTonGiaoService : IDanhMucTonGiaoService
    {
        private readonly NhanSuContext _context;
        public DanhMucTonGiaoService(NhanSuContext context)
        {
            _context = context;
        }

        public async Task<TblDanhMucTonGiao> AddTonGiao(InsertTonGiaoRequest req)
        {
            var dt = await _context.TblDanhMucTonGiaos.FirstOrDefaultAsync(d => d.Ten == req.Ten);
            if (dt != null)
            {
                throw new Exception("ton giao da ton tai");
            }
            var d = new TblDanhMucTonGiao
            {
                Ten = req.Ten,
            };
            _context.TblDanhMucTonGiaos.Add(d);
            await _context.SaveChangesAsync();
            return d;
        }

        public async Task DeleteTonGiao(int id)
        {
            try
            {
                var dt = await _context.TblDanhMucTonGiaos.FindAsync(id);
                _context.TblDanhMucTonGiaos.Remove(dt);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<TblDanhMucTonGiao>> GetAllTonGiao()
        {
            return await _context.TblDanhMucTonGiaos.ToListAsync();
        }

        public async Task<TblDanhMucTonGiao> GetTonGiaoById(int id)
        {
            var dt = await _context.TblDanhMucTonGiaos.FirstOrDefaultAsync(dt => dt.Id == id);
            return dt;
        }

        public async Task<TblDanhMucTonGiao> UpdateTonGiao(UpdateTonGiaoRequest req)
        {
            try
            {
                var dt = await GetTonGiaoById(req.Id);
                if (dt == null)
                {
                    throw new Exception("khong ton tai id nay");
                }

                var temp = await _context.TblDanhMucTonGiaos.FirstOrDefaultAsync(d => d.Ten == req.Ten);
                if (temp != null && temp.Ten.Equals(req.Ten))
                {
                    throw new Exception($"{req.Ten} da ton tai");
                }

                dt.Ten = req.Ten;
                _context.TblDanhMucTonGiaos.Update(dt);
                _context.Entry(dt).State = EntityState.Modified;

                await _context.SaveChangesAsync();
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}