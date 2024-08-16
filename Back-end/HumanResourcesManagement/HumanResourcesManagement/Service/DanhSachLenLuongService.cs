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

namespace HumanResourcesManagement.Service
{
    public class DanhSachLenLuongService : IDanhSachLenLuongService
    {
        private readonly NhanSuContext _context;

        public DanhSachLenLuongService(NhanSuContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DanhSachLenLuongResponse>> getDanhSachNhanVienLenLuong(DanhSachLenLuongRequest req)
        {
            var today = DateTime.Today;
            var startOfMonth = new DateTime(today.Year, today.Month, 1);
            var endOfMonth = startOfMonth.AddMonths(1).AddDays(-1);

            var maHopDongs = await _context.TblLuongs
                .Where(l => (l.Ngayketthuc >= startOfMonth && l.Ngayketthuc <= endOfMonth) || l.Ngayketthuc < today)
                .Where(l => l.Trangthai == 1)
                .Select(l => l.Mahopdong)
                .Distinct()
                .ToListAsync();

            var result = await _context.TblNhanViens
                .Where(nv => _context.TblHopDongs
                    .Where(hd => maHopDongs.Contains(hd.Mahopdong))
                    .Select(hd => hd.Ma)
                    .Contains(nv.Ma))
                .ToListAsync();

            if (req.PhongBan.HasValue)
            {
                result = result.Where(nv => nv.Phong == req.PhongBan).ToList();
            }
            if (req.Chucvuhientai.HasValue)
            {
                result = result.Where(nv => nv.Chucvuhientai == req.Chucvuhientai).ToList();
            }
            if (req.To.HasValue)
            {
                result = result.Where(nv => nv.To == req.To).ToList();
            }

            var resp = result
                .Where(nv =>
                {
                    var nangLuongRecords = _context.TblDanhSachNangLuongs
                        .Where(nl => nl.Manv == nv.Ma)
                        .ToList();

                    if (!nangLuongRecords.Any())
                    {
                        return true;
                    }

                    var allRecordsHaveStatusTwo = nangLuongRecords.All(nl => nl.Trangthai == 2);
                    return allRecordsHaveStatusTwo;
                })
                .Select(r => new DanhSachLenLuongResponse
                {
                    MaNV = r.Ma,
                    TenNV = r.Ten,
                    TenChucVu = _context.TblDanhMucChucDanhs.FirstOrDefault(c => c.Id == r.Chucvuhientai)?.Ten,
                    TenPhongBan = _context.TblDanhMucPhongBans.FirstOrDefault(c => c.Id == r.Phong)?.Ten,
                    TenTo = _context.TblDanhMucTos.FirstOrDefault(c => c.Id == r.To)?.Ten
                })
                .ToList();

            if (!resp.Any())
            {
                return null;
            }

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
                }
                await _context.SaveChangesAsync();

                var newLuongs = await _context.TblLuongs
                    .Where(l => l.Mahopdong == maHopDong)
                    .OrderByDescending(l => l.Ngaybatdau)
                    .FirstOrDefaultAsync();
                newLuongs.Trangthai = 1;
                _context.TblLuongs.Update(newLuongs);



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
            }
            else if (trangThai == 2) 
            {
                _context.TblLuongs.Remove(newLuong);

                danhSachNangLuong.Trangthai = 3;
                _context.TblDanhSachNangLuongs.Update(danhSachNangLuong);
            }
            else
            {
                throw new ArgumentException("Trạng thái không hợp lệ.");
            }

            await _context.SaveChangesAsync();
        }







        public async Task<(byte[] fileContent, string fileName)> ExportLenLuongToExcel(DanhSachLenLuongRequest req)
        {
            var data = await getDanhSachNhanVienLenLuong(req);
            var templatePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..", "..", "..", "Templates", "BaoCao_DanhSachLenLuong.xlsx");
            var fullPath = Path.GetFullPath(templatePath);
            return await ExportToExcel(fullPath, data, "BaoCao_DanhSachLenLuong.xlsx");
        }
        public async Task<(byte[] fileContent, string fileName)> ExportLenLuongToPdf(DanhSachLenLuongRequest req)
        {
            var data = await getDanhSachNhanVienLenLuong(req);
            string[] headers = { "Mã NV","Tên NV","Chức vụ","Phòng","Tổ" };
            return await ExportToPdf("Báo Cáo Danh Sách Lên Lương", data, "BaoCao_DanhSachLenLuong.pdf", headers);

        }

        private async Task<(byte[] fileContent, string fileName)> ExportToExcel<T>(string templatePath, IEnumerable<T> data, string fileName)
        {
            // Load the existing Excel template
            using (var package = new ExcelPackage(new FileInfo(templatePath)))
            {
                var worksheet = package.Workbook.Worksheets[0]; // Assumes you are using the first worksheet

                // Calculate start row. If worksheet is empty, start at row 2 (assuming row 1 is for headers)
                int startRow = worksheet.Dimension?.End.Row + 1 ?? 2;

                foreach (var item in data)
                {
                    var properties = item.GetType().GetProperties();
                    for (int col = 0; col < properties.Length; col++)
                    {
                        worksheet.Cells[startRow, col + 1].Value = properties[col].GetValue(item, null);
                    }
                    startRow++;
                }
                //worksheet.Cells.AutoFitColumns();

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

    }
}
