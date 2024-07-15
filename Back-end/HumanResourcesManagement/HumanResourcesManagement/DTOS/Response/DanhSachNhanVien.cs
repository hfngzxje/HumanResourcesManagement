namespace HumanResourcesManagement.DTOS.Response
{
    public class DanhSachNhanVien
    {
        public string Ma { get; set; }
        public string Ten { get; set; }
        public DateTime? Ngaysinh { get; set; }
        public bool Gioitinh { get; set; }
        public string? Didong { get; set; }
        public string? tenPhong { get; set; }
    }
}