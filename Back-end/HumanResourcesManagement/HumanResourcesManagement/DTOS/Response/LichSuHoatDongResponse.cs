namespace HumanResourcesManagement.DTOS.Response
{
    public class LichSuHoatDongResponse
    {
        public int Id { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTime? CreatedAt { get; set; }
        public string? Detail { get; set; }
    }
}
