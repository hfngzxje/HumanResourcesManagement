﻿namespace HumanResourcesManagement.DTOS.Response
{
    public class NhanVienResponse
    {
        public string Ma { get; set; } = null!;
        public string? Ten { get; set; }
        public short Honnhan { get; set; }
        public DateTime? Ngaysinh { get; set; }
        public bool Gioitinh { get; set; }
        public string? Dienthoai { get; set; }
        public string? Didong { get; set; }
        public string? Cmnd { get; set; }
        public DateTime? Cmndngaycap { get; set; }
        public string? Cmndnoicap { get; set; }
        public string? Noisinh { get; set; }
        public string? Quequan { get; set; }
        public string? Thuongtru { get; set; }
        public string? Tamtru { get; set; }
        public string? tenDantoc { get; set; }
        public string? tenTongiao { get; set; }
        public string? Nghenghiep { get; set; }
        public string? Chucvuhientai { get; set; }
        public DateTime? Ngaytuyendung { get; set; }
        public string? Congviecchinh { get; set; }
        public DateTime? Ngayvaoban { get; set; }
        public DateTime? Ngaychinhthuc { get; set; }
        public string? Coquantuyendung { get; set; }
        public string? Ngachcongchuc { get; set; }
        public string? Ngachcongchucnoidung { get; set; }
        public DateTime? Ngayvaodang { get; set; }
        public DateTime? Ngayvaodangchinhthuc { get; set; }
        public DateTime? Ngaynhapngu { get; set; }
        public DateTime? Ngayxuatngu { get; set; }
        public string? Quanhamcaonhat { get; set; }
        public string? Danhhieucaonhat { get; set; }
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
        public string? tenPhong { get; set; }
        public string? tenTo { get; set; }
        public byte[]? Anh { get; set; }

        public string? tenChucVu { get; set; }
        public string? tenPhongBan { get; set; }
    }
}
