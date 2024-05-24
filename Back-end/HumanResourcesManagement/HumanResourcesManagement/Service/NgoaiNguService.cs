﻿using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class NgoaiNguService : INgoaiNguService
    {
        private readonly NhanSuContext _context;
        public NgoaiNguService(NhanSuContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<NgoaiNguDto>> GetNgoaiNguByMaNV(string maNV)
        {
            if (string.IsNullOrWhiteSpace(maNV))
            {
                throw new ArgumentException("maNV không được để trống ", nameof(maNV));
            }
            var exists = await _context.TblNgoaiNgus.AnyAsync(nv => nv.Ma == maNV);
            if (!exists)
            {
                throw new KeyNotFoundException($"Không tìm thấy nhân viên với mã {maNV}");
            }

            if (_context.TblNgoaiNgus == null)
            {
                throw new InvalidOperationException("no data");
            }
            var listNgoaiNgu = await _context.TblNgoaiNgus.Where(nv => nv.Ma == maNV)
                .Select(nn => new NgoaiNguDto
                {
                    Id = nn.Id,
                    Ngoaingu = nn.NgoainguNavigation.Ten,
                    Ngaycap = nn.Ngaycap,
                    Trinhdo = nn.Trinhdo,
                    Noicap = nn.Noicap,
                    Ma = nn.Ma.Trim()
                }).ToListAsync();
            if (listNgoaiNgu == null)
            {
                throw new KeyNotFoundException($"list is empty {maNV}");
            }

            return listNgoaiNgu;
        }
        public async Task<TblNgoaiNgu> AddNgoaiNgu(InsertNgoaiNguRequest req)
        {
            var nv = await _context.TblNhanViens.FirstOrDefaultAsync(nv => nv.Ma.Trim() == req.Ma);
            if (nv == null)
            {
                throw new KeyNotFoundException($"not found {req.Ma}");
            }
            var dateDate = req.Ngaycap;
            if (dateDate > DateTime.Today )
            {
                throw new Exception("ngay cap phai truoc hoac trong ngay hien tai ");
            }
            var nn = new TblNgoaiNgu
            {
                Ngoaingu = req.Ngoaingu,
                Ngaycap = req.Ngaycap,
                Trinhdo = req.Trinhdo,
                Noicap = req.Noicap,
                Ma = req.Ma
            };
            _context.TblNgoaiNgus.Add(nn);
            await _context.SaveChangesAsync();
            return nn;
        }

        public async Task DeleteNgoaiNgu(int id)
        {
            var ngoaiNgu = await _context.TblNgoaiNgus.FindAsync(id);
            if (ngoaiNgu == null)
            {
                throw new KeyNotFoundException($"not found {id}");
            }
            _context.TblNgoaiNgus.Remove(ngoaiNgu);
            await _context.SaveChangesAsync();
        }


        public async Task<TblNgoaiNgu> UpdateNgoaiNgu(UpdateNgoaiNguRequest req)
        {
            try
            {
                var ngoaiNgu = await _context.TblNgoaiNgus.FindAsync(req.Id);
                if (ngoaiNgu == null)
                {
                    throw new KeyNotFoundException($"not found {req.Id}");
                }
                var dateDate = req.Ngaycap;
                if (dateDate > DateTime.Today)
                {
                    throw new Exception("ngay cap phai truoc ngay hien tai");
                }
                ngoaiNgu.Ngoaingu = req.Ngoaingu;
                ngoaiNgu.Ngaycap = req.Ngaycap;
                ngoaiNgu.Trinhdo = req.Trinhdo;
                ngoaiNgu.Noicap = req.Noicap;
                _context.TblNgoaiNgus.Update(ngoaiNgu);
                _context.Entry(ngoaiNgu).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return ngoaiNgu;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
