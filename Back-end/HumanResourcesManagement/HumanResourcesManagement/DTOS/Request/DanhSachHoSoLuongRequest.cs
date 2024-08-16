namespace HumanResourcesManagement.DTOS.Request
{
    public class DanhSachHoSoLuongRequest
    {
        public double? TongLuongTu { get; set; }
        public double? TongLuongDen { get; set; }
        public DateTime? NgayBatDau { get; set; }
        public DateTime? NgayKetThuc { get; set; }
        public int? TrangThai { get; set; }

    }
}
