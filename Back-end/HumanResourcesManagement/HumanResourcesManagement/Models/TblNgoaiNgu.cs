using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblNgoaiNgu
    {
        public int Id { get; set; }
        public int? Ngoaingu { get; set; }
        public DateTime? Ngaycap { get; set; }
        public string? Trinhdo { get; set; }
        public string? Noicap { get; set; }
        public string Ma { get; set; } = null!;

        public virtual TblDanhMucNgoaiNgu? NgoainguNavigation { get; set; }
    }
}
