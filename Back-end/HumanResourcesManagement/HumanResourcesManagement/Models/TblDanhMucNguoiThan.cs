using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblDanhMucNguoiThan
    {
        public TblDanhMucNguoiThan()
        {
            TblNguoiThans = new HashSet<TblNguoiThan>();
        }

        public int Id { get; set; }
        public string? Ten { get; set; }

        public virtual ICollection<TblNguoiThan> TblNguoiThans { get; set; }
    }
}
