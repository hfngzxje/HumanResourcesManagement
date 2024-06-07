using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class LoaiHopDongService : ILoaiHopDongService
    {
        private readonly NhanSuContext _context;
        public LoaiHopDongService(NhanSuContext context)
        {
            _context = context;
        }

        public async Task<TblDanhMucLoaiHopDong> AddLoaiHopDong(InsertLoaiHopDongRequest req)
        {
            var dt = await _context.TblDanhMucLoaiHopDongs.FirstOrDefaultAsync(d => d.Ten == req.Ten);
            if (dt != null)
            {
                throw new Exception("loai hop dong da ton tai");
            }
            var d = new TblDanhMucLoaiHopDong
            {
                Ten = req.Ten,
                Ma = req.Ma,
            };
            _context.TblDanhMucLoaiHopDongs.Add(d);
            await _context.SaveChangesAsync();
            return d;
        }

        public async Task DeleteLoaiHopDong(int id)
        {
            try
            {
                var dt = await _context.TblDanhMucLoaiHopDongs.FindAsync(id);
                _context.TblDanhMucLoaiHopDongs.Remove(dt);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<TblDanhMucLoaiHopDong>> GetAllLoaiHopDong()
        {
            return await _context.TblDanhMucLoaiHopDongs.ToListAsync();
        }

        public async Task<TblDanhMucLoaiHopDong> GetLoaiHopDongById(int id)
        {
            var dt = await _context.TblDanhMucLoaiHopDongs.FirstOrDefaultAsync(dt => dt.Id == id);
            return dt;
        }

        public async Task<TblDanhMucLoaiHopDong> UpdateLoaiHopDong(int id , InsertLoaiHopDongRequest req)
        {
            try
            {
                var dt = await GetLoaiHopDongById(id);
                if (dt == null)
                {
                    throw new Exception("khong ton tai id nay");
                }

                var temp = await _context.TblDanhMucLoaiHopDongs.FirstOrDefaultAsync(d => d.Ten == req.Ten);
                if (temp != null && temp.Ten.Equals(req.Ten))
                {
                    throw new Exception($"{req.Ten} da ton tai");
                }

                dt.Ten = req.Ten;
                dt.Ma = req.Ma;
                _context.TblDanhMucLoaiHopDongs.Update(dt);
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