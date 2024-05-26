namespace HumanResourcesManagement.DTOS.Response
{
    public class TrinhDoVanHoaDto
    {
        public int Id { get; set; }
        public string? Tentruong { get; set; }
        public string? Chuyennganh { get; set; }
        public DateTime? Tuthoigian { get; set; }
        public DateTime? Denthoigian { get; set; }
        public string? Hinhthucdaotao { get; set; }
        public string? Trinhdo { get; set; }
        public string Ma { get; set; } = null!;
    }
}
