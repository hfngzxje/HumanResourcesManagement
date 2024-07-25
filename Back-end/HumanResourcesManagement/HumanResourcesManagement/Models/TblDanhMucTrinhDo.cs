using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblDanhMucTrinhDo
    {
        public TblDanhMucTrinhDo()
        {
            TblTrinhDoVanHoas = new HashSet<TblTrinhDoVanHoa>();
        }

        public int Id { get; set; }
        public string? Ten { get; set; }
        public string? Ma { get; set; }

        public virtual ICollection<TblTrinhDoVanHoa> TblTrinhDoVanHoas { get; set; }
    }
}
