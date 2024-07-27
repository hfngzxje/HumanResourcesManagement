namespace HumanResourcesManagement.DTOS.Request
{
    public class DanhSachDienChinhSachRequest
    {
        public string? SearchRules { get; set; }
        public int? PhongBan { get; set; }
        public string? GioiTinh { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
    }
}
