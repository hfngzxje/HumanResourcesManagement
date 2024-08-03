using HumanResourcesManagement.DTOS.Request;
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

        public IEnumerable<TblLichSuHoatDong> GetAll()
        {
            return _context.TblLichSuHoatDongs.ToList();
        }

        public TblLichSuHoatDong? GetDetails(int id)
        {
            return _context.TblLichSuHoatDongs.FirstOrDefault(x => x.Id == id);
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
