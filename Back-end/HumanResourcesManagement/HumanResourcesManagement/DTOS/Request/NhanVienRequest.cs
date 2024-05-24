using System;
using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.Models
{
    public class NhanVienRequest
    {
        [Required(ErrorMessage = "Ma is required")]
        public string Ma { get; set; } = null!;

        [Required(ErrorMessage = "Ten is required")]
        public string? Ten { get; set; }

        [Required(ErrorMessage = "Honnhan is required")]
        public short Honnhan { get; set; }

        [Required(ErrorMessage = "Ngaysinh is required")]
        [DataType(DataType.Date)]
        public DateTime? Ngaysinh { get; set; }

        [Required(ErrorMessage = "Gioitinh is required")]
        public bool Gioitinh { get; set; }

        [Phone(ErrorMessage = "Invalid phone number format")]
        public string? Dienthoai { get; set; }

        [Required(ErrorMessage = "Didong is required")]
        [Phone(ErrorMessage = "Invalid phone number format")]
        public string? Didong { get; set; }

        [Required(ErrorMessage = "Cmnd is required")]
        public string? Cmnd { get; set; }

        [Required(ErrorMessage = "Cmndngaycap is required")]
        [DataType(DataType.Date)]
        public DateTime? Cmndngaycap { get; set; }

        [Required(ErrorMessage = "Cmndnoicap is required")]
        public string? Cmndnoicap { get; set; }

        [Required(ErrorMessage = "Noisinh is required")]
        public string? Noisinh { get; set; }

        [Required(ErrorMessage = "Quequan is required")]
        public string? Quequan { get; set; }

        [Required(ErrorMessage = "Thuongtru is required")]
        public string? Thuongtru { get; set; }

        [Required(ErrorMessage = "Tamtru is required")]
        public string? Tamtru { get; set; }

        [Required(ErrorMessage = "Dantoc is required")]
        public int? Dantoc { get; set; }

        public int? Tongiao { get; set; }

        public string? Nghenghiep { get; set; }

        public int? Chucvuhientai { get; set; }

        [DataType(DataType.Date)]
        public DateTime? Ngaytuyendung { get; set; }

        public string? Congviecchinh { get; set; }

        [DataType(DataType.Date)]
        public DateTime? Ngayvaoban { get; set; }

        [DataType(DataType.Date)]
        public DateTime? Ngaychinhthuc { get; set; }

        public string? Coquantuyendung { get; set; }

        public int? Ngachcongchuc { get; set; }

        public string? Ngachcongchucnoidung { get; set; }

        [DataType(DataType.Date)]
        public DateTime? Ngayvaodang { get; set; }

        [DataType(DataType.Date)]
        public DateTime? Ngayvaodangchinhthuc { get; set; }

        [DataType(DataType.Date)]
        public DateTime? Ngaynhapngu { get; set; }

        [DataType(DataType.Date)]
        public DateTime? Ngayxuatngu { get; set; }

        public string? Quanhamcaonhat { get; set; }

        public string? Danhhieucaonhat { get; set; }

        [DataType(DataType.Date)]
        public DateTime? Ngayvaodoan { get; set; }

        public string? Noithamgia { get; set; }

        public bool Lathuongbinh { get; set; }

        public bool Laconchinhsach { get; set; }

        public string? Thuongbinh { get; set; }

        public string? Conchinhsach { get; set; }

        public string? Bhxh { get; set; }

        public string? Bhyt { get; set; }

        public string? Atm { get; set; }

        [Required(ErrorMessage = "Nganhang is required")]
        public string? Nganhang { get; set; }

        public int? Phong { get; set; }

        public int? To { get; set; }
    }
}
