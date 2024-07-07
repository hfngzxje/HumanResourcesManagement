using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblKhenThuongKyLuat
    {
        public int Id { get; set; }
        public string? Ma { get; set; }
        public DateTime? Ngay { get; set; }
        public string? Noidung { get; set; }
        public string? Lido { get; set; }
        public int? Khenthuongkiluat { get; set; }
        public int? Ten { get; set; }

        public virtual TblNhanVien? MaNavigation { get; set; }
        public virtual TblDanhMucKhenThuongKyLuat? TenNavigation { get; set; }
    }
}
