using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblDanhMucNgachCongChuc
    {
        public TblDanhMucNgachCongChuc()
        {
            TblNhanViens = new HashSet<TblNhanVien>();
        }

        public int Id { get; set; }
        public string? Ten { get; set; }
        public string? Ma { get; set; }

        public virtual ICollection<TblNhanVien> TblNhanViens { get; set; }
    }
}
