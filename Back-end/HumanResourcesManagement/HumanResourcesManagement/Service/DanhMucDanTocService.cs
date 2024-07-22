using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class DanhMucDanTocService : IDanhMucDanTocService
    {
        private readonly NhanSuContext _context;
        public DanhMucDanTocService(NhanSuContext context)
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
        public async Task<TblDanhMucDanToc> AddDanToc(InsertDanTocRequest req)
        {
            var dt = await _context.TblDanhMucDanTocs.FirstOrDefaultAsync(d => d.Ten == req.Ten);
            if (dt != null)
            {
                throw new Exception("dan toc da ton tai");
            }
            var d = new TblDanhMucDanToc
            {
                Ten = req.Ten,
                Ma = GenerateCodeFromName(req.Ten)
            };
            _context.TblDanhMucDanTocs.Add(d);
            await _context.SaveChangesAsync();
            return d;
        }

        public async Task DeleteDanToc(int id)
        {
            try
            {
                var dt = await _context.TblDanhMucDanTocs.FindAsync(id);
                _context.TblDanhMucDanTocs.Remove(dt);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<TblDanhMucDanToc>> GetAllDanToc()
        {
            return await _context.TblDanhMucDanTocs.ToListAsync();
        }

        public async Task<TblDanhMucDanToc> GetDanTocById(int id)
        {
            var dt = await _context.TblDanhMucDanTocs.FirstOrDefaultAsync(dt => dt.Id == id);
            return dt;
        }

        public async Task<TblDanhMucDanToc> UpdateDanToc(UpdateDanTocRequest req)
        {
            try
            {
                var dt = await GetDanTocById(req.Id);
                if (dt == null)
                {
                    throw new Exception("khong ton tai id nay");
                }

                var temp = await _context.TblDanhMucDanTocs.FirstOrDefaultAsync(d => d.Ten == req.Ten);
                if (temp != null && temp.Ten.Equals(req.Ten))
                {
                    throw new Exception($"{req.Ten} da ton tai");
                }

                dt.Ten = req.Ten;
                _context.TblDanhMucDanTocs.Update(dt);
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