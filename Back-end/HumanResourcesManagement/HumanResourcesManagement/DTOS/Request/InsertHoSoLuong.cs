using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class InsertHoSoLuong
    {
        [Required(ErrorMessage = "Ma hop dong khong duoc de trong")]
        public string? Mahopdong { get; set; }
        public double? Phucaptrachnhiem { get; set; }
        public double? Phucapkhac { get; set; }
        public float? TongLuong { get; set; }
        public string? Thoihanlenluong { get; set; }
        [Required(ErrorMessage = "Ngay hieu luc khong duoc de trong")]
        public DateTime? Ngayhieuluc { get; set; }
        [Required(ErrorMessage = "Ngay ket thuc khong duoc de trong")]
        public DateTime? Ngayketthuc { get; set; }
        public string? Ghichu { get; set; }

        public int? Nhomluong { get; set; }
    }
}
