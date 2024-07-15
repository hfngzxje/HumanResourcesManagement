﻿using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

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
                throw new InvalidOperationException("Không có dữ liệu");
            }

            var listTrinhDoVanHoa = await _context.TblTrinhDoVanHoas.Where(nv => nv.Ma == maNV)
                .Select(tdvh => new TrinhDoVanHoaDto
                {
                    Id = tdvh.Id,
                    Tentruong = tdvh.Tentruong,
                    Chuyennganh = tdvh.ChuyennganhNavigation.Ten,
                    Tuthoigian = tdvh.Tuthoigian,
                    Denthoigian = tdvh.Denthoigian,
                    Hinhthucdaotao = tdvh.HinhthucdaotaoNavigation.Ten,
                    Trinhdo = tdvh.TrinhdoNavigation.Ten,
                    Ma = tdvh.Ma.Trim()
                }).ToListAsync();

            if (listTrinhDoVanHoa == null || !listTrinhDoVanHoa.Any())
            {
                throw new KeyNotFoundException($"Danh sách trống {maNV}");
            }

            return listTrinhDoVanHoa;
        }

        public async Task<TblTrinhDoVanHoa> AddTrinhDoVanHoa(InsertTrinhDoVanHoaRequest req)
        {
            var nv = await _context.TblNhanViens.FirstOrDefaultAsync(nv => nv.Ma.Trim() == req.Ma);
            if (nv == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy nhân viên với mã {req.Ma}");
            }

            if (req.Tuthoigian > req.Denthoigian)
            {
                throw new Exception("Thời gian bắt đầu phải trước thời gian kết thúc");
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
                throw new KeyNotFoundException($"Không tìm thấy trình độ văn hóa với id {id}");
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
                    throw new KeyNotFoundException($"Không tìm thấy trình độ văn hóa với id {req.Id}");
                }

                if (req.Tuthoigian > req.Denthoigian)
                {
                    throw new Exception("Thời gian bắt đầu phải trước thời gian kết thúc");
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
