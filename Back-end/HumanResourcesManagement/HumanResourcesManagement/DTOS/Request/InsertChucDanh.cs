using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class InsertChucDanh
    {
        [Required(ErrorMessage = "Ma khong duoc de trong")]
        public string? Ma { get; set; }
        [Required(ErrorMessage = "Ten khong duoc de trong")]
        public string? Ten { get; set; }
        public double? Phucap { get; set; }
    }
}
