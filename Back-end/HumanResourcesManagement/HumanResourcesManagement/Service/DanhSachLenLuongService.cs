using AutoMapper;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using iTextSharp.text.pdf;
using iTextSharp.text;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using Org.BouncyCastle.Asn1.Ocsp;
using Microsoft.AspNetCore.Server.IIS.Core;
using System.Collections.Generic;
using Newtonsoft.Json;
using OfficeOpenXml.Export.ToDataTable;
using Org.BouncyCastle.Ocsp;
using System.Reflection;

namespace HumanResourcesManagement.Service
{
    public class DanhSachLenLuongService : IDanhSachLenLuongService
    {
        private readonly NhanSuContext _context;

        public DanhSachLenLuongService(NhanSuContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DanhSachLenLuongResponse>> getDanhSachNhanVienLenLuong()
        {
            var today = DateTime.Today;
            var startOfMonth = new DateTime(today.Year, today.Month, 1);
            var endOfMonth = startOfMonth.AddMonths(1).AddDays(-1);

            // Get Mahopdong for employees with Trangthai = 1 and within the desired date range
            var maHopDongs = await _context.TblLuongs
                .Where(l => (l.Ngayketthuc >= startOfMonth && l.Ngayketthuc <= endOfMonth) || l.Ngayketthuc < today)
                .Where(l => l.Trangthai == 1)
                .Select(l => l.Mahopdong)
                .Distinct()
                .ToListAsync();

            // Get NhanVien records linked to the above Mahopdong
            var result = await _context.TblNhanViens
                .Where(nv => _context.TblHopDongs
                    .Where(hd => maHopDongs.Contains(hd.Mahopdong))
                    .Select(hd => hd.Ma)
                    .Contains(nv.Ma))
                .ToListAsync();

            // Remove NhanVien who already have a temporary Luong with Trangthai = 2
            result = result.Where(nv => !_context.TblDanhSachNangLuongs
                .Any(nl => nl.Manv == nv.Ma && nl.Trangthai == 2)).ToList();

            // Transform the results into response objects
            var resp = result
                .Select(r => new DanhSachLenLuongResponse
                {
                    MaNV = r.Ma,
                    TenNV = r.Ten,
                    TenChucVu = _context.TblDanhMucChucDanhs.FirstOrDefault(c => c.Id == r.Chucvuhientai)?.Ten,
                    TenPhongBan = _context.TblDanhMucPhongBans.FirstOrDefault(c => c.Id == r.Phong)?.Ten,
                    TenTo = _context.TblDanhMucTos.FirstOrDefault(c => c.Id == r.To)?.Ten
                })
                .ToList();

            return resp;
        }


        public async Task<int> TaoVaThemDanhSachNangLuong(InsertHoSoLuongKhongActive request)
        {
            var hopDong = await _context.TblHopDongs
                .Where(hd => hd.Mahopdong == request.Mahopdong)
                .FirstOrDefaultAsync();

            if (hopDong == null)
            {
                throw new Exception("Không tìm thấy hợp đồng với mã đã cung cấp.");
            }

            if (request.Nhomluong == null)
            {
                throw new Exception("Nhóm lương không được để trống.");
            }

            var hslMoi = new TblLuong
            {
                Mahopdong = request.Mahopdong,
                Nhomluong = request.Nhomluong,
                Phucaptrachnhiem = request.Phucaptrachnhiem,
                Phucapkhac = request.Phucapkhac,
                Tongluong = request.Tongluong,
                Thoihanlenluong = request.Thoihanlenluong,
                Ghichu = request.Ghichu,
                Trangthai = 2
            };

            _context.TblLuongs.Add(hslMoi);
            await _context.SaveChangesAsync();

            var hoSoLuongCu = await _context.TblLuongs
                .Where(l => l.Mahopdong == request.Mahopdong && l.Trangthai == 1)
                .OrderByDescending(l => l.Ngaybatdau)
                .FirstOrDefaultAsync();

            if (hoSoLuongCu == null)
            {
                throw new Exception("Không tìm thấy hồ sơ lương hiện tại cho nhân viên với mã hợp đồng đã cung cấp.");
            }

            var danhSachNangLuong = new TblDanhSachNangLuong
            {
                Mahopdong = request.Mahopdong,
                Manv = hopDong.Ma,
                Hosoluongcu = JsonConvert.SerializeObject(hoSoLuongCu, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                }),
                Hosoluongmoi = JsonConvert.SerializeObject(hslMoi, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                }),
                Trangthai = 2
            };

            _context.TblDanhSachNangLuongs.Add(danhSachNangLuong);
            await _context.SaveChangesAsync();

            return danhSachNangLuong.Id;
        }

        public async Task PheDuyetQuyetDinhLenLuong(int id, int trangThai)
        {
            var today = DateTime.Today;

            var danhSachNangLuong = await _context.TblDanhSachNangLuongs
                .FirstOrDefaultAsync(d => d.Id == id);

            if (danhSachNangLuong == null)
            {
                throw new Exception("Danh sách nâng lương không tồn tại.");
            }
            var newLuong = JsonConvert.DeserializeObject<TblLuong>(danhSachNangLuong.Hosoluongmoi);

            if (newLuong == null)
            {
                throw new Exception("Hồ sơ lương mới không hợp lệ.");
            }

            var maHopDong = danhSachNangLuong.Mahopdong;

            var oldLuongs = await _context.TblLuongs
                .Where(l => l.Mahopdong == maHopDong && l.Trangthai == 1)
                .ToListAsync();

            if (trangThai == 1)
            {
                foreach (var oldLuong in oldLuongs)
                {
                    oldLuong.Trangthai = 2;
                    _context.TblLuongs.Update(oldLuong);
                    _context.Entry(oldLuong).State = EntityState.Modified;
                }
                await _context.SaveChangesAsync();
                var newLuongs = await _context.TblLuongs
                    .Where(l => l.Mahopdong == maHopDong)
                    .OrderByDescending(l => l.Ngaybatdau)
                    .LastAsync();

                int thoihanLenLuongs = int.TryParse(newLuong.Thoihanlenluong, out int parsedValues) ? parsedValues : 0;

                newLuongs.Trangthai = 1;
                newLuongs.Ngaybatdau = DateTime.Now;
                newLuongs.Ngayketthuc = today.AddYears(thoihanLenLuongs);
                _context.TblLuongs.Update(newLuongs);
                _context.Entry(newLuongs).State = EntityState.Modified;



                newLuong.Trangthai = 1;
                newLuong.Ngaybatdau = today;

                int thoihanLenLuong = int.TryParse(newLuong.Thoihanlenluong, out int parsedValue) ? parsedValue : 0;

                if (thoihanLenLuong > 0)
                {
                    newLuong.Ngayketthuc = today.AddYears(thoihanLenLuong);
                }
                else
                {
                    throw new Exception("Thời hạn lên lương không hợp lệ.");
                }

                danhSachNangLuong.Hosoluongmoi = JsonConvert.SerializeObject(newLuong);
                danhSachNangLuong.Trangthai = 1;
                _context.TblDanhSachNangLuongs.Update(danhSachNangLuong);
                _context.Entry(danhSachNangLuong).State = EntityState.Modified;

            }
            else if (trangThai == 3)
            {
                var newLuongs = await _context.TblLuongs
                    .Where(l => l.Mahopdong == maHopDong)
                    .OrderByDescending(l => l.Ngaybatdau)
                    .LastAsync();
                _context.TblLuongs.Remove(newLuongs);

                danhSachNangLuong.Trangthai = 3;
                _context.TblDanhSachNangLuongs.Update(danhSachNangLuong);
                _context.Entry(danhSachNangLuong).State = EntityState.Modified;

            }
            else
            {
                throw new ArgumentException("Trạng thái không hợp lệ.");
            }

            await _context.SaveChangesAsync();
        }

        public async Task<(byte[] fileContent, string fileName)> ExportLenLuongToExcel()
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "HumanResourcesManagement.Templates.BaoCao_DanhSachLenLuong.xlsx";
            using (var stream = assembly.GetManifestResourceStream(resourceName))
            {
                if (stream == null)
                {
                    throw new FileNotFoundException("Template not found as an embedded resource.");
                }
                var data = await getDanhSachNhanVienLenLuong();
                return await ExportToExcel(stream, data, "BaoCao_DanhSachLenLuong.xlsx");
            }
        }
        public async Task<(byte[] fileContent, string fileName)> ExportLenLuongToPdf()
        {
            var data = await getDanhSachNhanVienLenLuong();
            string[] headers = { "Mã NV", "Tên NV", "Chức vụ", "Phòng", "Tổ" };
            return await ExportToPdf("Báo Cáo Danh Sách Lên Lương", data, "BaoCao_DanhSachLenLuong.pdf", headers);

        }

        private async Task<(byte[] fileContent, string fileName)> ExportToExcel<T>(Stream templateStream, IEnumerable<T> data, string fileName)
        {
            using (var package = new ExcelPackage(templateStream))
            {
                var worksheet = package.Workbook.Worksheets[0];
                int startRow = worksheet.Dimension?.End.Row + 1 ?? 2;
                if (data != null && data.Any())
                {
                    foreach (var item in data)
                    {
                        var properties = item.GetType().GetProperties();
                        for (int col = 0; col < properties.Length; col++)
                        {
                            worksheet.Cells[startRow, col + 1].Value = properties[col].GetValue(item, null);
                        }
                        startRow++;
                    }
                }
                var content = package.GetAsByteArray();
                return (content, fileName);
            }
        }

        private async Task<(byte[] fileContent, string fileName)> ExportToPdf<T>(string title, IEnumerable<T> data, string fileName, string[] headers)
        {
            using (var memoryStream = new MemoryStream())
            {
                Document document = new Document(PageSize.A4, 10, 10, 10, 10);
                PdfWriter writer = PdfWriter.GetInstance(document, memoryStream);
                document.Open();

                string arialFontPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Fonts), "Arial.ttf");
                BaseFont baseFont = BaseFont.CreateFont(arialFontPath, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);

                Font titleFont = new Font(baseFont, 16, Font.BOLD);
                Font headerFont = new Font(baseFont, 12, Font.BOLD);
                Font dataFont = new Font(baseFont, 10, Font.NORMAL);

                Paragraph titleParagraph = new Paragraph(new Chunk(title, titleFont));
                titleParagraph.Alignment = Element.ALIGN_CENTER;
                document.Add(titleParagraph);

                document.Add(new Paragraph("\n"));

                PdfPTable table = new PdfPTable(headers.Length);
                table.WidthPercentage = 100;

                foreach (var header in headers)
                {
                    PdfPCell cell = new PdfPCell(new Phrase(header, headerFont));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(cell);
                }

                foreach (var item in data)
                {
                    var properties = item.GetType().GetProperties();
                    foreach (var prop in properties)
                    {
                        var value = prop.GetValue(item)?.ToString() ?? string.Empty;
                        PdfPCell cell = new PdfPCell(new Phrase(value, dataFont));
                        cell.HorizontalAlignment = Element.ALIGN_CENTER;
                        table.AddCell(cell);
                    }
                }

                document.Add(table);
                document.Close();
                writer.Close();

                return (memoryStream.ToArray(), fileName);
            }
        }

        public async Task<IEnumerable<DanhSachNangLuongResponse>> GetAllAsync(int? phongId, int? chucDanhId)
        {
            var query = _context.TblDanhSachNangLuongs.Where(s => s.Trangthai == 1 || s.Trangthai == 2)
                .Join(_context.TblNhanViens,
                    nl => nl.Manv,
                    nv => nv.Ma,
                    (nl, nv) => new { nl, nv })
                .Join(_context.TblDanhMucPhongBans,
                    x => x.nv.Phong,
                    pb => pb.Id,
                    (x, pb) => new { x.nl, x.nv, pb })
                .Join(_context.TblDanhMucChucDanhs,
                    x => x.nv.To,
                    t => t.Id,
                    (x, t) => new { x.nl, x.nv, x.pb, t })
                .AsQueryable();

            // Apply filtering conditions only if parameters are provided
            if (phongId.HasValue)
            {
                query = query.Where(x => x.nv.Phong == phongId.Value);
            }

            if (chucDanhId.HasValue)
            {
                query = query.Where(x => x.nv.Chucvuhientai == chucDanhId.Value);
            }


            // Fetch the filtered or full list from the database
            var result = await query.ToListAsync();

            // Map the results to the response model
            var response = result.Select(x => new DanhSachNangLuongResponse
            {
                Id = x.nl.Id,
                Mahopdong = x.nl.Mahopdong,
                Manv = x.nl.Manv,
                Trangthai = x.nl.Trangthai,
                TenNv = x.nv.Ten,
                //MaPhong = x.nv.Phong,
                Phong = x.pb.Ten,
                //Chucdanhid = x.t.Id,
                Chucdanh = x.t.Ten
            }).ToList();

            // If no records were found, return an empty list
            return response.Any() ? response : new List<DanhSachNangLuongResponse>();
        }
        public async Task<(byte[] fileContent, string fileName)> ExportDanhSachLenLuongToExcel(int? phongId, int? chucDanhId)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "HumanResourcesManagement.Templates.BaoCao_DanhSachNangLuong.xlsx";
            using (var stream = assembly.GetManifestResourceStream(resourceName))
            {
                if (stream == null)
                {
                    throw new FileNotFoundException("Template not found as an embedded resource.");
                }
                var data = await GetAllAsync(phongId, chucDanhId);
                return await ExportToExcel(stream, data, "BaoCao_DanhSachNangLuong.xlsx");
            }
        }
        public async Task<(byte[] fileContent, string fileName)> ExportDanhSachLenLuongToPdf(int? phongId, int? chucDanhId)
        {
            var data = await GetAllAsync(phongId, chucDanhId);
            string[] headers = { "Mã NV", "Tên NV", "Mã Hợp Đồng", "Phòng", "Chức Danh","Trạng Thái" };
            return await ExportToPdf("Báo Cáo Danh Sách Lên Lương", data, "BaoCao_DanhSachNhanVienLenLuong.pdf", headers);
        }


        public async Task<DanhSachNangLuongDetailsResponse?> GetByIdAsync(int id)
        {
            var nangLuong = await _context.TblDanhSachNangLuongs
                .Where(nl => nl.Id == id)
                .Select(nl => new DanhSachNangLuongDetailsResponse
                {
                    Id = nl.Id,
                    Mahopdong = nl.Mahopdong,
                    Manv = nl.Manv,
                    Hosoluongcu = string.IsNullOrEmpty(nl.Hosoluongcu)
                        ? null
                        : JsonConvert.DeserializeObject<HoSoLuongRequest>(nl.Hosoluongcu!),
                    Hosoluongmoi = string.IsNullOrEmpty(nl.Hosoluongmoi)
                        ? null
                        : JsonConvert.DeserializeObject<HoSoLuongRequest>(nl.Hosoluongmoi!),
                    Trangthai = nl.Trangthai
                })
                .FirstOrDefaultAsync();

            return nangLuong;
        }


        public async Task<bool> DeleteAsync(int id)
        {
            var nangLuong = await _context.TblDanhSachNangLuongs.FindAsync(id);
            if (nangLuong == null)
            {
                return false;
            }

            _context.TblDanhSachNangLuongs.Remove(nangLuong);
            await _context.SaveChangesAsync();
            return true;
        }


        public async Task<IEnumerable<DanhSachNangLuongResponse>> GetAllStatus1And3Async(int? phongId, int? chucDanhId)
        {
            // Base query with filtering by Trangthai
            var query = _context.TblDanhSachNangLuongs
                .Where(s => s.Trangthai == 3 || s.Trangthai == 1)
                .Join(_context.TblNhanViens,
                    nl => nl.Manv,
                    nv => nv.Ma,
                    (nl, nv) => new { nl, nv })
                .Join(_context.TblDanhMucPhongBans,
                    x => x.nv.Phong,
                    pb => pb.Id,
                    (x, pb) => new { x.nl, x.nv, pb })
                .Join(_context.TblDanhMucChucDanhs,
                    x => x.nv.To,
                    t => t.Id,
                    (x, t) => new { x.nl, x.nv, x.pb, t })
                .AsQueryable();

            // Apply filtering conditions only if parameters are provided
            if (phongId.HasValue)
            {
                query = query.Where(x => x.nv.Phong == phongId.Value);
            }

            if (chucDanhId.HasValue)
            {
                query = query.Where(x => x.nv.Chucvuhientai == chucDanhId.Value);
            }


            // Fetch the filtered or full list from the database
            var result = await query.ToListAsync();

            // Map the results to the response model
            var response = result.Select(x => new DanhSachNangLuongResponse
            {
                Id = x.nl.Id,
                Mahopdong = x.nl.Mahopdong,
                Manv = x.nl.Manv,
                Trangthai = x.nl.Trangthai,
                TenNv = x.nv.Ten,
                //MaPhong = x.nv.Phong,
                Phong = x.pb.Ten,
                //Chucdanhid = x.t.Id,
                Chucdanh = x.t.Ten
            }).ToList();

            // Return the results, or an empty list if no records are found
            return response.Any() ? response : new List<DanhSachNangLuongResponse>();
        }
        public async Task<(byte[] fileContent, string fileName)> ExportQuyetDinhLenLuongToExcel(int? phongId, int? chucDanhId)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "HumanResourcesManagement.Templates.BaoCao_QuyetDinhLenLuong.xlsx";
            using (var stream = assembly.GetManifestResourceStream(resourceName))
            {
                if (stream == null)
                {
                    throw new FileNotFoundException("Template not found as an embedded resource.");
                }
                var data = await GetAllStatus1And3Async(phongId, chucDanhId);
                return await ExportToExcel(stream, data, "BaoCao_QuyetDinhLenLuong.xlsx");
            }
        }
        public async Task<(byte[] fileContent, string fileName)> ExportQuyetDinhLenLuongToPdf(int? phongId, int? chucDanhId)
        {
            var data = await GetAllStatus1And3Async(phongId, chucDanhId);
            string[] headers = { "Mã NV", "Tên NV", "Mã Hợp Đồng", "Phòng", "Chức Danh", "Trạng Thái" };
            return await ExportToPdf("Báo Cáo Danh Sách Lên Lương", data, "BaoCao_QuyetDinhLenLuong.pdf", headers);
        }

        public async Task<IEnumerable<DanhSachNangLuongResponse>> GetAllStatus2Async()
        {
            return await _context.TblDanhSachNangLuongs
                .Where(s => s.Trangthai == 2)
                .Select(nl => new DanhSachNangLuongResponse
                {
                    Id = nl.Id,
                    Mahopdong = nl.Mahopdong,
                    Manv = nl.Manv,
                    Trangthai = nl.Trangthai,
                    TenNv = _context.TblNhanViens
                        .Where(nv => nv.Ma == nl.Manv)
                        .Select(nv => nv.Ten)
                        .FirstOrDefault()!,
                    //MaPhong = _context.TblNhanViens
                    //    .Where(nv => nv.Ma == nl.Manv)
                    //    .Select(nv => nv.Phong)
                    //    .FirstOrDefault(),
                    Phong = _context.TblDanhMucPhongBans
                        .Where(p => p.Id == _context.TblNhanViens
                            .Where(nv => nv.Ma == nl.Manv)
                            .Select(nv => nv.Phong)
                            .FirstOrDefault())
                        .Select(p => p.Ten)
                        .FirstOrDefault()!,
                    //Chucdanhid = _context.TblNhanViens
                    //    .Where(nv => nv.Ma == nl.Manv)
                    //    .Select(nv => nv.Chucvuhientai)
                    //    .FirstOrDefault(),
                    Chucdanh = _context.TblDanhMucChucDanhs
                        .Where(t => t.Id == _context.TblNhanViens
                            .Where(nv => nv.Ma == nl.Manv)
                            .Select(nv => nv.Chucvuhientai)
                            .FirstOrDefault())
                        .Select(t => t.Ten)
                        .FirstOrDefault()!
                })
                .ToListAsync();
        }
    }
}
