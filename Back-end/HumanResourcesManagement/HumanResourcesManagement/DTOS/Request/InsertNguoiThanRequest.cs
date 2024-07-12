using System.ComponentModel.DataAnnotations;
using System;
namespace HumanResourcesManagement.DTOS.Request
{
    public class InsertNguoiThanRequest
    {
        [Required(ErrorMessage = "Tên không được để trống")]
        [RegularExpression(@"^[a-zA-AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(\s[a-zA-ZAÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+)*$", ErrorMessage = "Tên chỉ được chứa chữ cái.")]
        public string Ten { get; set; }
        [Required(ErrorMessage = "Giới tính không được để trống")]
        public bool? Gioitinh { get; set; }
        [Required(ErrorMessage = "Ngày sinh không được để trống")]
        public string? Ngaysinh { get; set; }
        [Required(ErrorMessage = "Quan hệ không được để trống")]
        public int? Quanhe { get; set; }
        [Required(ErrorMessage = "Nghề nghiệp không được để trống")]
        public string? Nghenghiep { get; set; }
        [Required(ErrorMessage = "Địa chỉ không được để trống")]
        public string? Diachi { get; set; }
        [Required(ErrorMessage = "Điện thoại không được để trống")]
        [RegularExpression(@"^0\d{9}$", ErrorMessage = "Điện thoại phải là dãy số bắt đầu từ 0 và có 10 ký tự")]
        public string? Dienthoai { get; set; }
        public string? Khac { get; set; }
        public string Ma { get; set; }
    }
}
