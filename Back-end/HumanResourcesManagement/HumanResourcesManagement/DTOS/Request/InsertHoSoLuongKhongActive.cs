using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class InsertHoSoLuongKhongActive
    {
        public string? Mahopdong { get; set; }
        public double? Phucaptrachnhiem { get; set; }
        public double? Phucapkhac { get; set; }
        public float? Tongluong { get; set; }
        public string? Thoihanlenluong { get; set; }
        public string? Ghichu { get; set; }
        public double BacLuong { get; set; }
        public double HeSoLuong { get; set; }
        public int? Nhomluong { get; set; }
    }
}
