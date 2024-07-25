using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class DanhMucToRequest
    {
        //[Required(ErrorMessage = "Mã không được để trống")]
        //public string? Ma { get; set; }
        [Required(ErrorMessage = "Tên không được để trống")]
        public string? Ten { get; set; }
        [Required(ErrorMessage = "Idphong không được để trống")]
        public int Idphong { get; set; }
    }
}
