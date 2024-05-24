using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class InsertDieuChuyenRequest
    {
        public string Ma { get; set; }
        [Required(ErrorMessage ="Ngay khong duoc de trong")]
        public DateTime NgayHieuLuc { get; set; }
        [Required(ErrorMessage = "Phong khong duoc de trong")]
        public int Phong { get; set; }
        [Required(ErrorMessage = "To khong duoc de trong")]
        public int To { get; set; }
        [Required(ErrorMessage = "Chuc vu khong duoc de trong")]
        public int Chucvu { get; set; }
        public string? ChiTiet { get; set; }
    }
}
