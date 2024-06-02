using AutoMapper;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class TrinhDoService : ITrinhDoService
    {
        private readonly NhanSuContext _context;
        private readonly IMapper _mapper;

        public TrinhDoService(IMapper mapper, NhanSuContext context)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task AddTrinhDo(TrinhDoRequest req)
        {
            if (req == null)
            {
                throw new ArgumentNullException(nameof(req), "TrinhDoRequest cannot be null.");
            }
            using (var dbContext = new NhanSuContext())
            {
                var trinhDo = _mapper.Map<TblDanhMucTrinhDo>(req);
                dbContext.TblDanhMucTrinhDos.Add(trinhDo);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task DeleteTrinhDo(int id)
        {
            var trinhDo = await _context.TblDanhMucTrinhDos.FindAsync(id);
            if (trinhDo == null)
            {
                throw new KeyNotFoundException($"not found {id}");
            }
            _context.TblDanhMucTrinhDos.Remove(trinhDo);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<TrinhDoResponse>> GetTrinhDo()
        {
            var listTrinhDo = await _context.TblDanhMucTrinhDos
                .Select(td => new TrinhDoResponse
                {
                    Id = td.Id,
                    Ten = td.Ten,
                }).ToListAsync();
            if (listTrinhDo == null)
            {
                throw new KeyNotFoundException($"list is empty");
            }

            return listTrinhDo;
        }

        public async Task UpdateTrinhDo(TrinhDoRequest req, int id)
        {
            try
            {
                var trinhDo = await _context.TblDanhMucTrinhDos.FindAsync(id);
                if (trinhDo == null)
                {
                    throw new KeyNotFoundException($"not found {id}");
                }

                _mapper.Map(req, trinhDo);

                trinhDo.Id = id;

                _context.TblDanhMucTrinhDos.Update(trinhDo);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
