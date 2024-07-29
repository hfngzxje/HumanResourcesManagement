namespace HumanResourcesManagement.DTOS.Request
{
    public class DanhSachDienChinhSachRequest
    {
        public int? PhongBan { get; set; }
        public string? GioiTinh { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
    }
}
