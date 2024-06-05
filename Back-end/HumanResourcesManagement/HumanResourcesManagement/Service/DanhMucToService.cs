using AutoMapper;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class DanhMucToService : IDanhMucToService
    {
        private readonly NhanSuContext _context;
        private readonly IMapper _mapper;
        public DanhMucToService(IMapper mapper, NhanSuContext context)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task AddDanhMucTo(DanhMucToRequest req)
        {
            if (req == null)
            {
                throw new ArgumentNullException(nameof(req), "DanhMucTo cannot be null.");
            }

           
                var danhMucTo = _mapper.Map<TblDanhMucTo>(req);
            _context.TblDanhMucTos.Add(danhMucTo);
                await _context.SaveChangesAsync();
           
        }

        public async Task DeleteDanhMucTo(int id)
        {
            var danhMucTo = await _context.TblDanhMucTos.FindAsync(id);
            if (danhMucTo == null)
            {
                throw new KeyNotFoundException($"not found {id}");
            }
            _context.TblDanhMucTos.Remove(danhMucTo);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<DanhMucToResponse>> GetDanhMucTo()
        {
            var listDanhMucTo = await _context.TblDanhMucTos
                .Select(dmt => new DanhMucToResponse
                {
                    Id = dmt.Id,
                    Ten = dmt.Ten,
                    Idphong = dmt.Idphong,
                    Ma = dmt.Ma,
                }).ToListAsync();
            if (listDanhMucTo == null)
            {
                throw new KeyNotFoundException($"list is empty");
            }

            return listDanhMucTo;
        }
        public async Task<IEnumerable<DanhMucToResponse>> GetDanhMucToById(int id)
        {
            var danhmucto = await _context.TblDanhMucTos.FindAsync(id);
            if (danhmucto == null)
            {
                throw new KeyNotFoundException($"not found {id}");
            }
            var listDanhMucTo = await _context.TblDanhMucTos.Where(nv => nv.Id == id)
                .Select(cm => new DanhMucToResponse
                {
                    Id = cm.Id,
                    Ten = cm.Ten,
                    Idphong =   cm.Idphong,
                    Ma = cm.Ma.Trim()
                }).ToListAsync();
            if (listDanhMucTo == null)
            {
                throw new KeyNotFoundException($"list is empty");
            }

            return listDanhMucTo;
        }

        public async Task UpdateDanhMucTo(DanhMucToRequest req, int id)
        {
            try
            {
                var danhMucTo = await _context.TblDanhMucTos.FindAsync(id);
                if (danhMucTo == null)
                {
                    throw new KeyNotFoundException($"not found {id}");
                }

                _mapper.Map(req, danhMucTo);

                danhMucTo.Id = id;

                _context.TblDanhMucTos.Update(danhMucTo);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
