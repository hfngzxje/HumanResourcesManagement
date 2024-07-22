using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblDanhMucLoaiHopDong
    {
        public TblDanhMucLoaiHopDong()
        {
            TblHopDongs = new HashSet<TblHopDong>();
        }

        public int Id { get; set; }
        public string? Ten { get; set; }
        public string? Ma { get; set; }

        public virtual ICollection<TblHopDong> TblHopDongs { get; set; }
    }
}
