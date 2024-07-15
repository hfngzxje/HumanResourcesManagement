using AutoMapper;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class DanhMucKhenThuongKyLuatService : IDanhMucKhenThuongKyLuatService
    {
        private readonly NhanSuContext _context;
        private readonly IMapper _mapper;
        public DanhMucKhenThuongKyLuatService(IMapper mapper, NhanSuContext context)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task AddDanhMucKhenThuongKyLuat(DanhMucKhenThuongKyLuatRequest req)
        {
            var dmktkl = _mapper.Map<TblDanhMucKhenThuongKyLuat>(req);
            _context.TblDanhMucKhenThuongKyLuats.Add(dmktkl);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteDanhMucKhenThuongKyLuat(int id)
        {
            var dmktkl = await _context.TblDanhMucKhenThuongKyLuats.FindAsync(id);
            if (dmktkl == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy {id}");
            }
            _context.TblDanhMucKhenThuongKyLuats.Remove(dmktkl);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<DanhMucKhenThuongKyLuatResponse>> GetDanhMucKhenThuongKyLuat()
        {
            var listKhenThuongKiLuat = await _context.TblDanhMucKhenThuongKyLuats
                .Select(dmktkl => new DanhMucKhenThuongKyLuatResponse
                {
                    Id = dmktkl.Id,
                    Ten = dmktkl.Ten,
                })
                .ToListAsync();
            if (!listKhenThuongKiLuat.Any())
            {
                throw new KeyNotFoundException($"Danh sách trống");
            }
            return listKhenThuongKiLuat;
        }
        public async Task<DanhMucKhenThuongKyLuatResponse> GetDanhMucKhenThuongKyLuatById(int id)
        {
            var listKhenThuongKiLuat = await _context.TblDanhMucKhenThuongKyLuats.FindAsync(id);
            if (listKhenThuongKiLuat == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy danh sách với {id}");
            }
            var ListKhenThuongKiLuat = await _context.TblDanhMucKhenThuongKyLuats.Where(nv => nv.Id == id)
                .Select(cm => new DanhMucKhenThuongKyLuatResponse
                {
                    Id = cm.Id,
                    Ten = cm.Ten,
                }).FirstOrDefaultAsync();
            if (ListKhenThuongKiLuat == null)
            {
                throw new KeyNotFoundException($"Danh sách trống");
            }

            return ListKhenThuongKiLuat;
        }

        public async Task UpDateDanhMucKhenThuongKyLuat(DanhMucKhenThuongKyLuatRequest req,int id)
        {
            try
            {
                var danhMucKhenThuongKyLuat = await _context.TblDanhMucKhenThuongKyLuats.FindAsync(id);
                if (danhMucKhenThuongKyLuat == null)
                {
                    throw new KeyNotFoundException($"Không tìm thấy {id}");
                }
                _mapper.Map(req, danhMucKhenThuongKyLuat);
                danhMucKhenThuongKyLuat.Id = id;
                _context.TblDanhMucKhenThuongKyLuats.Update(danhMucKhenThuongKyLuat);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
