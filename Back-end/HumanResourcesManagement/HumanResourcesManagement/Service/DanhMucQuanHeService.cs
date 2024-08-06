using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using System.Text.RegularExpressions;

namespace HumanResourcesManagement.Service
{
    public class DanhMucQuanHeService : IDanhMucQuanHeService
    {
        private readonly NhanSuContext _context;
        public DanhMucQuanHeService(NhanSuContext context)
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
            var existingEntries = _context.TblDanhMucNguoiThans
                                           .Where(cd => cd.Ma.StartsWith(initials))
                                           .ToList();
            var existingNumbers = existingEntries
                .Select(cd => int.TryParse(cd.Ma.Substring(initials.Length), out int number) ? number : 0)
                .ToList();

            var uniqueNumber = existingNumbers.Any() ? existingNumbers.Max() + 1 : 1;

            return $"{initials}{uniqueNumber}";
        }
        public async Task<TblDanhMucNguoiThan> AddQuanHe(QuanHeRequest req)
        {
            string trimmedTen = req.Ten.Trim();

            if (!Regex.IsMatch(trimmedTen, @"^[a-zA-ZÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+$"))
            {
                throw new Exception("Tên chỉ được chứa chữ cái.");
            }

            var nt = await _context.TblDanhMucNguoiThans
                                   .FirstOrDefaultAsync(d => d.Ten.ToLower() == trimmedTen.ToLower());
            if (nt != null)
            {
                throw new Exception("Quan hệ đã tồn tại.");
            }

            var d = new TblDanhMucNguoiThan
            {
                Ten = trimmedTen,
                Ma = GenerateCodeFromName(trimmedTen)
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
                    return null;
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