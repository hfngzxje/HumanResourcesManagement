using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Ocsp;

namespace HumanResourcesManagement.Service
{
    public class NgachCongChucService : INgachCongChucService
    {
        private readonly NhanSuContext _context;
        public NgachCongChucService(NhanSuContext context)
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
            var existingEntries = _context.TblDanhMucDanTocs
                                           .Where(cd => cd.Ma.StartsWith(initials))
                                           .ToList();
            var existingNumbers = existingEntries
                .Select(cd => int.TryParse(cd.Ma.Substring(initials.Length), out int number) ? number : 0)
                .ToList();

            var uniqueNumber = existingNumbers.Any() ? existingNumbers.Max() + 1 : 1;

            return $"{initials}{uniqueNumber}";
        }

        public async Task<IEnumerable<TblDanhMucNgachCongChuc>> GetAllNgachCongChuc()
        {
            var all = await _context.TblDanhMucNgachCongChucs.ToListAsync();
            if (!all.Any() || all == null)
            {
                return null;
            }
            return all;
        }


        public async Task<TblDanhMucNgachCongChuc> AddNgachCongChuc(InsertNgachCongChuc req)
        {
            var dt = await _context.TblDanhMucNgachCongChucs.FirstOrDefaultAsync(d => d.Ten == req.Ten);
            if (dt != null)
            {
                throw new Exception("Ngạch công chức đã tồn tại");
            }
            var d = new TblDanhMucNgachCongChuc
            {
                Ten = req.Ten,
                Ma = GenerateCodeFromName(req.Ten)
            };
            _context.TblDanhMucNgachCongChucs.Add(d);
            await _context.SaveChangesAsync();
            return d;
        }

        public async Task<TblDanhMucNgachCongChuc> GetNgachCongChucById(int id)
        {
            var dt = await _context.TblDanhMucNgachCongChucs.FirstOrDefaultAsync(dt => dt.Id == id);
            if(dt == null)
            {
                throw new Exception("Không tồn tại id này");
            }
            return dt;
        }

        public async Task DeleteNgachCongChuc(int id)
        {
            try
            {
                var dt = await _context.TblDanhMucNgachCongChucs.FindAsync(id);
                _context.TblDanhMucNgachCongChucs.Remove(dt);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<TblDanhMucNgachCongChuc> UpdateNgachCongChuc(UpdateNgachCongChucRequest req)
        {
            try
            {
                var dt = await GetNgachCongChucById(req.Id);
                if (dt == null)
                {
                    throw new Exception("Không tồn tại id này");
                }

                var temp = await _context.TblDanhMucNgachCongChucs.FirstOrDefaultAsync(d => d.Ten == req.Ten);
                if (temp != null && temp.Ten.Equals(req.Ten))
                {
                    throw new Exception($"{req.Ten} da ton tai");
                }

                dt.Ten = req.Ten;
                _context.TblDanhMucNgachCongChucs.Update(dt);
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
