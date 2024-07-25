using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblDanhMucNhomLuong
    {
        public TblDanhMucNhomLuong()
        {
            TblLuongs = new HashSet<TblLuong>();
        }

        public int Nhomluong { get; set; }
        public double? Hesoluong { get; set; }
        public double? Bacluong { get; set; }
        public string? Ghichu { get; set; }

        public virtual ICollection<TblLuong> TblLuongs { get; set; }
    }
}
