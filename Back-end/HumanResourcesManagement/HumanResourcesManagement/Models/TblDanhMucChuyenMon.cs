using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblDanhMucChuyenMon
    {
        public TblDanhMucChuyenMon()
        {
            TblTrinhDoVanHoas = new HashSet<TblTrinhDoVanHoa>();
        }

        public int Id { get; set; }
        public string? Ma { get; set; }
        public string? Ten { get; set; }

        public virtual ICollection<TblTrinhDoVanHoa> TblTrinhDoVanHoas { get; set; }
    }
}
