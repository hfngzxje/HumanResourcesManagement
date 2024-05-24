using HumanResourcesManagement.Models;
using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class InsertNgoaiNguRequest
    {
        [Required(ErrorMessage = "Ngoai ngu khong duoc de trong")]
        public int? Ngoaingu { get; set; }
        [Required(ErrorMessage = "Ngay cap khong duoc de trong")]
        public DateTime? Ngaycap { get; set; }
        [Required(ErrorMessage = "Trinh do khong duoc de trong")]
        public string? Trinhdo { get; set; }
        [Required(ErrorMessage = "Noi cap khong duoc de trong")]
        public string? Noicap { get; set; }
        public string Ma { get; set; } = null!;
    }
}
