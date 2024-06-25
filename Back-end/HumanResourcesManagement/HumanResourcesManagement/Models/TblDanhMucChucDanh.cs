using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblDanhMucChucDanh
    {
        public TblDanhMucChucDanh()
        {
            TblNhanViens = new HashSet<TblNhanVien>();
        }

        public int Id { get; set; }
        public string? Ma { get; set; }
        public string? Ten { get; set; }
        public double? Phucap { get; set; }

        public virtual ICollection<TblNhanVien> TblNhanViens { get; set; }
    }
}
