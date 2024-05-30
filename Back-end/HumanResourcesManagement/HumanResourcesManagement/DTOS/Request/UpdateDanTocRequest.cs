using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class UpdateDanTocRequest
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Ten khong duoc de trong")]
        public string Ten { get; set; }
    }
}
