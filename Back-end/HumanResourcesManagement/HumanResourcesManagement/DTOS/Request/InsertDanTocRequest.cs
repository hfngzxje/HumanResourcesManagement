using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class InsertDanTocRequest
    {
        [Required(ErrorMessage = "Ten khong duoc de trong")]
        public string Ten { get; set; }
    }
}
