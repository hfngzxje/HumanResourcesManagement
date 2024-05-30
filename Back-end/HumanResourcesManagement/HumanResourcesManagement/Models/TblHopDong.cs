using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblHopDong
    {
        public string Mahopdong { get; set; } = null!;
        public int? Loaihopdong { get; set; }
        public int? Chucdanh { get; set; }
        public double? Luongcoban { get; set; }
        public DateTime? Hopdongtungay { get; set; }
        public DateTime? Hopdongdenngay { get; set; }
        public string? Ghichu { get; set; }
        public string? Ma { get; set; }
        public int? TrangThai { get; set; }
    }
}
