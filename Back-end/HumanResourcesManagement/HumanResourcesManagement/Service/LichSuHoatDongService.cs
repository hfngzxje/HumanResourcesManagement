using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;

namespace HumanResourcesManagement.Service
{
    public class LichSuHoatDongService : ILichSuHoatDongService
    {
        private readonly NhanSuContext _context;
        public LichSuHoatDongService(NhanSuContext context)
        {
            _context = context;
        }


        public void AddLichSuHoatDong(LichSuHoatDongRequest request)
        {
            var ls = new TblLichSuHoatDong
            {
                Action = request.Action,      
                CreatedBy = request.CreatedBy, 
                CreatedAt = DateTime.Now     
            };
            _context.TblLichSuHoatDongs.Add(ls);
            _context.SaveChanges();
        }

        public IEnumerable<LichSuHoatDongResponse> GetAll()
        {
            var all =  _context.TblLichSuHoatDongs.Select(ls => new LichSuHoatDongResponse
            {
                Id = ls.Id,
                CreatedBy = ls.CreatedBy,
                CreatedAt = ls.CreatedAt,
                Detail = ls.Action,
            }).ToList();
            return all;
        }

        public LichSuHoatDongResponse? GetDetails(int id)
        {
            var ls =  _context.TblLichSuHoatDongs.FirstOrDefault(x => x.Id == id);
            if(ls == null)
            {
                return null;
            }
            var res = new LichSuHoatDongResponse
            {
                Id = ls.Id,
                CreatedBy = ls.CreatedBy,
                CreatedAt = ls.CreatedAt,
                Detail = ls.Action,
            };
            return res;
        }

        public bool Delete(int id)
        {
            var entity = _context.TblLichSuHoatDongs.FirstOrDefault(x => x.Id == id);
            if (entity == null) return false;

            _context.TblLichSuHoatDongs.Remove(entity);
            _context.SaveChanges();
            return true;
        }

    }
}
