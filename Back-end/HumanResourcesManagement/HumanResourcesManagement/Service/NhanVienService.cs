using AutoMapper;
using HumanResourcesManagement.DTOS.Request;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;

namespace HumanResourcesManagement.Service
{
    public class NhanVienService : INhanVienService
    {
        private readonly NhanSuContext _context;
        private readonly IMapper _mapper;

        public NhanVienService(NhanSuContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public List<NhanVienResponse> GetAllNhanVien()
        {
            var nhanViens = _context.TblNhanViens.Include(nv => nv.ToNavigation).Include(nv => nv.PhongNavigation).Include(nv => nv.ChucvuhientaiNavigation).ToList();
            
            if (!nhanViens.Any())
            {
                throw new Exception("Danh sách không có nhân viên nào!!");
            }
            var resp = _mapper.Map<List<NhanVienResponse>>(nhanViens);
            foreach (var item in resp)
            {
                var temp = nhanViens.FirstOrDefault(nv => nv.Ma == item.Ma);
                if(temp != null)
                {
                    item.tenTo = temp.ToNavigation.Ten;
                    item.tenChucVu = temp.ChucvuhientaiNavigation.Ten;
                    item.tenPhongBan = temp.PhongNavigation.Ten;
                }
            }
            return resp;
        }


        public async Task AddNhanVienAsync(NhanVienRequest request)
        {
            if (string.IsNullOrEmpty(request.Ten))
            {
                throw new Exception("Tên không được để trống");
            }

            if (_context.TblNhanViens.Any(nv => nv.Email == request.Email))
            {
                throw new Exception("Email đã tồn tại!");
            }

            if (_context.TblNhanViens.Any(nv => nv.Didong == request.Didong))
            {
                throw new Exception("Số điện thoại đã tồn tại!");
            }

            string maNhanVien = GenerateEmployeeCode(request.Ten);
            if (maNhanVien.Length > 10)
            {
                maNhanVien = maNhanVien.Substring(0, 10);
            }
            int suffix = 1;
            string originalMaNhanVien = maNhanVien;

            while (_context.TblNhanViens.Any(nv => nv.Ma == maNhanVien))
            {
                maNhanVien = originalMaNhanVien + suffix.ToString();
                suffix++;
            }
            string password = GenerateRandomPassword();

            string hashedPassword = HashPassword(password);

            var nhanVien = _mapper.Map<TblNhanVien>(request);
            nhanVien.Ma = maNhanVien;
            nhanVien.Anh = default_avatar;
            nhanVien.VaiTroId = 2;
            nhanVien.MatKhau = hashedPassword;

            _context.TblNhanViens.Add(nhanVien);
            _context.SaveChanges();

            RemoveVietnameseDiacritics(maNhanVien);

            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    UseDefaultCredentials = false,
                    Credentials = new System.Net.NetworkCredential("buiduchung300802@gmail.com", "ocpb abuz ztmj gmkc"),
                    Port = 587,
                    EnableSsl = true
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress("buiduchung300802@gmail.com"),
                    Subject = "Thông tin tài khoản nhân viên mới",
                    Body = $"Xin chào {request.Ten},<br><br>" +
                           $"Tài khoản của bạn đã được tạo thành công.<br>" +
                           $"Mã nhân viên (username): {maNhanVien}<br>" +
                           $"Mật khẩu: {password}<br><br>" +
                           "Vui lòng đổi mật khẩu sau khi đăng nhập lần đầu.<br><br>" +
                           "Trân trọng,<br>Phòng Nhân Sự",
                    IsBodyHtml = true
                };

                mailMessage.To.Add(request.Email);
                await smtpClient.SendMailAsync(mailMessage);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to send email: " + ex.Message);
            }
        }


        private string HashPassword(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }




        private static string default_avatar = "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+UrQ5geDDV56jFVn3dVDUPFe34qtAHOCn2HjG1DPnK5wQOmbaMLhz8dCoODPiE5c7FPk3+afBncR7t/hnznRIjQkWmatYeJmrR7UKKh0T7zT+efDmqfqVyNNod6VXodFivtmRAGtCADPRnll8PfMlYeDy4qc9TfDY9Daw8fkxVHnoXLzvhn5wymk1MeQWedXmO2Mjhc3fFRHmF3nRiZSMNgxzTJMWOA3rAV6dlUY9KqxY5HfJY42NhkDXTIhNxsdB2pGVVdcuhKgslBFw0aHvkYA112LAVnxlJgxVpRZ1XX8M2iTafNTIkxE18bEVjYxZa0yrTxFJMQrWJELHPVzuJdLnHUoS2IE8RiGtCY2TDFzw1AVYCnkf0Y59ZHE/wBUIkjh4eOLuzYMu8KYvguNemwzDHLnTp4WJLPfZyQbNJA+XgYetLo61fYsHWl1dfASE86IAttAQtMw3+ZCIKVrWFscGx6QtzkpmJKT5mIuoITz2ougpFQ3+W4/1wNluL9cT5QqC9B7jbAGGFApG/xtFs1fW5dlvrclWj2T4hUF6Ay47cLi5U0V3wlF/C02eW5flfBohjRH7twjDTKLOa6io7DZ+oqOymOHNRg9dyBLEQ1+4m32eMrZaTIN15cB/RFKmDo7GKY9CuXQP0TQRu8KWlydqk5vTP7pIUcEz4KwYtQEnrv9VClrcvfezl8oGpEOr/BTgo3M2YsF6RA6tzyoufMF/G/i4flqS/YAp0HYIy/QdgmoUFADkfnvV9B9A9CamH1YelT6+iZe9KxkUFYqCNX1TL2rGPQB6UBO9BH0QhISSn5kc4ntXvoU9iM0t/atf2xVZz3dIlx9PiC2F8quJ7Ov6Qq+3Fr2Iy17eGConEcj+VACAg+kkNwqe/pV/nUAsH/D7//aAAwDAQACAAMAAAAQ8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888884437JNX7w088888888888888888888888888888888886tu++++++++e90888888888888888888888888888888zc++++++++++++++sx888888888888888888888888884xe+++++++++++++++++X0888888888888888888888884l++++++++++++++++++++Y08888888888888888888884e++++++++++++++++++++++O088888888888888888884l++++++++++++++++++++++++c0888888888888888888r++++++++++++++++++++++++++d888888888888888887e++++++++++++++++++++++++++uc8888888888888888c+++++++++++/9dh92+++++++++++98888888888888884+++++++++++6M999+N6+++++++++++8888888888888883++++++++++u099999+p+++++++++++9888888888888842++++++++++1999999994++++++++++q88888888888884+++++++++++2999999996++++++++++uV888888888888v+++++++++++d99999999//wDvvvvvvvvvn/PPPPPPPPPPPPfvvvvvvvvvv/ffffffffe//vvvvvvvvvn/ADzzzzzzzzzzxH7777777777rX33333333nb77777777763zzzzzzzzzzzwX77777777777z33333333j77777777777nzzzzzzzzzzzx/77777777774nb3333336/77777777775/zzzzzzzzzzzzv777777777765X/33336l777777777777fzzzzzzzzzzzyj77777777777663zvPwV7777777777777zzzzzzzzzzzzyx7777777777777777777777777777777rzzzzzzzzzzzzzz3777777777777vPvf/AC++++++++++++9888888888888888+++++++++6+dP/APvv77v9vvvvvvvvvvvPPPPPPPPPPPPPPNPvvvvvvt7XfffffffffjU/vvvvvvuPPPPPPPPPPPPPPPPKPvvvvvuvP/ffffffffff/M/vvvvqlvPPPPPPPPPPPPPPPPP/AL7765X7333333333333/wC/++++3888888888888888888s4+++89999999999999999u++81c8888888888888888888sU+j/9999999999999999+Z89c888888888888888888888sU8899999999999999999Itc88888888888888888888888882+999999999999999wT888888888888888888888888888/T+899999999999/nfc8888888888888888888888888888sr042999999+0/fc888888888888888888888888888888888sffwgU0M98888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888/8QAHREAAgMBAQADAAAAAAAAAAAAAREAMEBQIBBggP/aAAgBAwEBPxD8UOOOOOPjOpxx8B3uPY8b1P6IMx0vIdbxHnG1xxx2jafIOw2HGNRpHaFprOYWms1isWngi08EWmw0iwWm0j2rRrXhQD6Ub3gGpx+xHWMByOPSaDaNRyv0OSPCzLKPgDQY8Yi1EQ4gNhDivAcADevgqVFFxCIvIJF+KP/EAB0RAQADAQADAQEAAAAAAAAAAAERMEAAECBQgFH/2gAIAQIBAT8Q/E8dD4R0eSPiR0dFMcnwI4L46NgfNRlTQEZ4nMGlJyBrTEbHEFsdHR0WpgLY9Ytbyw92xvKymK24silsbTK2NplbG0+cLJpn4oZXUPabnXPTzx03txvbx3us6Ojo6Ojo6LFnAY2pcJRFiUTziXsXR7uQZyvouYfJhTyugZ4xvLqODif42Dw9Nqxzxd4p4Tx7r0+Cz8SXperS6fxR/8QALBABAAEDAwMDBQADAQEBAAAAAREAITFAQVFQYXGBkaEwscHR8BBg8SCg4f/aAAgBAQABPxD/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";

        private static readonly char[] AvailableCharacters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".ToCharArray();

        public static string GenerateRandomPassword(int length = 8)
        {
            if (length <= 0) throw new ArgumentException("Password length must be greater than 0.", nameof(length));

            var random = new Random();
            return new string(Enumerable.Repeat(AvailableCharacters, length)
                                        .Select(chars => chars[random.Next(chars.Length)]).ToArray());
        }


        public static string RemoveVietnameseDiacritics(string text)
        {
            string normalizedString = text.Normalize(NormalizationForm.FormD);
            StringBuilder stringBuilder = new StringBuilder();

            foreach (char c in normalizedString)
            {
                UnicodeCategory unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
        }


        private string GenerateEmployeeCode(string fullName)
        {
            string cleanedName = RemoveVietnameseDiacritics(fullName).ToLower();
            var nameParts = cleanedName.Split(' ');
            if (nameParts.Length == 0)
            {
                throw new Exception("Tên không hợp lệ");
            }

            var lastName = nameParts.Last().ToLower();
            var initials = string.Join("", nameParts.Take(nameParts.Length - 1).Select(name => name[0].ToString().ToLower()));

            return lastName + initials;
        }



        private bool IsIdExist(string id)
        {
            return _context.TblNhanViens.Any(nv => nv.Ma == id);
        }

        public void UpdateNhanVien(string id, NhanVienRequest request)
        {
            var existingNhanVien = _context.TblNhanViens.Find(id);
            if (existingNhanVien == null)
            {
                throw new KeyNotFoundException("Không tồn tại nhân viên có ID này.");
            }

            _mapper.Map(request, existingNhanVien);
            _context.TblNhanViens.Update(existingNhanVien);
            _context.SaveChanges();
        }

        public void DeleteNhanVien(string id)
        {
            var existingNhanVien = _context.TblNhanViens.Find(id);
            if (existingNhanVien == null)
            {
                throw new KeyNotFoundException("ID này không tồn tại!!");
            }

            _context.TblNhanViens.Remove(existingNhanVien);
            _context.SaveChanges();
        }

        public TblDanhMucDanToc GetDanTocById(int id)
        {
            var danToc = _context.TblDanhMucDanTocs.Find(id);
            if (danToc == null)
            {
                throw new Exception("ID dân tộc không tồn tại");
            }
            return danToc;
        }

        public TblDanhMucNgachCongChuc GetNgachCongChucById(int id)
        {
            var congChuc = _context.TblDanhMucNgachCongChucs.Find(id);
            if (congChuc == null)
            {
                throw new Exception("ID công chức không tồn tại");
            }
            return congChuc;
        }

        public TblDanhMucTo GetToById(int id)
        {
            var to = _context.TblDanhMucTos.Find(id);
            if (to == null)
            {
                throw new Exception("ID tổ không tồn tại");
            }
            return to;
        }

        public TblDanhMucPhongBan GetPhongBanById(int id)
        {
            var phong = _context.TblDanhMucPhongBans.Find(id);
            if (phong == null)
            {
                throw new Exception("ID Phòng không tồn tại");
            }
            return phong;
        }

        public TblDanhMucTonGiao GetTonGiaoById(int id)
        {
            var tonGiao = _context.TblDanhMucTonGiaos.Find(id);
            if (tonGiao == null)
            {
                throw new Exception("ID tôn giáo không tồn tại");
            }
            return tonGiao;
        }

        public TblNhanVien GetNhanVienById(string id)
        {
            var nhanVien = _context.TblNhanViens.Find(id);
            if (nhanVien == null)
            {
                throw new Exception("ID không tồn tại!");
            }
            return nhanVien;
        }

        public TblDanhMucChucDanh GetChucVuById(int id)
        {
            var chucVu = _context.TblDanhMucChucDanhs.Find(id);
            if (chucVu == null)
            {
                throw new Exception("ID chức vụ không tồn tại");
            }
            return chucVu;
        }

        public TblNhanVien GetNhanVienByMa(string ma)
        {
            var nv = _context.TblNhanViens.Find(ma);
            if (nv == null)
            {
                throw new KeyNotFoundException($"Không tìm thấy nhân viên mã: {ma}");
            }
            return nv;
        }

        public List<TblDanhMucDanToc> GetAllDanToc()
        {
            var danToc = _context.TblDanhMucDanTocs.ToList();
            if (!danToc.Any())
            {
                throw new Exception("Danh sách dân tộc trống.");
            }
            return danToc;
        }

        public List<TblDanhMucTonGiao> GetAllTonGiao()
        {
            var tonGiao = _context.TblDanhMucTonGiaos.ToList();
            if (!tonGiao.Any())
            {
                throw new Exception("Danh mục tôn giáo trống");
            }
            return tonGiao;
        }

        public List<TblDanhMucChucDanh> GetAllChucDanh()
        {
            var chucDanh = _context.TblDanhMucChucDanhs.ToList();
            if (!chucDanh.Any())
            {
                throw new Exception("Danh sách chức danh trống.");
            }
            return chucDanh;
        }

        public List<TblDanhMucNgachCongChuc> GetAllNgachCongChuc()
        {
            var nghachCongChuc = _context.TblDanhMucNgachCongChucs.ToList();
            if (!nghachCongChuc.Any())
            {
                throw new Exception("Danh sách ngạch công chức trống.");
            }
            return nghachCongChuc;
        }

        public List<TblDanhMucPhongBan> GetAllPhong()
        {
            var phong = _context.TblDanhMucPhongBans.ToList();
            if (!phong.Any())
            {
                throw new Exception("Danh sách phòng ban trống.");
            }
            return phong;
        }

        public List<TblDanhMucTo> GetAllTo()
        {
            var to = _context.TblDanhMucTos.ToList();
            if (!to.Any())
            {
                throw new Exception("Danh sách tổ trống.");
            }
            return to;
        }

        public async Task<IEnumerable<TblNhanVien>> getNhanVienByPhongBan(int idPhong, bool? gioiTinh)
        {
            try
            {
                var query = _context.TblNhanViens.Where(n => n.Phong == idPhong);

                if (gioiTinh.HasValue)
                {
                    query = query.Where(n => n.Gioitinh == gioiTinh.Value);
                }

                var list = await query.ToListAsync();

                if (list == null || !list.Any())
                {
                    throw new Exception("Không có nhân viên nào.");
                }

                return list;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }



        public async Task<List<TblNhanVien>> SearchNhanVienAsync(string? search)
        {
            if (string.IsNullOrEmpty(search))
            {
                return await _context.TblNhanViens.ToListAsync();
            }

            return await _context.TblNhanViens
                .Where(nv => nv.Ma.Contains(search) || nv.Ten.Contains(search))
                .ToListAsync();
        }


        public async Task<NhanVienResponse> GetNhanVienByIdAsync(string id)
        {
            var nhanVien = await _context.TblNhanViens
                    .Include(nv => nv.ChucvuhientaiNavigation)
                    .Include(nv => nv.PhongNavigation)
                    .Include(nv=>nv.ToNavigation)
                    .FirstOrDefaultAsync(nv => nv.Ma == id);

            if (nhanVien == null)
            {
                throw new Exception("Mã nhân viên không tồn tại.");
            }


            var response = _mapper.Map<NhanVienResponse>(nhanVien);
            response.tenTo = nhanVien.ToNavigation.Ten;
            response.tenChucVu = nhanVien.ChucvuhientaiNavigation.Ten; 
            response.tenPhongBan = nhanVien.PhongNavigation?.Ten;
            return response;
        }
    }
}
