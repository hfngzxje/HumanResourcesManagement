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

            var oldHoSoLuongs = _context.TblLuongs
                .Where(x => x.Mahopdong == request.Mahopdong && x.Trangthai == 1)
                .ToList();

            foreach (var oldHsl in oldHoSoLuongs)
            {
                oldHsl.Trangthai = 2;
                _context.TblLuongs.Update(oldHsl);
            }

            int thoihanLenLuong = int.TryParse(request.Thoihanlenluong, out int parsedValue) ? parsedValue : 0;

            var hsl = new TblLuong
            {
                Mahopdong = request.Mahopdong,
                Nhomluong = request.Nhomluong,
                Phucaptrachnhiem = request.Phucaptrachnhiem,
                Phucapkhac = request.Phucapkhac,
                Tongluong = request.Tongluong,
                Thoihanlenluong = request.Thoihanlenluong,  
                Ghichu = request.Ghichu,
                Ngaybatdau = request.NgayBatDau.Value,
                Ngayketthuc = request.NgayBatDau.Value.AddYears(thoihanLenLuong), 
                Trangthai = 1
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
            //double tongLuong = 0;

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

            int thoihanLenLuong = int.TryParse(request.Thoihanlenluong, out int parsedValue) ? parsedValue : 0;

            hoSoLuong.Mahopdong = request.Mahopdong;
            hoSoLuong.Nhomluong = request.Nhomluong;
            hoSoLuong.Phucaptrachnhiem = request.Phucaptrachnhiem;
            hoSoLuong.Phucapkhac = request.Phucapkhac;
            hoSoLuong.Tongluong = request.Tongluong;
            hoSoLuong.Thoihanlenluong = request.Thoihanlenluong;
            hoSoLuong.Ghichu = request.Ghichu;

            hoSoLuong.Ngayketthuc = request.NgayBatDau.Value.AddYears(thoihanLenLuong);


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

        public async Task<IEnumerable<HoSoLuongResponse>> getAllHoSoLuongByMaNV(string maNV)
        {
            var maHopDongs = await _context.TblHopDongs
                                     .Where(hd => hd.Ma == maNV)
                                     .Select(hd => hd.Mahopdong)
                                     .ToListAsync();

            if (!maHopDongs.Any())
            {
                return null;
            }

            var hoSoLuongs = await _context.TblLuongs
                                     .Where(l => maHopDongs.Contains(l.Mahopdong))
                                     .ToListAsync();
            var resp = hoSoLuongs.Select(hl => new HoSoLuongResponse
            {
                Id = hl.Id,
                Mahopdong = hl.Mahopdong,
                Phucaptrachnhiem = hl.Phucaptrachnhiem,
                Phucapkhac = hl.Phucapkhac,
                Tongluong = hl.Tongluong,
                Thoihanlenluong = hl.Thoihanlenluong,
                Ghichu = hl.Ghichu,
                Nhomluong = hl.Nhomluong,
                BacLuong = (double)_context.TblDanhMucNhomLuongs.FirstOrDefault(l => l.Nhomluong == hl.Nhomluong).Bacluong,
                HeSoLuong = (double)_context.TblDanhMucNhomLuongs.FirstOrDefault(l => l.Nhomluong == hl.Nhomluong).Hesoluong,
                Ngaybatdau = hl.Ngaybatdau,
                Ngayketthuc = hl.Ngayketthuc,
                Trangthai = hl.Trangthai,
            }) ;

            return resp;
        }

        public async Task<HoSoLuongResponse> getHoSoLuongById(int id)
        {
            var hoSoLuong = await _context.TblLuongs.FindAsync(id);
            var resp = new HoSoLuongResponse
            {
                Id = hoSoLuong.Id,
                Mahopdong = hoSoLuong.Mahopdong,
                Phucaptrachnhiem = hoSoLuong.Phucaptrachnhiem,
                Phucapkhac = hoSoLuong.Phucapkhac,
                Tongluong = hoSoLuong.Tongluong,
                Thoihanlenluong = hoSoLuong.Thoihanlenluong,
                Ghichu = hoSoLuong.Ghichu,
                Nhomluong = hoSoLuong.Nhomluong,
                BacLuong = (double)_context.TblDanhMucNhomLuongs.FirstOrDefault(l => l.Nhomluong == hoSoLuong.Nhomluong).Bacluong,
                HeSoLuong = (double)_context.TblDanhMucNhomLuongs.FirstOrDefault(l => l.Nhomluong == hoSoLuong.Nhomluong).Hesoluong,
                Trangthai = hoSoLuong.Trangthai,
                Ngaybatdau = hoSoLuong.Ngaybatdau,
                Ngayketthuc = hoSoLuong.Ngayketthuc
            };

            if (resp == null)
            {
                throw new Exception("ID không tồn tại!");
            }
            return resp;
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
        


        public async Task<List<TblDanhMucNhomLuong>> GetBacLuongByChucDanhAsync(int ngachCongChucId)
        {
            return await _context.TblDanhMucNhomLuongs
                .Where(bl => bl.Ngachcongchuc == ngachCongChucId)
                .ToListAsync();
        }



        public async Task<List<TblDanhMucNhomLuong>> GetLuongDetailsAsync(int? ngachCongChucId, int? bacLuongId)
        {
            IQueryable<TblDanhMucNhomLuong> query = _context.TblDanhMucNhomLuongs.AsQueryable();

            if (ngachCongChucId.HasValue)
            {
                query = query.Where(bl => bl.Ngachcongchuc == ngachCongChucId.Value);
            }

            if (bacLuongId.HasValue)
            {
                query = query.Where(bl => bl.Bacluong == bacLuongId.Value);
            }

            return await query.ToListAsync();
        }


    }
}
