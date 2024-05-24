using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Response
{
    public class HopDongResponse
    {
        public string Mahopdong { get; set; } = null!;
        public string? Loaihopdong { get; set; }
        public string? Chucdanh { get; set; }
        public double? Luongcoban { get; set; }
        public DateTime? Hopdongtungay { get; set; }
        public DateTime? Hopdongdenngay { get; set; }
        public string? Ghichu { get; set; }
        public string? Ma { get; set; }
    }
}
