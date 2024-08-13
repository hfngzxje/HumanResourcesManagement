namespace HumanResourcesManagement.DTOS.Response
{
    public class TrinhDoVanHoaDto
    {
        public int Id { get; set; }
        public string? Tentruong { get; set; }
        public int? Chuyennganh { get; set; }
        public string? tenChuyenNganh { get; set; }
        public DateTime? Tuthoigian { get; set; }
        public DateTime? Denthoigian { get; set; }
        public int? Hinhthucdaotao { get; set; }
        public string? tenHinhThuc { get; set; }
        public int? Trinhdo { get; set; }
        public string? tenTrinhDo { get; set; }
        public string Ma { get; set; } = null!;
    }
}
