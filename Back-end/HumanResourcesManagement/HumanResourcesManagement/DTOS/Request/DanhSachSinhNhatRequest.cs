namespace HumanResourcesManagement.DTOS.Request
{
    public class DanhSachSinhNhatRequest
    {
        public int? PhongBan { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set;}
        public int? Thang { get; set; }
        public int? Quy { get; set; }
    }
}
