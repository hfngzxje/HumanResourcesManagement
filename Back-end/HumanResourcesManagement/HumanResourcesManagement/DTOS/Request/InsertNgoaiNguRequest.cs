using HumanResourcesManagement.Models;
using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class InsertNgoaiNguRequest
    {
        [Required(ErrorMessage = "Ngoại ngữ không được để trống")]
        public int? Ngoaingu { get; set; }
        [Required(ErrorMessage = "Ngày cấp không được để trống")]
        public DateTime? Ngaycap { get; set; }
        [Required(ErrorMessage = "Trình độ không được để trống")]
        public string? Trinhdo { get; set; }
        [Required(ErrorMessage = "Nơi cấp không được để trống")]
        public string? Noicap { get; set; }
        [Required(ErrorMessage = "Mã không được để trống")]
        public string Ma { get; set; } = null!;
    }
}
