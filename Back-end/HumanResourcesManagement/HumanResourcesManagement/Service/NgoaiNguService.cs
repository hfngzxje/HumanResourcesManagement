using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace HumanResourcesManagement.Service
{
    public class NgoaiNguService : INgoaiNguService
    {
        private readonly NhanSuContext _context;
        public NgoaiNguService(NhanSuContext context)
        {
            _context = context;
        }

        // Lấy danh sách ngoại ngữ của nhân viên theo mã nhân viên
        public async Task<IEnumerable<NgoaiNguDto>> GetNgoaiNguByMaNV(string maNV)
        {
            if (string.IsNullOrWhiteSpace(maNV))
            {
                throw new ArgumentException("Mã nhân viên không được để trống", nameof(maNV));
            }

            var exists = await _context.TblNgoaiNgus.AnyAsync(nv => nv.Ma == maNV);
            if (!exists)
            {
                return null;
            }

            var listNgoaiNgu = await _context.TblNgoaiNgus.Where(nv => nv.Ma == maNV)
                .Select(nn => new NgoaiNguDto
                {
                    Id = nn.Id,
                    Ngoaingu = nn.Ngoaingu,
                    tenNgoaiNgu = _context.TblDanhMucNgoaiNgus.FirstOrDefault( n => n.Id == nn.Ngoaingu).Ten,
                    Ngaycap = nn.Ngaycap,
                    Trinhdo = nn.Trinhdo,
                    Noicap = nn.Noicap,
                    Ma = nn.Ma.Trim()
                }).ToListAsync();

            if (listNgoaiNgu == null || !listNgoaiNgu.Any())
            {
                return null;
            }

            return listNgoaiNgu;
        }

        public async Task<NgoaiNguDto> GetNgoaiNguById(int id)
        {
            var nn = await _context.TblNgoaiNgus.FindAsync(id);
            var resp = new NgoaiNguDto
            {
                Id = nn.Id,
                Ngoaingu = nn.Ngoaingu,
                tenNgoaiNgu = _context.TblDanhMucNgoaiNgus.Find(nn.Ngoaingu).Ten,
                Ngaycap = nn.Ngaycap,
                Trinhdo = nn.Trinhdo,
                Noicap = nn.Noicap,
                Ma = nn.Ma.Trim()
            };
            if (resp == null)
            {
                return null;
            }
            return resp;
        }

        // Thêm mới ngoại ngữ cho nhân viên
        public async Task<TblNgoaiNgu> AddNgoaiNgu(InsertNgoaiNguRequest req)
        {
            var nv = await _context.TblNhanViens.FirstOrDefaultAsync(nv => nv.Ma.Trim() == req.Ma);
            if (nv == null)
            {
                return null;
            }

            var dateDate = req.Ngaycap;
            if (dateDate > DateTime.Today)
            {
                throw new Exception("Ngày cấp phải trước hoặc trong ngày hiện tại");
            }

            var nn = new TblNgoaiNgu
            {
                Ngoaingu = req.Ngoaingu,
                Ngaycap = req.Ngaycap,
                Trinhdo = req.Trinhdo,
                Noicap = req.Noicap,
                Ma = req.Ma
            };

            _context.TblNgoaiNgus.Add(nn);
            await _context.SaveChangesAsync();
            return nn;
        }

        // Xóa ngoại ngữ theo id
        public async Task DeleteNgoaiNgu(int id)
        {
            var ngoaiNgu = await _context.TblNgoaiNgus.FindAsync(id);
            if (ngoaiNgu == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy ngoại ngữ với id {id}");
            }

            _context.TblNgoaiNgus.Remove(ngoaiNgu);
            await _context.SaveChangesAsync();
        }

        // Cập nhật thông tin ngoại ngữ
        public async Task<TblNgoaiNgu> UpdateNgoaiNgu(UpdateNgoaiNguRequest req)
        {
            try
            {
                var ngoaiNgu = await _context.TblNgoaiNgus.FindAsync(req.Id);
                if (ngoaiNgu == null)
                {
                    return null;
                }

                var dateDate = req.Ngaycap;
                if (dateDate > DateTime.Today)
                {
                    throw new Exception("Ngày cấp phải trước ngày hiện tại");
                }

                ngoaiNgu.Ngoaingu = req.Ngoaingu;
                ngoaiNgu.Ngaycap = req.Ngaycap;
                ngoaiNgu.Trinhdo = req.Trinhdo;
                ngoaiNgu.Noicap = req.Noicap;

                _context.TblNgoaiNgus.Update(ngoaiNgu);
                _context.Entry(ngoaiNgu).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return ngoaiNgu;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
