using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class KhenThuongKyLuatRequest
    {
        [Required(ErrorMessage = "Mã không được để trống")]
        public string? Ma { get; set; }
        [Required(ErrorMessage = "Ngày không được để trống")]
        public DateTime? Ngay { get; set; }
        [Required(ErrorMessage = "Nội dung không được để trống")]
        public string? Noidung { get; set; }
        [Required(ErrorMessage = "Lí do không được để trống")]
        public string? Lido { get; set; }
        public int? Khenthuongkiluat { get; set; }
        [Required(ErrorMessage = "Tên không được để trống")]
        public int? Ten { get; set; }
    }
}
