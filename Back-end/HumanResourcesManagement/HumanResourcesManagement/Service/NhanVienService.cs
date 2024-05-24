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

                var nhanVienResponse = _mapper.Map<NhanVienResponse>(nhanVien);

                nhanVienResponse.tenDantoc = danToc?.Ten;
                nhanVienResponse.tenTongiao = tonGiao?.Ten;
                nhanVienResponse.tenPhong = phong?.Ten;
                nhanVienResponse.tenTo = to?.Ten;

                nhanVienResponses.Add(nhanVienResponse);
            }

            return nhanVienResponses;
        }


        public void AddNhanVien(NhanVienRequest request)
        {
            if (IsIdExist(request.Ma))
            {
                throw new Exception("ID already exists.");
            }

            var nhanVien = _mapper.Map<TblNhanVien>(request);
            nhanVien.Ma = request.Ma;
            _context.TblNhanViens.Add(nhanVien);
            _context.SaveChanges();
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

            var nhanVienResponse = _mapper.Map<NhanVienResponse>(nhanVien);
            nhanVienResponse.tenDantoc = danToc?.Ten;
            nhanVienResponse.tenTongiao = tonGiao?.Ten;
            nhanVienResponse.tenPhong = phong?.Ten;
            nhanVienResponse.tenTo = to?.Ten;

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
    }
}
