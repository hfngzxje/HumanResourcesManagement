namespace HumanResourcesManagement.DTOS.Response
{
    public class LichSuDieuChuyenResponse
    {
        public int Id { get; set; }
        public int? IdDieuChuyen { get; set; }
        public string? Ma { get; set; }
        public DateTime? NgayDieuChuyen { get; set; }
        public int? IdPhongCu { get; set; }
        public string? TenPhongCu { get; set; }
        public int? IdPhongMoi { get; set; }
        public string? TenPhongMoi { get; set; }
        public int? IdToCu { get; set; }
        public string? TenToCu { get; set; }
        public int? IdToMoi { get; set; }
        public string? TenToMoi { get; set; }
        public int? IdChucVuCu { get; set; }
        public string? TenChucVuCu { get; set; }
        public int? IdChucVuMoi { get; set; }
        public string? TenChucVuMoi { get; set; }
        public string? GhiChu { get; set; }
        public short? TrangThai { get; set; }
    }
}
