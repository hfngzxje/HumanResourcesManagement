using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblLichSuBanThan
    {
        public string Ma { get; set; } = null!;
        public string? Bibatbitu { get; set; }
        public string? Thamgiachinhtri { get; set; }
        public string? Thannhannuocngoai { get; set; }

        public virtual TblNhanVien MaNavigation { get; set; } = null!;
    }
}
