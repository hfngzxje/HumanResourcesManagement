using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblDanhMucChucDanh
    {
        public int Id { get; set; }
        public string? Ma { get; set; }
        public string? Ten { get; set; }
        public double? Phucap { get; set; }
    }
}
