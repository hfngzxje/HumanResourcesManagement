using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;

namespace HumanResourcesManagement.Service
{
    public class HopDongService : IHopDongService
    {
        private readonly NhanSuContext _context;

        public HopDongService(NhanSuContext context)
        {
            _context = context;
        }

        public List<TblHopDong> GetAllHopDong()
        {
            var hopDongs = _context.TblHopDongs.ToList();
            if (!hopDongs.Any())
            {
                throw new Exception("Không có hợp đồng nào!!");
            }

            return hopDongs;
        }

        public List<TblHopDong> GetAllHopDongByMaNV(string id)
        {
            var hopDongs = _context.TblHopDongs.Where(hd => hd.Ma == id).ToList();

            if (!hopDongs.Any())
            {
                throw new Exception("Không có hợp đồng nào cho mã nhân viên này!!");
            }

            return hopDongs;
        }

        public TblHopDong GetHopDongByMaHopDong(string id)
        {
            var hopDong = _context.TblHopDongs.Find(id);
            if (hopDong == null)
            {
                throw new Exception("ID không tồn tại!");
            }

            return hopDong;
        }

        public void SuaHopDong(string id, UpdateHopDongRequest request)
        {
            var hopDong = _context.TblHopDongs.Find(id);
            if (hopDong == null)
            {
                throw new KeyNotFoundException("Hop Dong with this ID does not exist.");
            }

            if (request.Hopdongtungay > request.Hopdongdenngay)
            {
                throw new Exception("Ngay tao hop dong phai nho hon ngay het han!!");
            }

            hopDong.Loaihopdong = request.Loaihopdong;
            hopDong.Chucdanh = request.Chucdanh;
            //hopDong.Luongcoban = request.Luongcoban;
            hopDong.Hopdongtungay = request.Hopdongtungay;
            hopDong.Hopdongdenngay = request.Hopdongdenngay;
            hopDong.Ghichu = request.Ghichu;
            hopDong.Ma = request.Ma;
            hopDong.TrangThai = request.trangThai;

            _context.TblHopDongs.Update(hopDong);
            _context.SaveChanges();
        }


        public void TaoHopDong(InsertHopDongRequest request)
        {
            var nhanVien = _context.TblNhanViens.FirstOrDefault(nv => nv.Ma == request.Ma);
            if (nhanVien == null)
            {
                throw new Exception("Mã nhân viên không tồn tại.");
            }

            if (request.Hopdongtungay > request.Hopdongdenngay)
            {
                throw new Exception("Ngày tạo hợp đồng phải nhỏ hơn ngày hết hạn!");
            }

            var newMaNv = request.Ma.ToUpper();

            string baseMaHopDong = newMaNv + "HD";
            int suffix = 1;

            while (_context.TblHopDongs.Any(hd => hd.Mahopdong == baseMaHopDong + suffix.ToString("D2")))
            {
                suffix++;
            }

            string newMaHopDong = baseMaHopDong + suffix.ToString("D2");

            var hopDong = new TblHopDong()
            {
                Mahopdong = newMaHopDong,
                Loaihopdong = request.Loaihopdong,
                Chucdanh = request.Chucdanh,
                Hopdongtungay = request.Hopdongtungay,
                Hopdongdenngay = request.Hopdongdenngay,
                Ghichu = request.Ghichu,
                Ma = request.Ma,
                TrangThai = request.TrangThai
            };

            _context.TblHopDongs.Add(hopDong);
            _context.SaveChanges();
        }



        public void XoaHopDong(string id)
        {
            var hopDong = _context.TblHopDongs.Find(id);
            if (hopDong == null)
            {
                throw new KeyNotFoundException("ID này không tồn tại!!");
            }

            _context.TblHopDongs.Remove(hopDong);
            _context.SaveChanges();
        }

        private bool IsIdExist(string id)
        {
            return _context.TblHopDongs.Any(nv => nv.Mahopdong == id);
        }


        public List<TblDanhMucLoaiHopDong> GetAllLoaiHopDong()
        {
            var loaiHopDong = _context.TblDanhMucLoaiHopDongs.ToList();
            if (!loaiHopDong.Any())
            {
                throw new Exception("Empty list!!");
            }
            return loaiHopDong;
        }

        public List<TblDanhMucChucDanh> GetAllChucDanh()
        {
            var chucDanh = _context.TblDanhMucChucDanhs.ToList();
            if (!chucDanh.Any())
            {
                throw new Exception("Empty list!!");
            }
            return chucDanh;
        }

    }
}
