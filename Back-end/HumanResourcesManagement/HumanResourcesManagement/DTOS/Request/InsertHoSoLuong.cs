using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class InsertHoSoLuong
    {
        [Required(ErrorMessage = "Ma hop dong khong duoc de trong")]
        public string? Mahopdong { get; set; }
        public double? Phucaptrachnhiem { get; set; }
        public double? Phucapkhac { get; set; }
        public float? Tongluong { get; set; }
        public string? Thoihanlenluong { get; set; }
        public string? Ghichu { get; set; }

        public int? Nhomluong { get; set; }
    }
}
