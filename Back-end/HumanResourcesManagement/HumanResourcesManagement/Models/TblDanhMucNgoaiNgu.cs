using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblDanhMucNgoaiNgu
    {
        public TblDanhMucNgoaiNgu()
        {
            TblNgoaiNgus = new HashSet<TblNgoaiNgu>();
        }

        public int Id { get; set; }
        public string? Ten { get; set; }

        public virtual ICollection<TblNgoaiNgu> TblNgoaiNgus { get; set; }
    }
}
