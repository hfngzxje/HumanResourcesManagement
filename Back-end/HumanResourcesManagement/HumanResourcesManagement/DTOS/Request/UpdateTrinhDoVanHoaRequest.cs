namespace HumanResourcesManagement.DTOS.Request
{
    public class UpdateTrinhDoVanHoaRequest
    {
        public int Id { get; set; }
        public string? Tentruong { get; set; }
        public int? Chuyennganh { get; set; }
        public DateTime? Tuthoigian { get; set; }
        public DateTime? Denthoigian { get; set; }
        public int? Hinhthucdaotao { get; set; }
        public int? Trinhdo { get; set; }
    }
}
