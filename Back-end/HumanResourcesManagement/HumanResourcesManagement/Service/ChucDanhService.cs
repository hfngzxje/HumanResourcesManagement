using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class ChucDanhService : IChucDanhService
    {
        private readonly NhanSuContext _context;
        public ChucDanhService(NhanSuContext context)
        {
            _context = context;
        }

        public async Task<TblDanhMucChucDanh> AddChucDanh(InsertChucDanh req)
        {
            var cd = await _context.TblDanhMucChucDanhs.FirstOrDefaultAsync(d => d.Ma == req.Ma);
            if (cd != null)
            {
                throw new Exception("Mã đã tồn tại");
            }
            var d = new TblDanhMucChucDanh
            {
                Ma = req.Ma,
                Ten = req.Ten,
                Phucap = req.Phucap,
            };
            _context.TblDanhMucChucDanhs.Add(d);
            await _context.SaveChangesAsync();
            return d;
        }

        public async Task DeleteChucDanh(int id)
        {
            try
            {
                var dt = await _context.TblDanhMucChucDanhs.FindAsync(id);
                _context.TblDanhMucChucDanhs.Remove(dt);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<TblDanhMucChucDanh>> GetAllChucDanh()
        {
            return await _context.TblDanhMucChucDanhs.ToListAsync();
        }

        public async Task<TblDanhMucChucDanh> GetChucDanhById(int id)
        {
            var dt = await _context.TblDanhMucChucDanhs.FirstOrDefaultAsync(dt => dt.Id == id);
            return dt;
        }

        public async Task<TblDanhMucChucDanh> UpdateChucDanh(int id, InsertChucDanh req)
        {
            try
            {
                var dt = await GetChucDanhById(id);
                if (dt == null)
                {
                    throw new Exception("Không tồn tại id này.");
                }

                // var temp = await _context.TblDanhMucChucDanhs.FirstOrDefaultAsync(d => d.Ma == req.Ma);
                // if (temp != null && temp.Ma.Equals(req.Ma))
                // {
                //     throw new Exception($"{req.Ma} đã tồn tại.");
                // }
                dt.Ma = req.Ma;
                dt.Ten = req.Ten;
                dt.Phucap = req.Phucap;
                _context.TblDanhMucChucDanhs.Update(dt);
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