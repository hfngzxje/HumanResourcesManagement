using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class InsertTrinhDoVanHoaRequest
    {
        [Required(ErrorMessage = "Tên trường không được để trống")]
        public string? Tentruong { get; set; }
        [Required(ErrorMessage = "Chuyên ngành không được để trống")]
        public int? Chuyennganh { get; set; }
        [Required(ErrorMessage = "Thời gian phải trước hiện tại")]
        public DateTime? Tuthoigian { get; set; }
        [Required(ErrorMessage = "Thời gian phải trước hiện tại")]
        public DateTime? Denthoigian { get; set; }
        [Required(ErrorMessage = "Hình thức đào tạo không được để trống")]
        public int? Hinhthucdaotao { get; set; }
        [Required(ErrorMessage = "Trình độ không được để trống")]
        public int? Trinhdo { get; set; }
        [Required(ErrorMessage = "Mã không được để trống")]
        public string Ma { get; set; } = null!;
    }
}
