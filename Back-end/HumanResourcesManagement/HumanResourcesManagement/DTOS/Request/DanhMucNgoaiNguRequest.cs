using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class DanhMucNgoaiNguRequest
    {
        [Required(ErrorMessage = "Ten khong duoc de trong")]
        public string? Ten { get; set; }
    }
}
