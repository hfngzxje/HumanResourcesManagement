using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class DanhMucKhenThuongKyLuatService : IDanhMucKhenThuongKyLuatService
    {
        private readonly NhanSuContext _context;
        public DanhMucKhenThuongKyLuatService(NhanSuContext context)
        {
            _context = context;
        }
        public async Task<TblDanhMucKhenThuongKyLuat> AddDanhMucKhenThuongKyLuat(TblDanhMucKhenThuongKyLuat req)
        {
           
            var dmktkl = new TblDanhMucKhenThuongKyLuat
            {
                Ten = req.Ten,
            };
            _context.TblDanhMucKhenThuongKyLuats.Add(dmktkl);
            await _context.SaveChangesAsync();
            return dmktkl;
        }

        public async Task DeleteDanhMucKhenThuongKyLuat(int id)
        {
            var dmktkl = await _context.TblDanhMucKhenThuongKyLuats.FindAsync(id);
            if (dmktkl == null)
            {
                throw new KeyNotFoundException($"not found {id}");
            }
            _context.TblDanhMucKhenThuongKyLuats.Remove(dmktkl);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<TblDanhMucKhenThuongKyLuat>> GetDanhMucKhenThuongKyLuat()
        {
            
            var listKhenThuongKiLuat = await _context.TblDanhMucKhenThuongKyLuats
                .Select(dmktkl => new TblDanhMucKhenThuongKyLuat
                {
                   Id  = dmktkl.Id,
                   Ten = dmktkl.Ten,
                })
                .ToListAsync();
            if (!listKhenThuongKiLuat.Any())
            {
                throw new KeyNotFoundException($"list is empty");
            }
            return listKhenThuongKiLuat;
        }
        public async Task<TblDanhMucKhenThuongKyLuat> GetDanhMucKhenThuongKyLuatById(int id)
        {
            var listKhenThuongKiLuat = await _context.TblDanhMucKhenThuongKyLuats.FindAsync(id);
            if (listKhenThuongKiLuat == null)
            {
                throw new KeyNotFoundException($"not found {id}");
            }
            var ListKhenThuongKiLuat = await _context.TblDanhMucKhenThuongKyLuats.Where(nv => nv.Id == id)
                .Select(cm => new TblDanhMucKhenThuongKyLuat
                {
                    Id = cm.Id,
                    Ten = cm.Ten,
                }).FirstOrDefaultAsync();
            if (ListKhenThuongKiLuat == null)
            {
                throw new KeyNotFoundException($"list is empty");
            }

            return ListKhenThuongKiLuat;
        }

        public async Task<TblDanhMucKhenThuongKyLuat> UpDateDanhMucKhenThuongKyLuat(TblDanhMucKhenThuongKyLuat req)
        {
            
                try
                {
                    var danhMucKhenThuongKyLuat = await _context.TblDanhMucKhenThuongKyLuats.FindAsync(req.Id);
                    if (danhMucKhenThuongKyLuat == null)
                    {
                        throw new KeyNotFoundException($"not found {req.Id}");
                    }
                    danhMucKhenThuongKyLuat.Ten = req.Ten;
                    _context.TblDanhMucKhenThuongKyLuats.Update(danhMucKhenThuongKyLuat);
                    _context.Entry(danhMucKhenThuongKyLuat).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return danhMucKhenThuongKyLuat;
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            
        }
    }
}
