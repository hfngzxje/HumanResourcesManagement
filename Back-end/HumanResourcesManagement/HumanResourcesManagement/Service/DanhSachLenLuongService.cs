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

            var resp = result.Select(r => new DanhSachLenLuongResponse
            {
                MaNV = r.Ma,
                TenNV = r.Ten,
                TenChucVu = _context.TblDanhMucChucDanhs.FirstOrDefault(c => c.Id == r.Phong).Ten,
                TenPhongBan = _context.TblDanhMucPhongBans.FirstOrDefault(c => c.Id == r.Phong).Ten,
                TenTo = _context.TblDanhMucTos.FirstOrDefault(c => c.Id == r.Phong).Ten
            });
            if(!resp.Any() || resp == null)
            {
                return null;
            }
            return resp;
        }

        public void TaoMoiHoSoLuongKhongActivce(InsertHoSoLuongKhongActive request)
        {
            var hopDong = _context.TblHopDongs.FirstOrDefault(x => x.Mahopdong == request.Mahopdong);
            if (hopDong == null)
            {
                throw new Exception("Không có mã hợp đồng hợp lệ.");
            }

            if (request.Nhomluong == null)
            {
                throw new Exception("Nhóm lương không được để trống.");
            }

            var hsl = new TblLuong
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

            _context.TblLuongs.Add(hsl);
            _context.SaveChanges();
        }

        public void PheDuyetQuyetDinhLenLuong(int id)
        {
            var today = DateTime.Today;

            var newLuong = _context.TblLuongs
                .FirstOrDefault(l => l.Id == id); 

            if (newLuong == null)
            {
                throw new Exception("Hồ sơ lương không tồn tại.");
            }

            var maHopDong = newLuong.Mahopdong;

            var oldLuongs = _context.TblLuongs
                .Where(l => l.Mahopdong == maHopDong && l.Trangthai == 1) 
                .ToList();

            foreach (var oldLuong in oldLuongs)
            {
                oldLuong.Trangthai = 2;
                _context.TblLuongs.Update(oldLuong);
            }

            newLuong.Trangthai = 1;
            newLuong.Ngaybatdau = today; 

            int thoihanLenLuong = int.TryParse(newLuong.Thoihanlenluong, out int parsedValue) ? parsedValue : 0;

            if (newLuong.Ngaybatdau.HasValue)
            {
                newLuong.Ngayketthuc = newLuong.Ngaybatdau.Value.AddYears(thoihanLenLuong); 
            }
            else
            {
                throw new Exception("Ngày bắt đầu không được đặt.");
            }

            _context.TblLuongs.Update(newLuong);

            _context.SaveChanges();
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
