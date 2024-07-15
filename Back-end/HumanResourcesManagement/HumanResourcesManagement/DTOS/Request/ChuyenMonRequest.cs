using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class ChuyenMonRequest
    {
        [Required(ErrorMessage = "Mã không được để trống")]
        public string? Ma { get; set; }
        [Required(ErrorMessage = "Tên không được để trống")]
        public string? Ten { get; set; }
    }
}
