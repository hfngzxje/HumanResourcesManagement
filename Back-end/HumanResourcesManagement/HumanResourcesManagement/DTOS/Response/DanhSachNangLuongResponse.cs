namespace HumanResourcesManagement.DTOS.Response
{
    public class DanhSachNangLuongResponse
    {

        public int Id { get; set; }
        public string Mahopdong { get; set; }
        public string Manv { get; set; }
        public string TenNv { get; set; }
        public int? MaPhong { get; set; }
        public string Phong { get; set; }
        public int? Chucdanhid { get; set; }
        public string Chucdanh { get; set; }
        public int? Trangthai { get; set; }
    }
}
