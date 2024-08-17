using HumanResourcesManagement.DTOS.Request;

namespace HumanResourcesManagement.DTOS.Response
{
    public class DanhSachNangLuongDetailsResponse
    {
        public int Id { get; set; }
        public string Mahopdong { get; set; }
        public string Manv { get; set; }
        public HoSoLuongRequest? Hosoluongcu { get; set; }
        public HoSoLuongRequest? Hosoluongmoi { get; set; }
        public int? Trangthai { get; set; }
    }
}
