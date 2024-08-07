﻿using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace HumanResourcesManagement.Service
{
    public class BaoCaoService : IBaoCaoService
    {
        private readonly NhanSuContext _context;
        public BaoCaoService(NhanSuContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<DanhSachNhanVienResponse>> getDanhSachNhanVien(DanhSachNhanVienRequest req)
        {
            var all = await _context.TblNhanViens.ToListAsync();
            var searchRuleDiaChi = req.searchRulesDiaChi?.ToLower();
            var searchRuleNgayThang = req.searchRulesNgayThang?.ToLower();
            List<TblHopDong> listMaNv = new List<TblHopDong>();
            IEnumerable<TblNhanVien> filtered = all;

            if (req.PhongBan.HasValue)
            {
                filtered = filtered.Where(n => n.Phong == req.PhongBan.Value);
            }

            if (req.FromDate.HasValue && req.ToDate.HasValue)
            {
                if (searchRuleNgayThang == "năm sinh")
                {
                    filtered = filtered.Where(n => n.Ngaysinh.HasValue &&
                                                   n.Ngaysinh.Value.Year >= req.FromDate.Value.Year &&
                                                   n.Ngaysinh.Value.Year <= req.ToDate.Value.Year);
                }
                else if (searchRuleNgayThang == "tháng sinh")
                {
                    filtered = filtered.Where(n => n.Ngaysinh.HasValue &&
                                                   n.Ngaysinh.Value.Month >= req.FromDate.Value.Month &&
                                                   n.Ngaysinh.Value.Month <= req.ToDate.Value.Month);
                }
            }

            if (!string.IsNullOrEmpty(req.QueQuan))
            {
                if (searchRuleDiaChi == "quê quán")
                {
                    filtered = filtered.Where(n => n.Quequan != null && n.Quequan.ToLower().Contains(req.QueQuan.ToLower()));
                }
                else if (searchRuleDiaChi == "nơi sinh")
                {
                    filtered = filtered.Where(n => n.Noisinh != null && n.Noisinh.ToLower().Contains(req.QueQuan.ToLower()));
                }
                else if (searchRuleDiaChi == "thường trú")
                {
                    filtered = filtered.Where(n => n.Thuongtru != null && n.Thuongtru.ToLower().Contains(req.QueQuan.ToLower()));
                }
                else if (searchRuleDiaChi == "tạm trú")
                {
                    filtered = filtered.Where(n => n.Tamtru != null && n.Tamtru.ToLower().Contains(req.QueQuan.ToLower()));
                }
            }

            if (!string.IsNullOrEmpty(req.GioiTinh) && !req.GioiTinh.ToLower().Equals("tất cả"))
            {
                filtered = filtered.Where(n => n.Gioitinh.ToString().ToLower() == req.GioiTinh.ToLower());
            }



            var list = filtered.ToList();
            if (list == null || !list.Any())
            {
                return null;
            }

            var responseList = list.Select(item => new DanhSachNhanVienResponse
            {
                Ma = item.Ma,
                Ten = item.Ten,
                Ngaysinh = item.Ngaysinh.Value.ToString("dd/MM/yyyy"),
                Didong = item.Didong,
                Gioitinh = item.Gioitinh,
                QueQuan = item.Quequan,
                NoiSinh = item.Noisinh,
                TamTru = item.Tamtru,
                ThuongTru = item.Thuongtru,
                TenPhong = _context.TblDanhMucPhongBans.FirstOrDefault(p => p.Id == item.Phong)?.Ten,
            }).ToList();

            return responseList;
        }

        public async Task<(byte[] fileContent, string fileName)> ExportBaoCaoNhanVienToExcel(DanhSachNhanVienRequest req)
        {
            var data = await getDanhSachNhanVien(req);
            string[] headers = { "Mã", "Họ và Tên", "Ngày Sinh", "Giới Tính", "Số Điện Thoại", "Phòng Ban", "Quê Quán", "Nơi Sinh", "Thường Trú", "Tạm Trú" };
            return await ExportToExcel("DANH SÁCH BÁO CÁO NHÂN VIÊN", data, "BaoCao_DanhSachNhanVien.xlsx", headers);
        }
        public async Task<IEnumerable<DanhSachDangVienResponse>> getDanhSachDangVien(DanhSachDangVienRequest req)
        {
            var query = _context.TblNhanViens.Where(nv => nv.Ngayvaodangchinhthuc.HasValue).AsQueryable();

            if (req.PhongBan.HasValue)
            {
                query = query.Where(x => x.Phong == req.PhongBan.Value);
            }

            if (req.FromDate.HasValue && req.ToDate.HasValue)
            {
                query = query.Where(x => x.Ngaysinh >= req.FromDate.Value && x.Ngaysinh <= req.ToDate.Value);
            }

            if (req.NamVaoDang.HasValue)
            {
                query = query.Where(x => x.Ngayvaodang.HasValue && x.Ngayvaodang.Value.Year == req.NamVaoDang.Value);
            }

            if (!string.IsNullOrEmpty(req.QueQuan))
            {
                query = query.Where(x => x.Quequan != null && x.Quequan.ToLower().Contains(req.QueQuan.ToLower()));
            }

            if (req.NamTuoiDang.HasValue)
            {
                int currentYear = DateTime.Now.Year;
                query = query.Where(x => x.Ngayvaodang.HasValue &&
                                         (currentYear - x.Ngayvaodang.Value.Year) >= req.NamTuoiDang.Value);
            }

            var list = await query.ToListAsync();

            if (!list.Any())
            {
                return null;
            }

            var responseList = list.Select(item => new DanhSachDangVienResponse
            {
                Ma = item.Ma,
                Ten = item.Ten,
                Ngaysinh = item.Ngaysinh.HasValue ? item.Ngaysinh.Value.ToString("dd/MM/yyyy") : null,
                Gioitinh = item.Gioitinh,
                Didong = item.Didong,
                QueQuan = item.Quequan,
                NoiSinh = item.Noisinh,
                TamTru = item.Tamtru,
                ThuongTru = item.Thuongtru,
                TenPhong = _context.TblDanhMucPhongBans.FirstOrDefault(p => p.Id == item.Phong)?.Ten,
                NgayVaoDang = item.Ngayvaodang.Value.ToString("dd/MM/yyyy"),
                NgayVaoDangChinhThuc = item.Ngayvaodangchinhthuc.Value.ToString("dd/MM/yyyy"),
            }).ToList();

            return responseList;
        }

        public async Task<(byte[] fileContent, string fileName)> ExportBaoCaoDangVienToExcel(DanhSachDangVienRequest req)
        {
            var data = await getDanhSachDangVien(req);
            string[] headers = { "Mã", "Họ và Tên", "Ngày Sinh", "Giới Tính", "Số Điện Thoại", "Ngày Vào Đảng", "Ngày Vào Đảng Chính Thức", "Phòng Ban", "Quê Quán", "Nơi Sinh", "Thường Trú", "Tạm Trú", "Trạng Thái" };
            return await ExportToExcel("DANH SÁCH BÁO CÁO ĐẢNG VIÊN", data, "BaoCao_DanhSachDangVien.xlsx", headers);
        }

        public async Task<IEnumerable<DanhSachNguoiThanResponse>> getDanhSachNguoiThan(DanhSachNguoiThanRequest req)
        {
            var allNguoiThan = await _context.TblNguoiThans.ToListAsync();
            var allNhanVien = await _context.TblNhanViens.ToListAsync();

            if (!string.IsNullOrEmpty(req.MaNV))
            {
                allNguoiThan = (from nt in _context.TblNguoiThans
                                join nv in _context.TblNhanViens on nt.Ma equals nv.Ma
                                where (req.MaNV != null && nt.Ma.Contains(req.MaNV))
                                      || (req.MaNV != null && nv.Ten.Contains(req.MaNV))
                                select nt)
                    .ToList();
            }

            if (req.PhongBan.HasValue)
            {
                allNhanVien = allNhanVien.Where(n => n.Phong == req.PhongBan).ToList();
                var mas = allNhanVien.Select(n => n.Ma.Trim()).ToList();
                allNguoiThan = allNguoiThan.Where(r => mas.Contains(r.Ma.Trim())).ToList();
            }

            if (req.QuanHe.HasValue)
            {
                allNguoiThan = allNguoiThan.Where(n => n.Quanhe == req.QuanHe).ToList();
            }

            if (req.TuoiTu.HasValue || req.TuoiDen.HasValue)
            {
                var toDay = DateTime.Today.Year;
                allNguoiThan = allNguoiThan.Where(nt =>
                {
                    var tuoi = toDay - nt.Ngaysinh.Value.Year;
                    if (req.TuoiTu.HasValue && req.TuoiDen.HasValue)
                    {
                        return tuoi >= req.TuoiTu.Value && tuoi <= req.TuoiDen.Value;
                    }
                    else if (req.TuoiTu.HasValue)
                    {
                        return tuoi >= req.TuoiTu.Value;
                    }
                    else if (req.TuoiDen.HasValue)
                    {
                        return tuoi <= req.TuoiDen.Value;
                    }
                    return true;
                }).ToList();
            }

            if (!string.IsNullOrEmpty(req.GioiTinh) && !req.GioiTinh.ToLower().Equals("tất cả"))
            {
                allNguoiThan = allNguoiThan.Where(n => n.Gioitinh.ToString().ToLower() == req.GioiTinh.ToLower()).ToList();
            }

            var resp = allNguoiThan.Select(r => new DanhSachNguoiThanResponse
            {
                Ten = r.Ten,
                GioiTinh = (bool)r.Gioitinh,
                NgaySinh = r.Ngaysinh.Value.ToString("dd/MM/yyyy"),
                QuanHe = _context.TblDanhMucNguoiThans.Find(r.Quanhe).Ten,
                NgheNghiep = r.Nghenghiep,
                DiaChi = r.Diachi,
                DienThoai = r.Dienthoai,
                MaNV = r.Ma,
                TenNV = _context.TblNhanViens.Find(r.Ma).Ten,
                Khac = r.Khac,
            }).ToList();

            if (!resp.Any() || resp == null)
            {
                return null;
            }
            return resp;
        }

        public async Task<(byte[] fileContent, string fileName)> ExportBaoCaoNguoiThanToExcel(DanhSachNguoiThanRequest req)
        {
            var data = await getDanhSachNguoiThan(req);
            string[] headers = { "Tên", "Giới Tính", "Ngày Sinh", "Nghề Nghiệp", "Quan Hệ Với Nhân Viên", "Địa Chỉ", "Điện Thoại", "Mã Nhân Viên Tham Chiếu", "Tên Nhân Viên Tham Chiếu", "Khác" };
            return await ExportToExcel("DANH SÁCH BÁO CÁO NGƯỜI THÂN", data, "BaoCao_DanhSachNguoiThan.xlsx", headers);
        }

        private async Task<(byte[] fileContent, string fileName)> ExportToExcel<T>(string title, IEnumerable<T> data, string fileName, string[] headers)
        {
            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add($"{title}");
                worksheet.Cells[1, 1].Value = title;
                worksheet.Cells[1, 1, 1, headers.Length].Merge = true;
                worksheet.Cells[1, 1].Style.Font.Bold = true;
                worksheet.Cells[1, 1].Style.Font.Size = 16;
                worksheet.Cells[1, 1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                for (int i = 0; i < headers.Length; i++)
                {
                    worksheet.Cells[2, i + 1].Value = headers[i];
                    worksheet.Cells[2, i + 1].Style.Font.Bold = true;
                }

                int row = 3;
                foreach (var item in data)
                {
                    var properties = item.GetType().GetProperties();
                    for (int col = 0; col < properties.Length; col++)
                    {
                        worksheet.Cells[row, col + 1].Value = properties[col].GetValue(item, null);
                    }
                    row++;
                }

                worksheet.Cells.AutoFitColumns();

                var content = package.GetAsByteArray();
                return (content, fileName);
            }
        }

        public async Task<IEnumerable<DanhSachSinhNhatResponse>> getDanhSachSinhNhat(DanhSachSinhNhatRequest req)
        {
            var query = _context.TblNhanViens.AsQueryable();

            if (req.PhongBan.HasValue)
            {
                query = query.Where(x => x.Phong == req.PhongBan.Value);
            }

            if (req.StartDate.HasValue && req.EndDate.HasValue)
            {
                query = query.Where(x => x.Ngaysinh >= req.StartDate.Value && x.Ngaysinh <= req.EndDate.Value);
            }

            if (req.Thang.HasValue)
            {
                query = query.Where(x => x.Ngaysinh.Value.Month == req.Thang.Value);
            }

            if (req.Quy.HasValue)
            {
                query = query.Where(x => (x.Ngaysinh.Value.Month - 1) / 3 + 1 == req.Quy.Value);
            }

            var today = DateTime.Today;

            var result = await query.Select(x => new DanhSachSinhNhatResponse
            {
                MaNV = x.Ma,
                TenNV = x.Ten,
                PhongId = x.PhongNavigation.Id,
                TenPhong = x.PhongNavigation.Ten,
                NgaySinh = x.Ngaysinh.HasValue ? x.Ngaysinh.Value.ToString("dd/MM/yyyy") : null,
                ThangSinh = x.Ngaysinh.HasValue ? x.Ngaysinh.Value.Month : (int?)null,
                SinhNhat = x.Ngaysinh.HasValue ? new DateTime(today.Year, x.Ngaysinh.Value.Month, x.Ngaysinh.Value.Day).ToString("dd/MM/yyyy") : null,
                TinhTrang = x.Ngaysinh.HasValue ? GetTinhTrang(x.Ngaysinh.Value, today) : "Không có"
            }).ToListAsync();

            return result;
        }

        public static string GetTinhTrang(DateTime ngaySinh, DateTime today)
        {
            var currentYearBirthday = new DateTime(today.Year, ngaySinh.Month, ngaySinh.Day);
            var dayDifference = (currentYearBirthday - today).Days;

            if (dayDifference == 0)
            {
                return "Hôm nay";
            }
            else if (dayDifference > 0 && dayDifference <= 7)
            {
                return "Sắp đến";
            }
            else if (dayDifference < 0)
            {
                return "Đã qua";
            }
            else if (currentYearBirthday.Month == today.Month)
            {
                return "Trong tháng";
            }
            else if (currentYearBirthday > today)
            {
                return "Chưa đến";
            }

            return "Không có";
        }

        public async Task<IEnumerable<DanhSachDienChinhSachResponse>> getDanhSachDienChinhSach(DanhSachDienChinhSachRequest req)
        {
            var all = await _context.TblNhanViens.Where(n => n.Laconchinhsach == true).ToListAsync();

            if (!string.IsNullOrEmpty(req.GioiTinh) && !(req.GioiTinh.ToLower().Equals("tất cả")))
            {
                all = all.Where(n => n.Gioitinh.ToString().ToLower().Equals(req.GioiTinh.ToLower())).ToList();
            }

            if (req.PhongBan.HasValue)
            {
                all = all.Where(n => n.Phong == req.PhongBan).ToList();
            }

            var resp = all.Select(r => new DanhSachDienChinhSachResponse
            {
                MaNV = r.Ma,
                TenNV = r.Ten,
                GioiTinh = (bool)r.Gioitinh,
                NgaySinh = r.Ngaysinh.Value.ToString("dd/MM/yyyy"),
                DienThoai = r.Didong,
                PhongBan = _context.TblDanhMucPhongBans.FirstOrDefault(p => p.Id == r.Phong)?.Ten,
                DienChinhSach = r.Conchinhsach,
            }).ToList();

            if (resp == null || !resp.Any())
            {
                return null;
            }
            return resp;
        }

        public async Task<(byte[] fileContent, string fileName)> ExportBaoCaoDienChinhSachToExcel(DanhSachDienChinhSachRequest req)
        {
            var data = await getDanhSachDienChinhSach(req);
            string[] headers = { "Mã Nhân Viên", "Tên Nhân Viên" };
            return await ExportToExcel("DANH SÁCH BÁO CÁO DIỆN CHÍNH SÁCH", data, "BaoCao_DanhSachDienChinhSach", headers);
        }

        public async Task<IEnumerable<DanhSachNhomLuongResponse>> getDanhSachNhomLuong(DanhSachNhomLuongRequest req)
        {
            var all = await _context.TblDanhMucNhomLuongs.ToListAsync();
            if (req.ChucDanh.HasValue)
            {
                all = all.Where(l => l.Chucdanh == req.ChucDanh).ToList();
            }
            if (req.BacLuong.HasValue)
            {
                all = all.Where(l => l.Bacluong == req.BacLuong).ToList();
            }

            var resp = all.Select(r => new DanhSachNhomLuongResponse
            {
                ChucDanh = _context.TblDanhMucChucDanhs.Find(r.Chucdanh).Ten,
                BacLuong = (double)r.Bacluong,
                HeSoLuong = (double)r.Hesoluong,
                LuongCoBan = (double)r.Luongcoban,
                PhuCap = (double)_context.TblDanhMucChucDanhs.Find(r.Chucdanh).Phucap,
                Khac = r.Ghichu
            });
            if (!resp.Any() || resp == null)
            {
                return null;
            }
            return resp;
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



        public async Task<(byte[] fileContent, string fileName)> ExportNhanVienToPdf(DanhSachNhanVienRequest req)
        {
            var list = await getDanhSachNhanVien(req);
            string[] headers = { "Mã", "Họ và Tên", "Ngày Sinh", "Giới Tính", "Số Điện Thoại", "Phòng Ban", "Quê Quán", "Nơi Sinh", "Thường Trú", "Tạm Trú" };
            return await ExportToPdf("Báo Cáo Danh Sách Nhân Viên", list, "BaoCao_DanhSachNhanVien.pdf", headers);
        }

        public async Task<(byte[] fileContent, string fileName)> ExportNhomLuongToPdf(DanhSachNhomLuongRequest req)
        {
            var list = await getDanhSachNhomLuong(req);
            string[] headers = { "Chức Danh", "Bậc Lương", "Hệ Số Lương", "Lương Cơ Bản", "Phụ Cấp", "Khác" };
            return await ExportToPdf("Báo Cáo Danh Sách Nhóm Lương", list, "BaoCao_DanhSachNhomLuong.pdf", headers);
        }
    }
}
