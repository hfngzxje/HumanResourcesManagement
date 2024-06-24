using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace HumanResourcesManagement.Service
{
    public class NguoiThanService : INguoiThanService
    {
        private readonly NhanSuContext _context;

        public NguoiThanService(NhanSuContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<NguoiThanDto>> GetNguoiThanByMaNV(string maNV)
        {
            if (_context.TblNguoiThans == null)
            {
                throw new InvalidOperationException("no data");
            }
            var listNguoiThan = await _context.TblNguoiThans.Where(nv => nv.Ma == maNV)
                .Select(nt => new NguoiThanDto
                {
                    Id = nt.Id,
                    Ten = nt.Ten,
                    Gioitinh = nt.Gioitinh,
                    Ngaysinh = nt.Ngaysinh,
                    QuanheTen = nt.QuanheNavigation.Ten,
                    Nghenghiep = nt.Nghenghiep,
                    Diachi = nt.Diachi,
                    Dienthoai = nt.Dienthoai,
                    Khac = nt.Khac,
                    Ma = nt.Ma.Trim()
                }).ToListAsync();
            if (listNguoiThan == null)
            {
                throw new KeyNotFoundException($"list is empty {maNV}");
            }

            return listNguoiThan;
        }

        public async Task<TblNguoiThan> GetNguoiThanById(int id)
        {
            var nt = await _context.TblNguoiThans.FindAsync(id);
            if (nt == null)
            {
                throw new Exception("khong co id nay");
            }
            return nt;
        }
        public async Task<TblNguoiThan> AddNguoiThan(InsertNguoiThanRequest req)
        {
            var nv = await _context.TblNhanViens.FirstOrDefaultAsync(nv => nv.Ma.Trim() == req.Ma);
            if (nv == null)
            {
                throw new KeyNotFoundException($"not found {req.Ma}");
            }
            var parsedDate = DateTime.Parse(req.Ngaysinh);

            if (parsedDate > DateTime.Today)
            {
                throw new Exception("date is in the future. must be in the past. check it");
            }

            if (!System.Text.RegularExpressions.Regex.IsMatch(req.Dienthoai, @"^0\d{9}$"))
            {
                throw new Exception("Dienthoai should be a 10-digit number and start with 0");
            }
            //ten not null

            var nt = new TblNguoiThan
            {
                Ma = req.Ma,
                Diachi = req.Diachi,
                Dienthoai = req.Dienthoai,
                Khac = req.Khac,
                Gioitinh = req.Gioitinh,
                Ngaysinh = parsedDate,
                Nghenghiep = req.Nghenghiep,
                Quanhe = req.Quanhe,
                Ten = req.Ten,
            };

            _context.TblNguoiThans.Add(nt);
            await _context.SaveChangesAsync();
            return nt;
        }

        public async Task DeleteNguoiThan(int id)
        {
            var nguoiThan = await _context.TblNguoiThans.FindAsync(id);
            if (nguoiThan == null)
            {
                throw new KeyNotFoundException($"not found {id}");
            }

            _context.TblNguoiThans.Remove(nguoiThan);
            await _context.SaveChangesAsync();
        }

        public async Task<TblNguoiThan> UpdateNguoiThan(UpdateNguoiThanRequest req)
        {
            try
            {
                var nguoiThan = await _context.TblNguoiThans.FindAsync(req.Id);
                if (nguoiThan == null)
                {
                    throw new KeyNotFoundException($"not found {req.Id}");
                }
                var parsedDate = DateTime.Parse(req.Ngaysinh);
                if (parsedDate > DateTime.Today)
                {
                    throw new Exception("date is in the future. must be in the past. check it");
                }
                nguoiThan.Ten = req.Ten;
                nguoiThan.Gioitinh = req.Gioitinh;
                nguoiThan.Ngaysinh = parsedDate;
                nguoiThan.Quanhe = req.Quanhe;
                nguoiThan.Nghenghiep = req.Nghenghiep;
                nguoiThan.Diachi = req.Diachi;
                nguoiThan.Dienthoai = req.Dienthoai;
                nguoiThan.Khac = req.Khac;
                _context.TblNguoiThans.Update(nguoiThan);
                _context.Entry(nguoiThan).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return nguoiThan;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }
        public async Task<IEnumerable<TblDanhMucNguoiThan>> GetDanhMucNguoiThan()
        {
            var list = await _context.TblDanhMucNguoiThans.ToListAsync();
            if (list == null)
            {
                throw new Exception("Empty list!!");
            }
            return list;
        }
    }
}
