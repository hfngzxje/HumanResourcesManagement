using AutoMapper;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;

namespace HumanResourcesManagement.Service
{
    public class DanhSachLenLuongService : IDanhSachLenLuongService
    {
        private readonly NhanSuContext _context;

        public DanhSachLenLuongService(NhanSuContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TblNhanVien>> getDanhSachNhanVienLenLuong()
        {
            var today = DateTime.Today;
            var startOfMonth = new DateTime(today.Year, today.Month, 1);
            var endOfMonth = startOfMonth.AddMonths(1).AddDays(-1);

            var maHopDongs = await _context.TblLuongs
                .Where(l => (l.Ngayketthuc >= startOfMonth && l.Ngayketthuc <= endOfMonth) || l.Ngayketthuc < today)
                .Where(l => l.Trangthai == 1)
                .Select(l => l.Mahopdong)
                .Distinct()
                .ToListAsync();

            var result = await _context.TblNhanViens
                .Where(nv => _context.TblHopDongs
                    .Where(hd => maHopDongs.Contains(hd.Mahopdong))
                    .Select(hd => hd.Ma)
                    .Contains(nv.Ma))
                .ToListAsync();

            return result;
        }

        public void TaoMoiHoSoLuongKhongActivce(InsertHoSoLuongKhongActive request)
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
                Ghichu = request.Ghichu,
                Trangthai = 2
            };

            _context.TblLuongs.Add(hsl);
            _context.SaveChanges();
        }

        public void PheDuyetQuyetDinhLenLuong(int id)
        {
            var today = DateTime.Today;

            var newLuong = _context.TblLuongs
                .FirstOrDefault(l => l.Id == id); 

            if (newLuong == null)
            {
                throw new Exception("Hồ sơ lương không tồn tại.");
            }

            var maHopDong = newLuong.Mahopdong;

            var oldLuongs = _context.TblLuongs
                .Where(l => l.Mahopdong == maHopDong && l.Trangthai == 1) 
                .ToList();

            foreach (var oldLuong in oldLuongs)
            {
                oldLuong.Trangthai = 2;
                _context.TblLuongs.Update(oldLuong);
            }

            newLuong.Trangthai = 1;
            newLuong.Ngaybatdau = today; 

            int thoihanLenLuong = int.TryParse(newLuong.Thoihanlenluong, out int parsedValue) ? parsedValue : 0;

            if (newLuong.Ngaybatdau.HasValue)
            {
                newLuong.Ngayketthuc = newLuong.Ngaybatdau.Value.AddYears(thoihanLenLuong); 
            }
            else
            {
                throw new Exception("Ngày bắt đầu không được đặt.");
            }

            _context.TblLuongs.Update(newLuong);

            _context.SaveChanges();
        }




    }
}
