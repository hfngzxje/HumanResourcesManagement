﻿namespace HumanResourcesManagement.DTOS.Request
{
    public class UpdateNguoiThanRequest
    {
        public int Id { get; set; }
        public string? Ten { get; set; }
        public bool? Gioitinh { get; set; }
        public string? Ngaysinh { get; set; }
        public int? Quanhe { get; set; }
        public string? Nghenghiep { get; set; }
        public string? Diachi { get; set; }
        public string? Dienthoai { get; set; }
        public string? Khac { get; set; }
    }
}
