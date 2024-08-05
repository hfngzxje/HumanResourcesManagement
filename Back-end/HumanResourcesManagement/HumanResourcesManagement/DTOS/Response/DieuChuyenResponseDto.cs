using System;

namespace HumanResourcesManagement.DTOS.Response
{
    public class DieuChuyenResponseDto
    {
        public int Id { get; set; }
        public int? IdDieuChuyen { get; set; }
        public string Ma { get; set; }
        public string? NgayDieuChuyen { get; set; }
        public string? tuPhong { get; set; }
        public string? denPhong { get; set; }
        public string? tuTo { get; set; }
        public string? denTo { get; set; }
        public string? tuChucVu { get; set; }
        public string? denChucVu { get; set; }
        public string? ChiTiet { get; set; }
        public int? trangThai { get; set; }
    }
}
