using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblHinhThucDaoTao
    {
        public TblHinhThucDaoTao()
        {
            TblTrinhDoVanHoas = new HashSet<TblTrinhDoVanHoa>();
        }

        public int Id { get; set; }
        public string? Ten { get; set; }
        public string? Ma { get; set; }

        public virtual ICollection<TblTrinhDoVanHoa> TblTrinhDoVanHoas { get; set; }
    }
}
