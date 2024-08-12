using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

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
            var hopDongs = _context.TblHopDongs
                .Select(hd => new
                {
                    hd.Mahopdong,
                    hd.Loaihopdong,
                    hd.Chucdanh,
                    hd.Hopdongtungay,
                    hd.Hopdongdenngay,
                    hd.Ghichu,
                    hd.Ma
                })
                .ToList();

            var hopDongResponses = hopDongs
                .Select(hd => new HopDongResponse
                {
                    Mahopdong = hd.Mahopdong,
                    LoaihopdongId = hd.Loaihopdong,
                    ChucDanhId = hd.Chucdanh,
                    Hopdongtungay = hd.Hopdongtungay,
                    Hopdongdenngay = hd.Hopdongdenngay,
                    Ghichu = hd.Ghichu,
                    Ma = hd.Ma,
                    Loaihopdong = _context.TblDanhMucLoaiHopDongs
                        .Where(ld => ld.Id == hd.Loaihopdong)
                        .Select(ld => ld.Ten)
                        .FirstOrDefault(),
                    Chucdanh = _context.TblDanhMucChucDanhs
                        .Where(cd => cd.Id == hd.Chucdanh)
                        .Select(cd => cd.Ten)
                        .FirstOrDefault()
                })
                .ToList();

            return hopDongResponses;
        }



        public List<TblHopDong> GetAllHopDongByActiveMaNV(string id)
        {
            var hopDongs = _context.TblHopDongs
                .Where(hd => hd.Ma == id && hd.TrangThai == 1) 
                .ToList();

            if (!hopDongs.Any())
            {
                return null;
            }

            return hopDongs;
        }

        public List<TblHopDong> GetAllHopDongByMaNV(string id)
        {
            var hopDongs = _context.TblHopDongs
                .Where(hd => hd.Ma == id && hd.TrangThai == 1)
                .ToList();

            if (!hopDongs.Any())
            {
                return null;
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


        public async Task<TblHopDong> TaoHopDong(InsertHopDongRequest request)
        {
           
                var nhanVien = await _context.TblNhanViens.FirstOrDefaultAsync(nv => nv.Ma == request.Ma);
                if (nhanVien == null)
                {
                    throw new Exception("Mã nhân viên không tồn tại.");
                }

                if (request.Hopdongtungay > request.Hopdongdenngay)
                {
                    throw new Exception("Ngày tạo hợp đồng phải nhỏ hơn ngày hết hạn!");
                }

                var hopDongsCuaNhanVien = await _context.TblHopDongs
                    .Where(hd => hd.Ma == request.Ma && hd.TrangThai != 2)
                    .ToListAsync();

                foreach (var hopDong in hopDongsCuaNhanVien)
                {
                    hopDong.TrangThai = 2;
                }

                await _context.SaveChangesAsync();

                var newMaNv = request.Ma.ToUpper();
                string baseMaHopDong = newMaNv + "HD";
                int suffix = 1;

                while (await _context.TblHopDongs.AnyAsync(hd => hd.Mahopdong == baseMaHopDong + suffix.ToString("D2")))
                {
                    suffix++;
                }

                string newMaHopDong = baseMaHopDong + suffix.ToString("D2");

                var newHopDong = new TblHopDong
                {
                    Mahopdong = newMaHopDong,
                    Loaihopdong = request.Loaihopdong,
                    Chucdanh = request.Chucdanh,
                    Hopdongtungay = request.Hopdongtungay,
                    Hopdongdenngay = request.Hopdongdenngay,
                    Ghichu = request.Ghichu,
                    Ma = request.Ma,
                    TrangThai = 1
                };

                nhanVien.Chucvuhientai = newHopDong.Chucdanh;
                _context.Entry(nhanVien).State = EntityState.Modified;
                _context.TblHopDongs.Add(newHopDong);
                await _context.SaveChangesAsync();
                return newHopDong;
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
                //throw new Exception("Empty list!!");
                return null;
            }
            return loaiHopDong;
        }

        public List<TblDanhMucChucDanh> GetAllChucDanh()
        {
            var chucDanh = _context.TblDanhMucChucDanhs.ToList();
            if (!chucDanh.Any())
            {
                return null;
            }
            return chucDanh;
        }

    }
}
