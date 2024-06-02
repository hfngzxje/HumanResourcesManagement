using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class PhongBanService : IPhongBanService
    {
        private readonly NhanSuContext _context;
        public PhongBanService(NhanSuContext context)
        {
            _context = context;
        }

        public async Task<TblDanhMucPhongBan> AddPhongBan(InsertPhongBan req)
        {
            var cd = await _context.TblDanhMucPhongBans.FirstOrDefaultAsync(d => d.Ma == req.Ma);
            if (cd != null)
            {
                throw new Exception("ma da ton tai");
            }
            var d = new TblDanhMucPhongBan
            {
                Ma = req.Ma,
                Ten = req.Ten
            };
            _context.TblDanhMucPhongBans.Add(d);
            await _context.SaveChangesAsync();
            return d;
        }

        public async Task DeletePhongBan(int id)
        {
            try
            {
                var dt = await _context.TblDanhMucPhongBans.FindAsync(id);
                _context.TblDanhMucPhongBans.Remove(dt);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<TblDanhMucPhongBan>> GetAllPhongBan()
        {
            return await _context.TblDanhMucPhongBans.ToListAsync();
        }

        public async Task<TblDanhMucPhongBan> GetPhongBanById(int id)
        {
            var dt = await _context.TblDanhMucPhongBans.FirstOrDefaultAsync(dt => dt.Id == id);
            return dt;
        }

        public async Task<TblDanhMucPhongBan> UpdatePhongBan(int id, InsertPhongBan req)
        {
            try
            {
                var dt = await GetPhongBanById(id);
                if (dt == null)
                {
                    throw new Exception("khong ton tai id nay");
                }

                var temp = await _context.TblDanhMucPhongBans.FirstOrDefaultAsync(d => d.Ma == req.Ma);
                if (temp != null && temp.Ma.Equals(req.Ma))
                {
                    throw new Exception($"{req.Ma} da ton tai");
                }
                dt.Ma = req.Ma;
                dt.Ten = req.Ten;
                _context.TblDanhMucPhongBans.Update(dt);
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