using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblDanhMucTo
    {
        public int Id { get; set; }
        public string? Ma { get; set; }
        public string? Ten { get; set; }
        public int Idphong { get; set; }

        public virtual TblDanhMucPhongBan IdphongNavigation { get; set; } = null!;
    }
}
