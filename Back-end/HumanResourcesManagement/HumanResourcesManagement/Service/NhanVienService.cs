using AutoMapper;
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

        public List<TblNhanVien> GetAllNhanVien()
        {
            return _context.TblNhanViens.ToList();
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
    }
}
