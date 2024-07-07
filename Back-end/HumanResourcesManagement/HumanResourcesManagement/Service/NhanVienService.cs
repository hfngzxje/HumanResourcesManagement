using AutoMapper;
using HumanResourcesManagement.DTOS.Response;
using HumanResourcesManagement.Models;
using HumanResourcesManagement.Service.IService;
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

        public NhanVienService(NhanSuContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public List<TblNhanVien> GetAllNhanVien()
        {
            var nhanViens = _context.TblNhanViens.ToList();
            if (!nhanViens.Any())
            {
                throw new Exception("List không có nhân viên nào!!");
            }
            return nhanViens;
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
                    Credentials = new System.Net.NetworkCredential("buiduchung300802@gmail.com", "fskg xwkg aydk hzep"),
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
                throw new KeyNotFoundException("NhanVien with this ID does not exist.");
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
                throw new KeyNotFoundException("not found");
            }
            return nv;
        }

        public List<TblDanhMucDanToc> GetAllDanToc()
        {
            var danToc = _context.TblDanhMucDanTocs.ToList();
            if (!danToc.Any())
            {
                throw new Exception("Empty list!!");
            }
            return danToc;
        }

        public List<TblDanhMucTonGiao> GetAllTonGiao()
        {
            var tonGiao = _context.TblDanhMucTonGiaos.ToList();
            if (!tonGiao.Any())
            {
                throw new Exception("Empty list!!");
            }
            return tonGiao;
        }

        public List<TblDanhMucChucDanh> GetAllChucDanh()
        {
            var chucDanh = _context.TblDanhMucChucDanhs.ToList();
            if (!chucDanh.Any())
            {
                throw new Exception("Empty list!!");
            }
            return chucDanh;
        }

        public List<TblDanhMucNgachCongChuc> GetAllNgachCongChuc()
        {
            var nghachCongChuc = _context.TblDanhMucNgachCongChucs.ToList();
            if (!nghachCongChuc.Any())
            {
                throw new Exception("Empty list!!");
            }
            return nghachCongChuc;
        }

        public List<TblDanhMucPhongBan> GetAllPhong()
        {
            var phong = _context.TblDanhMucPhongBans.ToList();
            if (!phong.Any())
            {
                throw new Exception("Empty list!!");
            }
            return phong;
        }

        public List<TblDanhMucTo> GetAllTo()
        {
            var to = _context.TblDanhMucTos.ToList();
            if (!to.Any())
            {
                throw new Exception("Empty list!!");
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
                    throw new Exception("Khong co nhan vien nao");
                }

                return list;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message); 
            }
        }

    }
}
