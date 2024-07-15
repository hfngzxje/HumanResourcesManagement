using System.ComponentModel.DataAnnotations;
namespace HumanResourcesManagement.DTOS.Request
{
    public class UpdateNguoiThanRequest
    {
        public int Id { get; set; }
        [RegularExpression(@"^[a-zA-AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(\s[a-zA-ZAÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+)*$", ErrorMessage = "Tên chỉ được chứa chữ cái.")]
        public string Ten { get; set; }
        public bool? Gioitinh { get; set; }
        public string? Ngaysinh { get; set; }
        public int? Quanhe { get; set; }
        public string? Nghenghiep { get; set; }
        public string? Diachi { get; set; }
        [RegularExpression(@"^0\d{9}$", ErrorMessage = "Điện thoại phải là dãy số bắt đầu từ 0 và có 10 ký tự")]
        public string? Dienthoai { get; set; }
        public string? Khac { get; set; }
    }
}
