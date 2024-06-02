using AutoMapper;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class DanhMucNgoaiNguService : IDanhMucNgoaiNguService
    {
        private readonly NhanSuContext _context;
        private readonly IMapper _mapper;
        public DanhMucNgoaiNguService(IMapper mapper, NhanSuContext context)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task AddDanhMucNgoaiNgu(DanhMucNgoaiNguRequest req)
        {
            if (req == null)
            {
                throw new ArgumentNullException(nameof(req), "DanhMucNgoaiNgu cannot be null.");
            }

            using (var dbContext = new NhanSuContext())
            {
                var danhMucNgoaiNgu = _mapper.Map<TblDanhMucNgoaiNgu>(req);
                dbContext.TblDanhMucNgoaiNgus.Add(danhMucNgoaiNgu);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task DeleteDanhMucNgoaiNgu(int id)
        {
            var danhMucNgoaiNgu = await _context.TblDanhMucNgoaiNgus.FindAsync(id);
            if (danhMucNgoaiNgu == null)
            {
                throw new KeyNotFoundException($"not found {id}");
            }
            _context.TblDanhMucNgoaiNgus.Remove(danhMucNgoaiNgu);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<DanhMucNgoaiNguResponse>> GetDanhMucNgoaiNgu()
        {

            var listDanhMucNgoaiNgu = await _context.TblDanhMucNgoaiNgus
                .Select(dmnn => new DanhMucNgoaiNguResponse
                {
                    Id = dmnn.Id,
                    Ten = dmnn.Ten,
                }).ToListAsync();
            if (listDanhMucNgoaiNgu == null)
            {
                throw new KeyNotFoundException($"list is empty");
            }

            return listDanhMucNgoaiNgu;
        }

        public async Task UpdateDanhMucNgoaiNgu(DanhMucNgoaiNguRequest req, int id)
        {
            try
            {
                var danhMucNgoaiNgu = await _context.TblDanhMucNgoaiNgus.FindAsync(id);
                if (danhMucNgoaiNgu == null)
                {
                    throw new KeyNotFoundException($"not found {id}");
                }

                _mapper.Map(req, danhMucNgoaiNgu);

                danhMucNgoaiNgu.Id = id;

                _context.TblDanhMucNgoaiNgus.Update(danhMucNgoaiNgu);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
