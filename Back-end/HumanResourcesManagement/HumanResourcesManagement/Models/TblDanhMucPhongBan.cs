using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblDanhMucPhongBan
    {
        public TblDanhMucPhongBan()
        {
            TblDanhMucTos = new HashSet<TblDanhMucTo>();
        }

        public int Id { get; set; }
        public string? Ma { get; set; }
        public string? Ten { get; set; }

        public virtual ICollection<TblDanhMucTo> TblDanhMucTos { get; set; }
    }
}
