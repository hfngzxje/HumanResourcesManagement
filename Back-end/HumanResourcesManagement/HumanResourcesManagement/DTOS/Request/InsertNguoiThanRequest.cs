using System.ComponentModel.DataAnnotations;
using System;
namespace HumanResourcesManagement.DTOS.Request
{
    public class InsertNguoiThanRequest
    {
        [Required(ErrorMessage ="Ten khong duoc de trong")]
        public string Ten { get; set; }
        [Required(ErrorMessage = "Gioi tinh khong duoc de trong")]
        public bool? Gioitinh { get; set; }
        [Required(ErrorMessage = "Ngay sinh khong duoc de trong")]
        public string? Ngaysinh { get; set; }
        [Required(ErrorMessage = "Quan he khong duoc de trong")]
        public int? Quanhe { get; set; }
        [Required(ErrorMessage = "Nghe nghiep khong duoc de trong")]
        public string? Nghenghiep { get; set; }
        [Required(ErrorMessage = "Dia chi khong duoc de trong")]
        public string? Diachi { get; set; }
        [Required(ErrorMessage = "Dien thoai khong duoc de trong")]
        public string? Dienthoai { get; set; }
        public string? Khac { get; set; }
        public string Ma { get; set; }
    }
}
