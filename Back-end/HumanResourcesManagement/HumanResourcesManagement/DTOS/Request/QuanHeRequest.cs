using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class QuanHeRequest
    {
        [Required(ErrorMessage = "Tên quan hệ không được để trống")]
        public string Ten { get; set; }
    }


}
