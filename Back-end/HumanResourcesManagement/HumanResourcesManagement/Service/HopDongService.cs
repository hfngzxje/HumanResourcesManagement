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

        public List<HopDongResponse> GetAllHopDong()
        {
            var hopDongs = _context.TblHopDongs.ToList();
            if (!hopDongs.Any())
            {
                throw new Exception("Không có hợp đồng nào!!");
            }

            var hopDongResponses = new List<HopDongResponse>();

            foreach (var hopDong in hopDongs)
            {
                var loaiHopDong = _context.TblDanhMucLoaiHopDongs.Find(hopDong.Loaihopdong);
                var chucDanh = _context.TblDanhMucChucDanhs.Find(hopDong.Chucdanh);

                var hopDongResponse = new HopDongResponse
                {
                    Mahopdong = hopDong.Mahopdong,
                    Luongcoban = hopDong.Luongcoban,
                    Hopdongtungay = hopDong.Hopdongtungay,
                    Hopdongdenngay = hopDong.Hopdongdenngay,
                    Ghichu = hopDong.Ghichu,
                    Ma = hopDong.Ma,
                    Loaihopdong = loaiHopDong?.Ten,
                    Chucdanh = chucDanh?.Ten
                };

                hopDongResponses.Add(hopDongResponse);
            }

            return hopDongResponses;
        }

        public HopDongResponse GetHopDongByMaHopDong(string id)
        {
            var hopDong = _context.TblHopDongs.Find(id);
            if (hopDong == null)
            {
                throw new Exception("ID không tồn tại!");
            }

            var loaiHopDong = _context.TblDanhMucLoaiHopDongs.Find(hopDong.Loaihopdong);
            var chucDanh = _context.TblDanhMucChucDanhs.Find(hopDong.Chucdanh);

            var hopDongResponse = new HopDongResponse
            {
                Mahopdong = hopDong.Mahopdong,
                Luongcoban = hopDong.Luongcoban,
                Hopdongtungay = hopDong.Hopdongtungay,
                Hopdongdenngay = hopDong.Hopdongdenngay,
                Ghichu = hopDong.Ghichu,
                Ma = hopDong.Ma,
                Loaihopdong = loaiHopDong?.Ten,
                Chucdanh = chucDanh?.Ten
            };

            return hopDongResponse;
        }

        public void SuaHopDong(string id, HopDongRequest request)
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
            hopDong.Luongcoban = request.Luongcoban;
            hopDong.Hopdongtungay = request.Hopdongtungay;
            hopDong.Hopdongdenngay = request.Hopdongdenngay;
            hopDong.Ghichu = request.Ghichu;
            hopDong.Ma = request.Ma;

            _context.TblHopDongs.Update(hopDong);
            _context.SaveChanges();
        }

        public void TaoHopDong(HopDongRequest request)
        {
            if (IsIdExist(request.Ma))
            {
                throw new Exception("ID already exists.");
            }

            if(request.Hopdongtungay > request.Hopdongdenngay)
            {
                throw new Exception("Ngay tao hop dong phai nho hon ngay het han!!");
            }

            var hopDong = new TblHopDong()
            {
                Mahopdong = request.Mahopdong,
                Loaihopdong = request.Loaihopdong,
                Chucdanh = request.Chucdanh,
                Luongcoban = request.Luongcoban,
                Hopdongtungay = request.Hopdongtungay,
                Hopdongdenngay = request.Hopdongdenngay,
                Ghichu = request.Ghichu,
                Ma = request.Ma
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
            return _context.TblHopDongs.Any(nv => nv.Ma == id);
        }
    }
}
