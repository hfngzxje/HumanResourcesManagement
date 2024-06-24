using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class DanhMucQuanHeService : IDanhMucQuanHeService
    {
        private readonly NhanSuContext _context;
        public DanhMucQuanHeService(NhanSuContext context)
        {
            _context = context;
        }

        public async Task<TblDanhMucNguoiThan> AddQuanHe(QuanHeRequest req)
        {
            var nt = await _context.TblDanhMucNguoiThans.FirstOrDefaultAsync(d => d.Ten.ToLower().Trim() == req.Ten.ToLower().Trim());
            if (nt != null)
            {
                throw new Exception("Quan he da ton tai");
            }
            var d = new TblDanhMucNguoiThan
            {
                Ten= req.Ten,
            };
            _context.TblDanhMucNguoiThans.Add(d);
            await _context.SaveChangesAsync();
            return d;
        }

        public async Task DeleteQuanHe(int id)
        {
            try
            {
                var dt = await _context.TblDanhMucNguoiThans.FindAsync(id);
                _context.TblDanhMucNguoiThans.Remove(dt);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<TblDanhMucNguoiThan>> GetAllQuanHe()
        {
            return await _context.TblDanhMucNguoiThans.ToListAsync();
        }

        public async Task<TblDanhMucNguoiThan> GetQuanHeById(int id)
        {
            var nt = await _context.TblDanhMucNguoiThans.FirstOrDefaultAsync(n => n.Id == id);
            return nt;
        }

        public async Task<TblDanhMucNguoiThan> UpdateQuanHe(int id, QuanHeRequest req)
        {
            try
            {
                var dt = await GetQuanHeById(id);
                if (dt == null)
                {
                    throw new Exception("khong ton tai quan he nay");
                }

                var temp = await _context.TblDanhMucNguoiThans.FirstOrDefaultAsync(d => d.Ten == req.Ten);
                if (temp != null && temp.Ten.Equals(req.Ten))
                {
                    throw new Exception($"{req.Ten} da ton tai");
                }
                dt.Ten = req.Ten;
                _context.TblDanhMucNguoiThans.Update(dt);
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