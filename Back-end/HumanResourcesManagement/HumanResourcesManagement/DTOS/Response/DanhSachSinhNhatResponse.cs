namespace HumanResourcesManagement.DTOS.Response
{
    public class DanhSachSinhNhatResponse
    {
        public string? MaNV { get; set; }
        public string? TenNV { get; set; }
        //public int? PhongId { get; set; }
        public string? TenPhong { get; set; }
        public string? NgaySinh { get; set; }
        public int? ThangSinh { get; set; }
        public string? SinhNhat { get; set; }
        public string? TinhTrang { get; set; }
    }
}
