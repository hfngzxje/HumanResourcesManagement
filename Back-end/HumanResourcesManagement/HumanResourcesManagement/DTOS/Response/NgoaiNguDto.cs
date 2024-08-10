namespace HumanResourcesManagement.DTOS.Response
{
    public class NgoaiNguDto
    {
        public int Id { get; set; }
        public string? Ngoaingu { get; set; }
        public int? idNgoaiNgu { get; set; }
        public DateTime? Ngaycap { get; set; }
        public string? Trinhdo { get; set; }
        public string? Noicap { get; set; }
        public string Ma { get; set; } = null!;
    }
}
