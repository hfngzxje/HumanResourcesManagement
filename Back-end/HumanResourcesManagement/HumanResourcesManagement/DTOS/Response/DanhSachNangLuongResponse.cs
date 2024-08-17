namespace HumanResourcesManagement.DTOS.Response
{
    public class DanhSachNangLuongResponse
    {
        public long Id;
        public string Mahopdong { get; set; }
        public string Manv { get; set; }
        public string TenNv { get; set; }
        public int? MaPhong { get; set; }
        public string Phong { get; set; }
        public int? MaTo { get; set; }
        public string To { get; set; }
        
        public int? Trangthai { get; set; }
    }
}
