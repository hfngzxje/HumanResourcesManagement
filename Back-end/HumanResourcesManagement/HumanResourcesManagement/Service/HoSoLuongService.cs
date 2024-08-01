using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class HoSoLuongService : IHoSoLuongService
    {
        private readonly NhanSuContext _context;

        public HoSoLuongService(NhanSuContext context)
        {
            _context = context;
        }

        public void ThemHoSoLuong(InsertHoSoLuong request)
        {
            var hopDong = _context.TblHopDongs.FirstOrDefault(x => x.Mahopdong == request.Mahopdong);
            if (hopDong == null)
            {
                throw new Exception("Không có mã hợp đồng hợp lệ.");
            }

            if (request.Nhomluong == null)
            {
                throw new Exception("Nhóm lương không được để trống.");
            }

            var hsl = new TblLuong
            {
                Mahopdong = request.Mahopdong,
                Nhomluong = request.Nhomluong,
                Phucaptrachnhiem = request.Phucaptrachnhiem,
                Phucapkhac = request.Phucapkhac,
                Tongluong = request.Tongluong, 
                Thoihanlenluong = request.Thoihanlenluong,
                Ngayhieuluc = request.Ngayhieuluc,
                Ngayketthuc = request.Ngayketthuc,
                Ghichu = request.Ghichu 
            };

            _context.TblLuongs.Add(hsl);
            _context.SaveChanges();
        }


        public double tinhLuong(TinhLuongRequest request)
        {
            var hopDong = _context.TblHopDongs.FirstOrDefault(x => x.Mahopdong == request.Mahopdong);
            if (hopDong == null)
            {
                throw new Exception("Khong co ma hop dong hop le");
            }

            double phuCapTrachNhiem = request.Phucaptrachnhiem ?? 0;
            double phuCapKhac = request.Phucapkhac ?? 0;

            //double tongLuong = hopDong.Luongcoban.Value * request.Hesoluong.Value + phuCapTrachNhiem + phuCapKhac;
            double tongLuong = 0;

            return 10;
        }

        public void suaHoSoLuong(int id, InsertHoSoLuong request)
        {
            var hoSoLuong = _context.TblLuongs.Find(id);
            if (hoSoLuong == null)
            {
                throw new KeyNotFoundException("Không tìm thấy hồ sơ lương với ID tương ứng.");
            }
            var hopDong = _context.TblHopDongs.FirstOrDefault(x => x.Mahopdong == request.Mahopdong);
            if (hopDong == null)
            {
                throw new Exception("Không có mã hợp đồng hợp lệ.");
            }

            hoSoLuong.Mahopdong = request.Mahopdong;
            hoSoLuong.Nhomluong = request.Nhomluong;
            hoSoLuong.Phucaptrachnhiem = request.Phucaptrachnhiem;
            hoSoLuong.Phucapkhac = request.Phucapkhac;
            hoSoLuong.Tongluong = request.Tongluong;
            hoSoLuong.Thoihanlenluong = request.Thoihanlenluong;
            hoSoLuong.Ngayhieuluc = request.Ngayhieuluc;
            hoSoLuong.Ngayketthuc = request.Ngayketthuc;
            hoSoLuong.Ghichu = request.Ghichu;

            _context.TblLuongs.Update(hoSoLuong);
            _context.SaveChanges();
        }


        public void xoaHoSoLuong(int id)
        {
            var hoSoLuong = _context.TblLuongs.Find(id);
            if (hoSoLuong == null)
            {
                throw new KeyNotFoundException("ID này không tồn tại!!");
            }

            _context.TblLuongs.Remove(hoSoLuong);
            _context.SaveChanges();
        }

        public List<TblLuong> getAllHoSoLuongByMaNV(string maNV)
        {
            var maHopDongs = _context.TblHopDongs
                                     .Where(hd => hd.Ma == maNV)
                                     .Select(hd => hd.Mahopdong)
                                     .ToList();

            if (!maHopDongs.Any())
            {
                throw new Exception("Không tìm thấy hợp đồng nào cho mã nhân viên này.");
            }

            var hoSoLuongs = _context.TblLuongs
                                     .Where(l => maHopDongs.Contains(l.Mahopdong))
                                     .ToList();

            return hoSoLuongs;
        }

        public TblLuong getHoSoLuongById(int id)
        {
            var hoSoLuong = _context.TblLuongs.Find(id);
            if (hoSoLuong == null)
            {
                throw new Exception("ID không tồn tại!");
            }
            return hoSoLuong;
        }

        public IdAndName getChucDanhByHopDong(string maHopDong)
        {
            var hopDong = _context.TblHopDongs
                .Include(hd => hd.ChucdanhNavigation)
                .FirstOrDefault(hd => hd.Mahopdong == maHopDong);

            if (hopDong == null || hopDong.ChucdanhNavigation == null)
            {
                throw new Exception("Không tìm thấy hợp đồng hoặc chức danh tương ứng.");
            }

            return new IdAndName
            {
                Id = hopDong.ChucdanhNavigation.Id,
                Ten = hopDong.ChucdanhNavigation.Ten
            };
        }

        public ActionResult<TblDanhMucChucDanh> getPhuCapByChucDanh(int id)
        {
            var phuCap = _context.TblDanhMucChucDanhs.Find(id);
            return phuCap;
        }

        public ActionResult<TblDanhMucNhomLuong> GetBacLuongByChucDanh(int id)
        {
            throw new NotImplementedException();
        }
        


        public async Task<List<TblDanhMucNhomLuong>> GetBacLuongByChucDanhAsync(int chucDanhId)
        {
            return await _context.TblDanhMucNhomLuongs
                .Where(bl => bl.Chucdanh == chucDanhId)
                .ToListAsync();
        }



        public async Task<List<TblDanhMucNhomLuong>> GetLuongDetailsAsync(int? chucDanhId, int? bacLuongId)
        {
            IQueryable<TblDanhMucNhomLuong> query = _context.TblDanhMucNhomLuongs.AsQueryable();

            if (chucDanhId.HasValue)
            {
                query = query.Where(bl => bl.Chucdanh == chucDanhId.Value);
            }

            if (bacLuongId.HasValue)
            {
                query = query.Where(bl => bl.Nhomluong == bacLuongId.Value);
            }

            return await query.ToListAsync();
        }

    }
}
