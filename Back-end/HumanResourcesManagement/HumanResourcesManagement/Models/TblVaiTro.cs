using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblVaiTro
    {
        public TblVaiTro()
        {
            TblNhanViens = new HashSet<TblNhanVien>();
        }

        public int VaiTroId { get; set; }
        public string? TenVaiTro { get; set; }

        public virtual ICollection<TblNhanVien> TblNhanViens { get; set; }
    }
}
