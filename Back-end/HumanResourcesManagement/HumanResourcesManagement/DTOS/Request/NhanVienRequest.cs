using System;
using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.Models
{
    public class NhanVienRequest
    {
        public string? Ten { get; set; }

        public short Honnhan { get; set; }

        [DataType(DataType.Date)]
        public DateTime? Ngaysinh { get; set; }

        public bool Gioitinh { get; set; }

        [Phone(ErrorMessage = "Invalid phone number format")]
        public string? Didong { get; set; }

        public string? Cmnd { get; set; }

        [DataType(DataType.Date)]
        public DateTime? Cmndngaycap { get; set; }

        public string? Cmndnoicap { get; set; }
        public string? Noisinh { get; set; }

        public string? Quequan { get; set; }

        public string? Thuongtru { get; set; }

        public string? Tamtru { get; set; }

        public int? Dantoc { get; set; }
        
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string? Email { get; set; }

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

        public string? Nganhang { get; set; }

        public int? Phong { get; set; }

        public int? To { get; set; }
    }
}
