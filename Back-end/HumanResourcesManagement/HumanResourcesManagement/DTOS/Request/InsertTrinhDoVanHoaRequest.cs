using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class InsertTrinhDoVanHoaRequest
    {
        [Required(ErrorMessage = "Ten truong khong duoc de trong")]
        public string? Tentruong { get; set; }
        [Required(ErrorMessage = "Chuyen nganh khong duoc de trong")]
        public int? Chuyennganh { get; set; }
        [Required(ErrorMessage = "Thoi gian khong duoc de trong")]
        public DateTime? Tuthoigian { get; set; }
        [Required(ErrorMessage = "Thoi gian khong duoc de trong")]
        public DateTime? Denthoigian { get; set; }
        [Required(ErrorMessage = "Hinh thuc dao tao khong duoc de trong")]
        public int? Hinhthucdaotao { get; set; }
        [Required(ErrorMessage = "Trinh Do khong duoc de trong")]
        public int? Trinhdo { get; set; }
        public string Ma { get; set; } = null!;
    }
}
