using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class QuanHeRequest
    {
        [Required(ErrorMessage ="Ten quan he khong duoc de trong")]
        public string Ten { get; set; }
    }
}
