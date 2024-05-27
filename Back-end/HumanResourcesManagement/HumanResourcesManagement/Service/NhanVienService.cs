using AutoMapper;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;

namespace HumanResourcesManagement.Service
{
    public class NhanVienService : INhanVienService
    {
        private readonly NhanSuContext _context;
        private readonly IMapper _mapper;

        public NhanVienService(NhanSuContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public List<NhanVienResponse> GetAllNhanVien()
        {
            var nhanViens = _context.TblNhanViens.ToList();
            if (!nhanViens.Any())
            {
                throw new Exception("List không có nhân viên nào!!");
            }

            var nhanVienResponses = new List<NhanVienResponse>();

            foreach (var nhanVien in nhanViens)
            {
                var danToc = _context.TblDanhMucDanTocs.Find(nhanVien.Dantoc);
                var tonGiao = _context.TblDanhMucTonGiaos.Find(nhanVien.Tongiao);
                var phong = _context.TblDanhMucPhongBans.Find(nhanVien.Phong);
                var to = _context.TblDanhMucTos.Find(nhanVien.To);
                var chucVuHienTai = _context.TblDanhMucChucDanhs.Find(nhanVien.Chucvuhientai);

                var nhanVienResponse = _mapper.Map<NhanVienResponse>(nhanVien);

                nhanVienResponse.tenDantoc = danToc?.Ten;
                nhanVienResponse.tenTongiao = tonGiao?.Ten;
                nhanVienResponse.tenPhong = phong?.Ten;
                nhanVienResponse.tenTo = to?.Ten;
                nhanVienResponse.Chucvuhientai = chucVuHienTai?.Ten;

                nhanVienResponses.Add(nhanVienResponse);
            }

            return nhanVienResponses;
        }


        public void AddNhanVien(NhanVienRequest request)
        {
            if (string.IsNullOrEmpty(request.Ten))
            {
                throw new Exception("Tên không được để trống");
            }

            string maNhanVien = GenerateEmployeeCode(request.Ten);
            int suffix = 1;
            string originalMaNhanVien = maNhanVien;

            while (_context.TblNhanViens.Any(nv => nv.Ma == maNhanVien))
            {
                maNhanVien = originalMaNhanVien + suffix.ToString();
                suffix++;
            }

            var nhanVien = _mapper.Map<TblNhanVien>(request);
            nhanVien.Ma = maNhanVien;
            _context.TblNhanViens.Add(nhanVien);
            _context.SaveChanges();
        }

        private string GenerateEmployeeCode(string fullName)
        {
            var nameParts = fullName.Split(' ');
            if (nameParts.Length == 0)
            {
                throw new Exception("Tên không hợp lệ");
            }

            var lastName = nameParts.Last().ToLower();
            var initials = string.Join("", nameParts.Take(nameParts.Length - 1).Select(name => name[0].ToString().ToLower()));

            return lastName + initials;
        }


        private bool IsIdExist(string id)
        {
            return _context.TblNhanViens.Any(nv => nv.Ma == id);
        }

        public void UpdateNhanVien(string id, NhanVienRequest request)
        {
            var existingNhanVien = _context.TblNhanViens.Find(id);
            if (existingNhanVien == null)
            {
                throw new KeyNotFoundException("NhanVien with this ID does not exist.");
            }   

            _mapper.Map(request, existingNhanVien);
            _context.TblNhanViens.Update(existingNhanVien);
            _context.SaveChanges();
        }

        public void DeleteNhanVien(string id)
        {
            var existingNhanVien = _context.TblNhanViens.Find(id);
            if (existingNhanVien == null)
            {
                throw new KeyNotFoundException("ID này không tồn tại!!");
            }

            _context.TblNhanViens.Remove(existingNhanVien);
            _context.SaveChanges();
        }

        public TblDanhMucDanToc GetDanTocById(int id)
        {
            var danToc = _context.TblDanhMucDanTocs.Find(id);
            if (danToc == null)
            {
                throw new Exception("ID dân tộc không tồn tại");
            }
            return danToc;
        }

        public TblDanhMucNgachCongChuc GetNgachCongChucById(int id)
        {
            var congChuc = _context.TblDanhMucNgachCongChucs.Find(id);
            if (congChuc == null)
            {
                throw new Exception("ID công chức không tồn tại");
            }
            return congChuc;
        }

        public TblDanhMucTo GetToById(int id)
        {
            var to = _context.TblDanhMucTos.Find(id);
            if (to == null)
            {
                throw new Exception("ID tổ không tồn tại");
            }
            return to;
        }

        public TblDanhMucPhongBan GetPhongBanById(int id)
        {
            var phong = _context.TblDanhMucPhongBans.Find(id);
            if (phong == null)
            {
                throw new Exception("ID Phòng không tồn tại");
            }
            return phong;
        }

        public TblDanhMucTonGiao GetTonGiaoById(int id)
        {
            var tonGiao = _context.TblDanhMucTonGiaos.Find(id);
            if (tonGiao == null)
            {
                throw new Exception("ID tôn giáo không tồn tại");
            }
            return tonGiao;
        }

        public NhanVienResponse  GetNhanVienById(string id)
        {
            var nhanVien = _context.TblNhanViens.Find(id);
            if (nhanVien == null)
            {
                throw new Exception("ID không tồn tại!");
            }

            var danToc = _context.TblDanhMucDanTocs.Find(nhanVien.Dantoc);
            var tonGiao = _context.TblDanhMucTonGiaos.Find(nhanVien.Tongiao);
            var phong = _context.TblDanhMucPhongBans.Find(nhanVien.Phong);
            var to = _context.TblDanhMucTos.Find(nhanVien.To);
            var chucVuHienTai = _context.TblDanhMucChucDanhs.Find(nhanVien.Chucvuhientai);

            var nhanVienResponse = _mapper.Map<NhanVienResponse>(nhanVien);
            nhanVienResponse.tenDantoc = danToc?.Ten;
            nhanVienResponse.tenTongiao = tonGiao?.Ten;
            nhanVienResponse.tenPhong = phong?.Ten;
            nhanVienResponse.tenTo = to?.Ten;
            nhanVienResponse.Chucvuhientai = chucVuHienTai?.Ten;

            return nhanVienResponse;
        }

        public TblDanhMucChucDanh GetChucVuById(int id)
        {
            var chucVu = _context.TblDanhMucChucDanhs.Find(id);
            if (chucVu == null)
            {
                throw new Exception("ID chức vụ không tồn tại");
            }
            return chucVu;
        }

        public TblNhanVien GetNhanVienByMa(string ma)
        {
            var nv = _context.TblNhanViens.Find(ma);
            if (nv == null)
            {
                throw new KeyNotFoundException("not found");
            }
            return nv;
        }

        public List<TblDanhMucDanToc> GetAllDanToc()
        {
            var danToc = _context.TblDanhMucDanTocs.ToList();
            if (!danToc.Any())
            {
                throw new Exception("Empty list!!");
            }
            return danToc;
        }

        public List<TblDanhMucTonGiao> GetAllTonGiao()
        {
            var tonGiao = _context.TblDanhMucTonGiaos.ToList();
            if (!tonGiao.Any())
            {
                throw new Exception("Empty list!!");
            }
            return tonGiao;
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

        public List<TblDanhMucNgachCongChuc> GetAllNgachCongChuc()
        {
            var nghachCongChuc = _context.TblDanhMucNgachCongChucs.ToList();
            if (!nghachCongChuc.Any())
            {
                throw new Exception("Empty list!!");
            }
            return nghachCongChuc;
        }

        public List<TblDanhMucPhongBan> GetAllPhong()
        {
            var phong = _context.TblDanhMucPhongBans.ToList();
            if (!phong.Any())
            {
                throw new Exception("Empty list!!");
            }
            return phong;
        }

        public List<TblDanhMucTo> GetAllTo()
        {
            var to = _context.TblDanhMucTos.ToList();
            if (!to.Any())
            {
                throw new Exception("Empty list!!");
            }
            return to;
        }
    }
}
