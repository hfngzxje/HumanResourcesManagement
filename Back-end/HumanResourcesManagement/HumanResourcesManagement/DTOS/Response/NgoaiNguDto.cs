namespace HumanResourcesManagement.DTOS.Response
{
    public class NgoaiNguDto
    {
        public int Id { get; set; }
        public int? Ngoaingu { get; set; }
        public string? tenNgoaiNgu { get; set; }
        public DateTime? Ngaycap { get; set; }
        public string? Trinhdo { get; set; }
        public string? Noicap { get; set; }
        public string Ma { get; set; } = null!;
    }
}
