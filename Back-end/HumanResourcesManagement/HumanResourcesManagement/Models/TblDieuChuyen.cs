using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblDieuChuyen
    {
        public int Id { get; set; }
        public string Manv { get; set; } = null!;
        public DateTime? Ngayhieuluc { get; set; }
        public int? Phong { get; set; }
        public int? To { get; set; }
        public int? Chucvu { get; set; }
        public string? Chitiet { get; set; }
    }
}
