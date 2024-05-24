using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace HumanResourcesManagement.Service
{
    public class TrinhDoVanHoaService : ITrinhDoVanHoaService
    {
        private readonly NhanSuContext _context;
        public TrinhDoVanHoaService(NhanSuContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<TrinhDoVanHoaDto>> GetTrinhDoVanHoaByMaNV(string maNV)
        {
            if (_context.TblTrinhDoVanHoas == null)
            {
                throw new InvalidOperationException("no data");
            }
            var listTrinhDoVanHoa = await _context.TblTrinhDoVanHoas.Where(nv => nv.Ma == maNV)
                .Select(tdvh => new TrinhDoVanHoaDto
                {
                    Id = tdvh.Id,
                    Tentruong = tdvh.Tentruong,
                    Chuyennganh = tdvh.ChuyennganhNavigation.Ten,
                    Tuthoigian = tdvh.Tuthoigian,
                    Denthoigian = tdvh.Denthoigian,
                    //Hinhthucdaotao = tdvh.HinhthucdaotaoNavigation.Ten,
                    Hinhthucdaotao = "cac",
                    Trinhdo = tdvh.TrinhdoNavigation.Ten,
                    Ma = tdvh.Ma.Trim()
                }).ToListAsync();
            if (listTrinhDoVanHoa == null)
            {
                throw new KeyNotFoundException($"list is empty {maNV}");
            }

            return listTrinhDoVanHoa;
        }
        public async Task<TblTrinhDoVanHoa> AddTrinhDoVanHoa(InsertTrinhDoVanHoaRequest req)
        {
            var nv = await _context.TblNhanViens.FirstOrDefaultAsync(nv => nv.Ma.Trim() == req.Ma);
            if (nv == null)
            {
                throw new KeyNotFoundException($"not found {req.Ma}");
            }
            var dateBefore = req.Tuthoigian;
            var dateAfter = req.Denthoigian;
            if (dateBefore > dateAfter)
            {
                throw new Exception("thoi gian truoc phai nho hon thoi gian sau");
            }
            var tdvh = new TblTrinhDoVanHoa
            {
                Tentruong = req.Tentruong,
                Chuyennganh = req.Chuyennganh,
                Tuthoigian = req.Tuthoigian,
                Denthoigian = req.Denthoigian,
                Hinhthucdaotao = req.Hinhthucdaotao,
                Trinhdo = req.Trinhdo,
                Ma = req.Ma
            };
            _context.TblTrinhDoVanHoas.Add(tdvh);
            await _context.SaveChangesAsync();
            return tdvh;
        }

        public async Task DeleteTrinhDoVanHoa(int id)
        {
            var trinhDoVanHoa = await _context.TblTrinhDoVanHoas.FindAsync(id);
            if (trinhDoVanHoa == null)
            {
                throw new KeyNotFoundException($"not found {id}");
            }
            _context.TblTrinhDoVanHoas.Remove(trinhDoVanHoa);
            await _context.SaveChangesAsync();
        }


        public async Task<TblTrinhDoVanHoa> UpdateTrinhDoVanHoa(UpdateTrinhDoVanHoaRequest req)
        {
            try
            {
                var trinhDoVanHoa = await _context.TblTrinhDoVanHoas.FindAsync(req.Id);
                if (trinhDoVanHoa == null)
                {
                    throw new KeyNotFoundException($"not found {req.Id}");
                }
                var dateBefore = req.Tuthoigian;
                var dateAfter = req.Denthoigian;
                if (dateBefore > dateAfter)
                {
                    throw new Exception("thoi gian truoc phai nho hon thoi gian sau");
                }
                trinhDoVanHoa.Chuyennganh = req.Chuyennganh;
                trinhDoVanHoa.Hinhthucdaotao = req.Hinhthucdaotao;
                trinhDoVanHoa.Trinhdo = req.Trinhdo;
                trinhDoVanHoa.Tentruong = req.Tentruong;
                trinhDoVanHoa.Tuthoigian = req.Tuthoigian;
                trinhDoVanHoa.Denthoigian = req.Denthoigian;
                _context.TblTrinhDoVanHoas.Update(trinhDoVanHoa);
                _context.Entry(trinhDoVanHoa).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return trinhDoVanHoa;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
