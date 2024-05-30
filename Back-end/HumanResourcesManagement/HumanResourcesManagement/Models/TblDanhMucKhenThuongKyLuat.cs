using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblDanhMucKhenThuongKyLuat
    {
        public int Id { get; set; }
        public string? Ten { get; set; }
        public string? Ma { get; set; }
        public DateTime? Ngay { get; set; }
        public string? Noidung { get; set; }
        public string? Lido { get; set; }
        public int? Khenthuongkiluat { get; set; }
    }
}
