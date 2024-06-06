using AutoMapper;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class ChuyenMonService : IChuyenMonService
    {
        private readonly NhanSuContext _context;
        private readonly IMapper _mapper;

        public ChuyenMonService(IMapper mapper, NhanSuContext context)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task AddChuyenMon(ChuyenMonRequest req)
        {
            if (req == null)
            {
                throw new ArgumentNullException(nameof(req), "chuyenmon khoong duoc de trong");
            }

            if (req.Ma.Length > 5)
            {
                throw new ArgumentException("ma phai nho hon 5 ki tu.", nameof(req.Ma));
            }
            var exists = await _context.TblDanhMucChuyenMons.AnyAsync(cm => cm.Ma == req.Ma);
            if (exists)
            {
                throw new InvalidOperationException($"Ma '{req.Ma}' da ton tai.");
            }


            var chuyenMon = _mapper.Map<TblDanhMucChuyenMon>(req);
                _context.TblDanhMucChuyenMons.Add(chuyenMon);
                await _context.SaveChangesAsync();
            
        }

        public async Task DeleteChuyenMon(int id)
        {
            var chuyenmon = await _context.TblDanhMucChuyenMons.FindAsync(id);
            if (chuyenmon == null)
            {
                throw new KeyNotFoundException($"not found {id}");
            }
            _context.TblDanhMucChuyenMons.Remove(chuyenmon);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ChuyenMonResponse>> GetChuyenMon()
        {
            var listChuyenMon = await _context.TblDanhMucChuyenMons
                .Select(cm => new ChuyenMonResponse
                {
                    Id = cm.Id,
                    Ten = cm.Ten,
                    Ma = cm.Ma.Trim()
                }).ToListAsync();
            if (listChuyenMon == null)
            {
                throw new KeyNotFoundException($"list is empty");
            }

            return listChuyenMon;
        }

        public async Task<ChuyenMonResponse> GetChuyenMonById(int id)
        {
            var chuyenmon = await _context.TblDanhMucChuyenMons.FindAsync(id);
            if (chuyenmon == null)
            {
                throw new KeyNotFoundException($"Not found {id}");
            }

            var chuyenMonResponse = await _context.TblDanhMucChuyenMons
                .Where(nv => nv.Id == id)
                .Select(cm => new ChuyenMonResponse
                {
                    Id = cm.Id,
                    Ten = cm.Ten,
                    Ma = cm.Ma.Trim()
                })
                .FirstOrDefaultAsync();

            if (chuyenMonResponse == null)
            {
                throw new KeyNotFoundException($"No record found for id {id}");
            }

            return chuyenMonResponse;
        }


        public async Task UpdateChuyenMon(ChuyenMonRequest req, int id)
        {
            try
            {
                var chuyenmon = await _context.TblDanhMucChuyenMons.FindAsync(id);
                if (chuyenmon == null)
                {
                    throw new KeyNotFoundException($"not found {id}");
                }

                _mapper.Map(req, chuyenmon);

                chuyenmon.Id = id;

                _context.TblDanhMucChuyenMons.Update(chuyenmon);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
