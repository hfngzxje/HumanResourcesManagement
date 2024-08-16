namespace HumanResourcesManagement.DTOS.Request
{
    public class DanhSachNangLuongRequest
    {
        public string Mahopdong { get; set; } = null!;
        public HoSoLuongRequest Hosoluongmoi { get; set; }                                                                                                                                                  
    }

    public class HoSoLuongRequest
    {
        public string? Mahopdong { get; set; }
        public double? Phucaptrachnhiem { get; set; }
        public double? Phucapkhac { get; set; }
        public double? Tongluong { get; set; }
        public string? Thoihanlenluong { get; set; }
        public string? Ghichu { get; set; }
        public int? Nhomluong { get; set; }
        public int? Trangthai { get; set; }
        public DateTime? Ngaybatdau { get; set; }
        public DateTime? Ngayketthuc { get; set; }
    }
}
