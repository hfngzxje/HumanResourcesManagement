using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class DanhMucNgoaiNguRequest
    {
        [Required(ErrorMessage = "Tên không được để trống")]
        public string? Ten { get; set; }
    }
}
