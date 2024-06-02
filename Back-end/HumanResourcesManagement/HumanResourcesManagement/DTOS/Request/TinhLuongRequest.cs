using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class TinhLuongRequest
    {
        [Required(ErrorMessage = "Ma hop dong khong duoc de trong")]
        public string? Mahopdong { get; set; }
        [Required(ErrorMessage = "He so luong khong duoc de trong")]
        public double? Hesoluong { get; set; }
        public double? Phucaptrachnhiem { get; set; }
        public double? Phucapkhac { get; set; }
    }
}
