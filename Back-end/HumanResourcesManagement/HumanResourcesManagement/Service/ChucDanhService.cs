﻿using HumanResourcesManagement.DTOS.Request;
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
        public string GenerateCodeFromName(string ten)
        {
            if (string.IsNullOrEmpty(ten))
            {
                throw new ArgumentException("Tên không được để trống", nameof(ten));
            }
            var initials = string.Concat(ten.Split(' ').Select(word => word[0])).ToUpper();
            var existingEntries = _context.TblDanhMucChucDanhs
                                           .Where(cd => cd.Ma.StartsWith(initials))
                                           .ToList();
            var existingNumbers = existingEntries
                .Select(cd => int.TryParse(cd.Ma.Substring(initials.Length), out int number) ? number : 0)
                .ToList();

            var uniqueNumber = existingNumbers.Any() ? existingNumbers.Max() + 1 : 1;

            return $"{initials}{uniqueNumber}";
        }
        public async Task<TblDanhMucChucDanh> AddChucDanh(InsertChucDanh req)
        {
            var cd = await _context.TblDanhMucChucDanhs.FirstOrDefaultAsync(d => d.Ten == req.Ten);
            if (cd != null)
            {
                throw new Exception("Tên chức danh đã tồn tại");
            }
            var cdTen = await _context.TblDanhMucChucDanhs.FirstOrDefaultAsync(d => d.Ten == req.Ten);
            if (cdTen != null)
            {
                throw new Exception("Tên đã tồn tại");
            }
            var generatedCode = GenerateCodeFromName(req.Ten);
            var d = new TblDanhMucChucDanh
            {
                Ma = generatedCode,
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
            var all = await _context.TblDanhMucChucDanhs.ToListAsync();
            if (!all.Any() || all == null)
            {
                return null;
            }
            return all;
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

                var notThis = await _context.TblDanhMucChucDanhs.Where(t => !t.Ten.Equals(dt.Ten)).ToListAsync();

                foreach (var item in notThis)
                {
                    if (req.Ten.Equals(item.Ten))
                    {
                        throw new Exception("Chức danh này đã tồn tại.");
                    }
                }

                var generatedCode = GenerateCodeFromName(req.Ten);
                dt.Ma = generatedCode;
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