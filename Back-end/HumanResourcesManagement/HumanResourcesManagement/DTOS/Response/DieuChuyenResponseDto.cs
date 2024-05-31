using System;

namespace HumanResourcesManagement.DTOS.Response
{
    public class DieuChuyenResponseDto
    {
        public int Id { get; set; }
        public DateTime? NgayDieuChuyen { get; set; }
        public string? Phong { get; set; }
        public string? To { get; set; }
        public string? ChucVu { get; set; }
        public string? ChiTiet { get; set; }
    }
}
