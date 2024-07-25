namespace HumanResourcesManagement.DTOS.Request
{
    public class DanhSachSinhNhatRequest
    {
        public string? SearchRules { get; set; }
        public int? Phong { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set;}
    }
}
