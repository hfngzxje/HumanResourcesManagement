using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblLichSuHoatDong
    {
        public int Id { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTime? CreatedAt { get; set; }
        public string? Action { get; set; }

        public virtual TblNhanVien CreatedByNavigation { get; set; } = null!;
    }
}
