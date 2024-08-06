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
        public string GenerateCodeFromName(string ten)
        {
            if (string.IsNullOrEmpty(ten))
            {
                throw new ArgumentException("Tên không được để trống", nameof(ten));
            }
            var initials = string.Concat(ten.Split(' ').Select(word => word[0])).ToUpper();
            var existingEntries = _context.TblDanhMucPhongBans
                                           .Where(cd => cd.Ma.StartsWith(initials))
                                           .ToList();
            var existingNumbers = existingEntries
                .Select(cd => int.TryParse(cd.Ma.Substring(initials.Length), out int number) ? number : 0)
                .ToList();

            var uniqueNumber = existingNumbers.Any() ? existingNumbers.Max() + 1 : 1;

            return $"{initials}{uniqueNumber}";
        }
        public async Task<TblDanhMucPhongBan> AddPhongBan(InsertPhongBan req)
        {
            //var cd = await _context.TblDanhMucPhongBans.FirstOrDefaultAsync(d => d.Ma == req.Ma);
            //if (cd != null)
            //{
            //    throw new Exception("ma da ton tai");
            //}
            var cdTen = await _context.TblDanhMucPhongBans.FirstOrDefaultAsync(d => d.Ten == req.Ten);
            if (cdTen != null)
            {
                throw new Exception("Tên đã tồn tại");
            }
            var d = new TblDanhMucPhongBan
            {
                Ma = GenerateCodeFromName(req.Ten),
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
            var all = await _context.TblDanhMucPhongBans.ToListAsync();
            if(!all.Any() || all == null)
            {
                return null;
            }
            return all;
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

                //var temp = await _context.TblDanhMucPhongBans.FirstOrDefaultAsync(d => d.Ma == req.Ma);
                //if (temp != null && temp.Ma.Equals(req.Ma))
                //{
                //    throw new Exception($"{req.Ma} da ton tai");
                //}
                //dt.Ma = req.Ma;
                var cdTen = await _context.TblDanhMucPhongBans.FirstOrDefaultAsync(d => d.Ten == req.Ten);
                if (cdTen != null)
                {
                    throw new Exception("Tên đã tồn tại");
                }
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