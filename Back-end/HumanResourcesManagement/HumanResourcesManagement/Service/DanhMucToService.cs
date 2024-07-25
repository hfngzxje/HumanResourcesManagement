﻿using AutoMapper;
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
        public string GenerateCodeFromName(string ten)
        {
            if (string.IsNullOrEmpty(ten))
            {
                throw new ArgumentException("Tên không được để trống", nameof(ten));
            }
            var initials = string.Concat(ten.Split(' ').Select(word => word[0])).ToUpper();
            var existingEntries = _context.TblDanhMucTos
                                           .Where(cd => cd.Ma.StartsWith(initials))
                                           .ToList();
            var existingNumbers = existingEntries
                .Select(cd => int.TryParse(cd.Ma.Substring(initials.Length), out int number) ? number : 0)
                .ToList();

            var uniqueNumber = existingNumbers.Any() ? existingNumbers.Max() + 1 : 1;

            return $"{initials}{uniqueNumber}";
        }
        // thêm mới danh mục tổ
        public async Task AddDanhMucTo(DanhMucToRequest req)
        {
            if (req == null)
            {
                throw new ArgumentNullException(nameof(req), "DanhMucTo không được để trống.");
            }
            //var exists = await _context.TblDanhMucTos.AnyAsync(cm => cm.Ma == req.Ma);
            //if (exists)
            //{
            //    throw new InvalidOperationException($"Mã '{req.Ma}' đã tồn tại.");
            //}
            var cdTen = await _context.TblDanhMucTos.FirstOrDefaultAsync(d => d.Ten == req.Ten);
            if (cdTen != null)
            {
                throw new Exception($"Tên '{req.Ten}' đã tồn tại");
            }
            var danhMucTo = _mapper.Map<TblDanhMucTo>(req);
            danhMucTo.Ma = GenerateCodeFromName(req.Ten);
            _context.TblDanhMucTos.Add(danhMucTo);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteDanhMucTo(int id)
        {
            var danhMucTo = await _context.TblDanhMucTos.FindAsync(id);
            if (danhMucTo == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy tổ với id {id}");
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
                    Idphong = dmt.IdphongNavigation.Ten,
                    Ma = dmt.Ma,
                }).ToListAsync();
            if (listDanhMucTo == null || !listDanhMucTo.Any())
            {
                throw new KeyNotFoundException($"Danh sách trống");
            }

            return listDanhMucTo;
        }
        public async Task<DanhMucToResponse> GetDanhMucToById(int id)
        {
            var danhmucto = await _context.TblDanhMucTos.FindAsync(id);
            if (danhmucto == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy tổ với id {id}");
            }

            var danhMucToResponse = await _context.TblDanhMucTos
                .Where(nv => nv.Id == id)
                .Select(cm => new DanhMucToResponse
                {
                    Id = cm.Id,
                    Ten = cm.Ten,
                    Idphong = cm.IdphongNavigation.Ten,
                    Ma = cm.Ma.Trim()
                })
                .FirstOrDefaultAsync();

            if (danhMucToResponse == null)
            {
                throw new KeyNotFoundException($"Không có dữ liệu cho id {id}");
            }

            return danhMucToResponse;
        }

        public async Task UpdateDanhMucTo(DanhMucToRequest req, int id)
        {
            try
            {
                var danhMucTo = await _context.TblDanhMucTos.FindAsync(id);
                if (danhMucTo == null)
                {
                    throw new KeyNotFoundException($"Không tìm thấy tổ với id {id}");
                }
                var cdTen = await _context.TblDanhMucTos.FirstOrDefaultAsync(d => d.Ten == req.Ten);
                if (cdTen != null)
                {
                    throw new Exception($"Tên '{req.Ten}' đã tồn tại");
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
    