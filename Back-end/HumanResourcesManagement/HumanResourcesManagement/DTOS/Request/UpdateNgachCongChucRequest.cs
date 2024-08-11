using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class UpdateNgachCongChucRequest
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Tên không được để trống")]
        public string Ten { get; set; }
    }
}
