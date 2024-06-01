using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class DanhMucToRequest
    {
        [Required(ErrorMessage = "Ma khong duoc de trong")]
        public string? Ma { get; set; }
        [Required(ErrorMessage = "Ten khong duoc de trong")]
        public string? Ten { get; set; }
        [Required(ErrorMessage = "Idphong khong duoc de trong")]
        public int Idphong { get; set; }
    }
}
