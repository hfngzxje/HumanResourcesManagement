namespace HumanResourcesManagement.DTOS.Request
{
    public class UpdateNgoaiNguRequest
    {
        public int Id { get; set; }
        public int? Ngoaingu { get; set; }
        public DateTime? Ngaycap { get; set; }
        public string? Trinhdo { get; set; }
        public string? Noicap { get; set; }
    }
}
