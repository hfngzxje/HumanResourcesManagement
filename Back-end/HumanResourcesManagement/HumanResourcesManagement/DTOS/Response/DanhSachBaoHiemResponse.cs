namespace HumanResourcesManagement.DTOS.Response
{
    public class DanhSachBaoHiemResponse
    {
        public string? MaNV { get; set; }
        public string? TenNV { get; set; }
        public DateTime? NgaySinh { get; set; }
        public string? BHYT { get; set; }
        public string? BHXH { get; set; }
        public bool? GioiTinh { get; set; }
        public int? PhongBan { get; set; }
        public string? TenPhongBan { get; set; }
    }
}
