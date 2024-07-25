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
                throw new InvalidOperationException("Không có dữ liệu");
            }
            var listNguoiThan = await _context.TblNguoiThans.Where(nv => nv.Ma == maNV)
                .Select(nt => new NguoiThanDto
                {
                    Id = nt.Id,
                    Ten = nt.Ten,
                    Gioitinh = nt.Gioitinh,
                    Ngaysinh = nt.Ngaysinh,
                    Quanhe= nt.Quanhe,
                    QuanheTen = nt.QuanheNavigation.Ten,
                    Nghenghiep = nt.Nghenghiep,
                    Diachi = nt.Diachi,
                    Dienthoai = nt.Dienthoai,
                    Khac = nt.Khac,
                    Ma = nt.Ma.Trim()
                }).ToListAsync();
            if (listNguoiThan == null)
            {
                throw new KeyNotFoundException($"Danh sách trống {maNV}");
            }

            return listNguoiThan;
        }

        public async Task<TblNguoiThan> GetNguoiThanById(int id)
        {
            var nt = await _context.TblNguoiThans.FindAsync(id);
            if (nt == null)
            {
                throw new Exception("Không có id này");
            }
            return nt;
        }
        public async Task<TblNguoiThan> AddNguoiThan(InsertNguoiThanRequest req)
        {
            var nv = await _context.TblNhanViens.FirstOrDefaultAsync(nv => nv.Ma.Trim() == req.Ma);
            if (nv == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy {req.Ma}");
            }
            var parsedDate = DateTime.Parse(req.Ngaysinh);

            if (parsedDate > DateTime.Today)
            {
                throw new Exception("Ngày phải là ngày trong quá khứ.");
            }
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
                throw new KeyNotFoundException($"Không tìm thấy {id}");
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
                    throw new KeyNotFoundException($"Không tìm thấy {req.Id}");
                }
                var parsedDate = DateTime.Parse(req.Ngaysinh);
                if (parsedDate > DateTime.Today)
                {
                    throw new Exception("Ngày phải là ngày trong quá khứ.");
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
                throw new Exception("Danh sách trống!!");
            }
            return list;
        }
    }
}
