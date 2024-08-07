namespace HumanResourcesManagement.DTOS.Request
{
    public class DanhSachNhanVienRequest
    {
        public string? searchRulesDiaChi { get; set; }
        public string? searchRulesNgayThang { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string? GioiTinh { get; set; }
        public int? PhongBan { get; set; }
        public string? QueQuan { get; set; }
    }
}