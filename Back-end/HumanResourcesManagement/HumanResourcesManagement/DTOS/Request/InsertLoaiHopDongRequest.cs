using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class InsertLoaiHopDongRequest
    {
        public string? Ma { get; set; }
        [Required(ErrorMessage = "Ten khong duoc de trong")]
        public string? Ten { get; set; }
    }
}
