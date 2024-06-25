using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblDanhMucKhenThuongKyLuat
    {
        public TblDanhMucKhenThuongKyLuat()
        {
            TblKhenThuongKyLuats = new HashSet<TblKhenThuongKyLuat>();
        }

        public int Id { get; set; }
        public string? Ten { get; set; }

        public virtual ICollection<TblKhenThuongKyLuat> TblKhenThuongKyLuats { get; set; }
    }
}
