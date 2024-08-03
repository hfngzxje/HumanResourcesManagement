namespace HumanResourcesManagement.DTOS.Request
{
    public class LichSuHoatDongRequest
    {
        public string CreatedBy { get; set; } = null!;
        public DateTime? CreatedAt { get; set; }
        public string? Action { get; set; }
    }
}
