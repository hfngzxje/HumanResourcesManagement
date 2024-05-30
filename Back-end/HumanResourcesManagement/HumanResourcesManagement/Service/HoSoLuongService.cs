using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
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

        public void themHoSoLuong(InsertHoSoLuong request)
        {
            var hopDong = _context.TblHopDongs.FirstOrDefault(x => x.Mahopdong == request.Mahopdong);
            if (hopDong == null)
            {
                throw new Exception("Khong co ma hop dong hop le");
            }

            if (request.Hesoluong <= 0)
            {
                throw new Exception("He so luong phai lon hon 0 ");
            }

            double phuCapTrachNhiem = request.Phucaptrachnhiem ?? 0;
            double phuCapKhac = request.Phucapkhac ?? 0;

            double tongLuong = hopDong.Luongcoban.Value * request.Hesoluong.Value + phuCapTrachNhiem + phuCapKhac;

            var hsl = new TblLuong
            {
                Mahopdong = request.Mahopdong,
                Nhomluong = request.Nhomluong,
                Hesoluong = request.Hesoluong,
                Bacluong = request.Bacluong,
                Phucaptrachnhiem = request.Phucaptrachnhiem,
                Phucapkhac = request.Phucapkhac,
                Tongluong = tongLuong,
                Thoihanlenluong = request.Thoihanlenluong,
                Ngayhieuluc = request.Ngayhieuluc,
                Ngayketthuc = request.Ngayketthuc,
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

            double tongLuong = hopDong.Luongcoban.Value * request.Hesoluong.Value + phuCapTrachNhiem + phuCapKhac;

            return tongLuong;
        }

        public void suaHoSoLuong(int id, InsertHoSoLuong request)
        {
            var hoSoLuong = _context.TblLuongs.Find(id);
            if (hoSoLuong == null)
            {
                throw new KeyNotFoundException("Khong tim tay ho so luong!");
            }

            if (request.Hesoluong <= 0)
            {
                throw new Exception("He so luong phai lon hon 0 ");
            }


            var hopDong = _context.TblHopDongs.FirstOrDefault(x => x.Mahopdong == request.Mahopdong);
            if (hopDong == null)
            {
                throw new Exception("Khong co ma hop dong hop le");
            }

            double phuCapTrachNhiem = request.Phucaptrachnhiem ?? 0;
            double phuCapKhac = request.Phucapkhac ?? 0;

            double tongLuong = hopDong.Luongcoban.Value * request.Hesoluong.Value + phuCapTrachNhiem + phuCapKhac;

            hoSoLuong.Mahopdong = request.Mahopdong;
            hoSoLuong.Nhomluong = request.Nhomluong;
            hoSoLuong.Hesoluong = request.Hesoluong;
            hoSoLuong.Bacluong = request.Bacluong;
            hoSoLuong.Phucaptrachnhiem = request.Phucaptrachnhiem;
            hoSoLuong.Phucapkhac = request.Phucapkhac;
            hoSoLuong.Tongluong = tongLuong;
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
    }
}
