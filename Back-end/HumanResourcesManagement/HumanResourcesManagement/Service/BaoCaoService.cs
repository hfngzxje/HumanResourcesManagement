using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.Reflection;

namespace HumanResourcesManagement.Service
{
    public class BaoCaoService : IBaoCaoService
    {
        private readonly NhanSuContext _context;
        public BaoCaoService(NhanSuContext context)
        {
            _context = context;
        }


        //nhan vien
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
                Gioitinh = item.Gioitinh ? "Nam" : "Nữ",
                QueQuan = item.Quequan,
                NoiSinh = item.Noisinh,
                TamTru = item.Tamtru,
                ThuongTru = item.Thuongtru,
                TenPhong = _context.TblDanhMucPhongBans.FirstOrDefault(p => p.Id == item.Phong)?.Ten,
            }).ToList();

            return responseList;
        }
        //nhan vien excel
        public async Task<(byte[] fileContent, string fileName)> ExportBaoCaoNhanVienToExcel(DanhSachNhanVienRequest req)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "HumanResourcesManagement.Templates.BaoCao_DanhSachNhanVien.xlsx";
            using (var stream = assembly.GetManifestResourceStream(resourceName))
            {
                if (stream == null)
                {
                    throw new FileNotFoundException("Template not found as an embedded resource.");
                }
                var data = await getDanhSachNhanVien(req);
                return await ExportToExcel(stream, data, "BaoCao_DanhSachNhanVien.xlsx");
            }
        }
        //nhan vien pdf
        public async Task<(byte[] fileContent, string fileName)> ExportNhanVienToPdf(DanhSachNhanVienRequest req)
        {
            var list = await getDanhSachNhanVien(req);
            string[] headers = { "Mã", "Họ và Tên", "Ngày Sinh", "Giới Tính", "Số Điện Thoại", "Phòng Ban", "Quê Quán", "Nơi Sinh", "Thường Trú", "Tạm Trú" };
            //var rootPath = Directory.GetCurrentDirectory();
            //var templateFolderPath = Path.Combine(rootPath, "Templates");
            //var filePath = Path.Combine(templateFolderPath, "BaoCao_DanhSachNhanVien.pdf");
            return await ExportToPdf("Báo Cáo Danh Sách Nhân Viên", list, "BaoCao_DanhSachNhanVien.pdf", headers);
        }
        //dang vien
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
                Gioitinh = item.Gioitinh ? "Nam" : "Nữ",
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
        //dang vien excel
        public async Task<(byte[] fileContent, string fileName)> ExportBaoCaoDangVienToExcel(DanhSachDangVienRequest req)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "HumanResourcesManagement.Templates.BaoCao_DanhSachDangVien.xlsx";
            using (var stream = assembly.GetManifestResourceStream(resourceName))
            {
                if (stream == null)
                {
                    throw new FileNotFoundException("Template not found as an embedded resource.");
                }
                var data = await getDanhSachDangVien(req);
                return await ExportToExcel(stream, data, "BaoCao_DanhSachDangVien.xlsx");
            }
        }
        //dang vien pdf
        public async Task<(byte[] fileContent, string fileName)> ExportBaoCaoDangVienToPdf(DanhSachDangVienRequest req)
        {
            var list = await getDanhSachDangVien(req);
            string[] headers = { "Mã", "Họ và Tên", "Ngày Sinh", "Giới Tính", "Số Điện Thoại", "Ngày Vào Đảng", "Ngày Vào Đảng Chính Thức", "Phòng Ban", "Quê Quán", "Nơi Sinh", "Thường Trú", "Tạm Trú"};
            return await ExportToPdf("Báo Cáo Danh Sách Đảng Viên", list, "BaoCao_DanhSachDangVien.pdf", headers);
        }
        //nguoi than
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
                GioiTinh = (bool)r.Gioitinh ? "Nam" : "Nữ",
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
        //nguoi than excel
        public async Task<(byte[] fileContent, string fileName)> ExportBaoCaoNguoiThanToExcel(DanhSachNguoiThanRequest req)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "HumanResourcesManagement.Templates.BaoCao_DanhSachNguoiThan.xlsx";
            using (var stream = assembly.GetManifestResourceStream(resourceName))
            {
                if (stream == null)
                {
                    throw new FileNotFoundException("Template not found as an embedded resource.");
                }
                var data = await getDanhSachNguoiThan(req);
                return await ExportToExcel(stream, data, "BaoCao_DanhSachNguoiThan.xlsx");
            }
        }
        //nguoi than pdf
        public async Task<(byte[] fileContent, string fileName)> ExportBaoCaoNguoiThanToPdf(DanhSachNguoiThanRequest req)
        {
            var data = await getDanhSachNguoiThan(req);
            string[] headers = { "Tên", "Giới Tính", "Ngày Sinh", "Nghề Nghiệp", "Quan Hệ Với Nhân Viên", "Địa Chỉ", "Điện Thoại", "Mã Nhân Viên Tham Chiếu", "Tên Nhân Viên Tham Chiếu", "Khác" };
            return await ExportToPdf("Báo Cáo Danh Sách Người Thân", data, "BaoCao_DanhSachNguoiThan.pdf", headers);
        }
        //sinh nhat
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
                //PhongId = x.PhongNavigation.Id,
                TenPhong = x.PhongNavigation.Ten,
                NgaySinh = x.Ngaysinh.HasValue ? x.Ngaysinh.Value.ToString("dd/MM/yyyy") : null,
                ThangSinh = x.Ngaysinh.HasValue ? x.Ngaysinh.Value.Month : (int?)null,
                SinhNhat = x.Ngaysinh.HasValue ? new DateTime(today.Year, x.Ngaysinh.Value.Month, x.Ngaysinh.Value.Day).ToString("dd/MM/yyyy") : null,
                TinhTrang = x.Ngaysinh.HasValue ? GetTinhTrang(x.Ngaysinh.Value, today) : "Không có"
            }).ToListAsync();

            return result;
        }
        //sinh nhat excel
        public async Task<(byte[] fileContent, string fileName)> ExportBaoCaoSinhNhatToExcel(DanhSachSinhNhatRequest req)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "HumanResourcesManagement.Templates.BaoCao_DanhSachSinhNhat.xlsx";
            using (var stream = assembly.GetManifestResourceStream(resourceName))
            {
                if (stream == null)
                {
                    throw new FileNotFoundException("Template not found as an embedded resource.");
                }
                var data = await getDanhSachSinhNhat(req);
                return await ExportToExcel(stream, data, "BaoCao_DanhSachSinhNhat.xlsx");
            }
        }

        //sinh nhat pdf
        public async Task<(byte[] fileContent, string fileName)> ExportBaoCaoSinhNhatToPdf(DanhSachSinhNhatRequest req)
        {
            var data = await getDanhSachSinhNhat(req);
            string[] headers = { "Mã NV", "Họ Tên", "Phòng", "Ngày Sinh", "Tháng Sinh", "Sinh Nhật", "Tình Trạng"};
            return await ExportToPdf("Báo Cáo Danh Sách Sinh Nhật", data, "BaoCao_DanhSachSinhNhat.pdf", headers);
        }
        
        //dien chinh sach
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
                GioiTinh = (bool)r.Gioitinh ? "Nam" : "Nữ",
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
        //dien chinh sach excel
        public async Task<(byte[] fileContent, string fileName)> ExportDienChinhSachToExcel(DanhSachDienChinhSachRequest req)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "HumanResourcesManagement.Templates.BaoCao_DanhSachDienChinhSach.xlsx";
            using (var stream = assembly.GetManifestResourceStream(resourceName))
            {
                if (stream == null)
                {
                    throw new FileNotFoundException("Template not found as an embedded resource.");
                }
                var data = await getDanhSachDienChinhSach(req);
                return await ExportToExcel(stream, data, "BaoCao_DanhSachDienChinhSach.xlsx");
            }
        }
        //dien chinh sach pdf
        public async Task<(byte[] fileContent, string fileName)> ExportDienChinhSachToPdf(DanhSachDienChinhSachRequest req)
        {
            var data = await getDanhSachDienChinhSach(req);
            string[] headers = { "Mã NV", "Họ Tên", "Ngày Sinh", "Giới Tính", "Điện Thoại", "Phòng Ban", "Diện Chính Sách", "Trạng Thái"};
            return await ExportToPdf("Báo Cáo Danh Sách Diện Chính Sách", data, "BaoCao_DanhSachDienChinhSach.pdf", headers);
        }
        //nhom luong
        public async Task<IEnumerable<DanhSachNhomLuongResponse>> getDanhSachNhomLuong(DanhSachNhomLuongRequest req)
        {
            var all = await _context.TblDanhMucNhomLuongs.ToListAsync();
            if (req.NgachCongChuc.HasValue)
            {
                all = all.Where(l => l.Ngachcongchuc == req.NgachCongChuc).ToList();
            }
            if (req.BacLuong.HasValue)
            {
                all = all.Where(l => l.Bacluong == req.BacLuong).ToList();
            }

            var resp = all.Select(r => new DanhSachNhomLuongResponse
            {
                NgachCongChuc = _context.TblDanhMucNgachCongChucs.Find(r.Ngachcongchuc).Ten,
                BacLuong = (double)r.Bacluong,
                HeSoLuong = (double)r.Hesoluong,
                LuongCoBan = (double)r.Luongcoban,
                PhuCap = (double)_context.TblDanhMucChucDanhs.Find(r.Ngachcongchuc).Phucap,
                Khac = r.Ghichu
            });
            if (!resp.Any() || resp == null)
            {
                return null;
            }
            return resp;
        }
        //nhom luong excel
        public async Task<(byte[] fileContent, string fileName)> ExportNhomLuongToExcel(DanhSachNhomLuongRequest req)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "HumanResourcesManagement.Templates.BaoCao_DanhSachNhomLuong.xlsx";
            using (var stream = assembly.GetManifestResourceStream(resourceName))
            {
                if (stream == null)
                {
                    throw new FileNotFoundException("Template not found as an embedded resource.");
                }
                var data = await getDanhSachNhomLuong(req);
                return await ExportToExcel(stream, data, "BaoCao_DanhSachNhomLuong.xlsx");
            }
        }
        //nhom luong pdf
        public async Task<(byte[] fileContent, string fileName)> ExportNhomLuongToPdf(DanhSachNhomLuongRequest req)
        {
            var list = await getDanhSachNhomLuong(req);
            string[] headers = { "Chức Danh", "Bậc Lương", "Hệ Số Lương", "Lương Cơ Bản", "Phụ Cấp", "Khác" };
            return await ExportToPdf("Báo Cáo Danh Sách Nhóm Lương", list, "BaoCao_DanhSachNhomLuong.pdf", headers);
        }
        //bao hiem
        public async Task<IEnumerable<DanhSachBaoHiemResponse>> getDanhSachBaoHiem(DanhSachBaoHiemRequest req)
        {
            var all = await _context.TblNhanViens.Where(nv => nv.Bhxh != null || nv.Bhyt != null).ToListAsync();

            if (req.idPhongBan.HasValue)
            {
                all = all.Where(p => p.Phong == req.idPhongBan).ToList();
            }

            var resp = all.Select(r => new DanhSachBaoHiemResponse
            {
                MaNV = r.Ma,
                TenNV = r.Ten,
                GioiTinh = r.Gioitinh ? "Nam" : "Nữ",
                BHXH = r.Bhxh,
                BHYT = r.Bhyt,
                NgaySinh = r.Ngaysinh,
                TenPhongBan = _context.TblDanhMucPhongBans.Find(r.Phong).Ten,
            }).ToList();

            if (!resp.Any() || resp == null)
            {
                return null;
            }
            return resp;
        }
        //bao hiem excel
        public async Task<(byte[] fileContent, string fileName)> ExportBaoHiemToExcel(DanhSachBaoHiemRequest req)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "HumanResourcesManagement.Templates.BaoCao_DanhSachBaoHiem.xlsx";
            using (var stream = assembly.GetManifestResourceStream(resourceName))
            {
                if (stream == null)
                {
                    throw new FileNotFoundException("Template not found as an embedded resource.");
                }
                var data = await getDanhSachBaoHiem(req);
                return await ExportToExcel(stream, data, "BaoCao_DanhSachBaoHiem.xlsx");
            }
        }
        //bao hiem pdf
        public async Task<(byte[] fileContent, string fileName)> ExportBaoHiemToPdf(DanhSachBaoHiemRequest req)
        {
            var list = await getDanhSachBaoHiem(req);
            string[] headers = { "Mã NV", "Họ Tên", "Ngày Sinh", "BHYT", "BHXH", "Giới Tính", "Phòng Ban" };
            return await ExportToPdf("Báo Cáo Danh Sách Bảo Hiểm", list, "BaoCao_DanhSachBaoHiem.pdf", headers);
        }
        //pdf
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
        //excel
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
        //pdf 2
        private async Task<(byte[] fileContent, string fileName)> ExportToPdf2<T>(string templatePath, IEnumerable<T> data, string fileName)
        {
            using (var memoryStream = new MemoryStream())
            {
                // Load the existing PDF template
                PdfReader reader = new PdfReader(templatePath);
                PdfStamper stamper = new PdfStamper(reader, memoryStream);
                AcroFields form = stamper.AcroFields;
                PdfContentByte pdfContent = stamper.GetOverContent(1); // Assuming data is on the first page

                // Load font
                string arialFontPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Fonts), "Arial.ttf");
                BaseFont baseFont = BaseFont.CreateFont(arialFontPath, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
                Font dataFont = new Font(baseFont, 10, Font.NORMAL);

                // Start from a specific Y position for the data (modify as per your template design)
                float yPosition = 500;  // Adjust based on your existing template
                float leading = 12f;    // Line spacing

                foreach (var item in data)
                {
                    var properties = item.GetType().GetProperties();
                    string rowData = string.Join(" | ", properties.Select(p => p.GetValue(item)?.ToString() ?? string.Empty));

                    // Add the row data to the existing table
                    ColumnText.ShowTextAligned(pdfContent, Element.ALIGN_LEFT, new Phrase(rowData, dataFont), 50, yPosition, 0);
                    yPosition -= leading;

                    if (yPosition < 50) // Move to a new page if needed
                    {
                        pdfContent = stamper.GetOverContent(stamper.Writer.PageNumber + 1);
                        yPosition = 500;
                    }
                }

                stamper.Close();
                reader.Close();

                return (memoryStream.ToArray(), fileName);
            }

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
    }
}
