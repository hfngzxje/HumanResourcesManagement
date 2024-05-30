using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class ChuyenMonRequest
    {
        [Required(ErrorMessage = "Ma khong duoc de trong")]
        public string? Ma { get; set; }
        [Required(ErrorMessage = "Ten khong duoc de trong")]
        public string? Ten { get; set; }
    }
}
