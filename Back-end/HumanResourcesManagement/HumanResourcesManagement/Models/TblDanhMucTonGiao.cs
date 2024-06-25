using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblDanhMucTonGiao
    {
        public TblDanhMucTonGiao()
        {
            TblNhanViens = new HashSet<TblNhanVien>();
        }

        public int Id { get; set; }
        public string? Ten { get; set; }

        public virtual ICollection<TblNhanVien> TblNhanViens { get; set; }
    }
}
