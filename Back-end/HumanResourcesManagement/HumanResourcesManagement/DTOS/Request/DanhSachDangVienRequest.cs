namespace HumanResourcesManagement.DTOS.Request
{
    public class DanhSachDangVienRequest
    {
        public string searchRules { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string? GioiTinh { get; set; }
        public int? PhongBan { get; set; }
        public string? QueQuan { get; set; }

        public int? NamTuoiDang { get; set; }
    }
}
