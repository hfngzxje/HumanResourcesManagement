using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblDanhMucChucDanh
    {
        public TblDanhMucChucDanh()
        {
            TblDanhMucNhomLuongs = new HashSet<TblDanhMucNhomLuong>();
            TblHopDongs = new HashSet<TblHopDong>();
            TblNhanViens = new HashSet<TblNhanVien>();
        }

        public int Id { get; set; }
        public string? Ma { get; set; }
        public string? Ten { get; set; }
        public double? Phucap { get; set; }

        public virtual ICollection<TblDanhMucNhomLuong> TblDanhMucNhomLuongs { get; set; }
        public virtual ICollection<TblHopDong> TblHopDongs { get; set; }
        public virtual ICollection<TblNhanVien> TblNhanViens { get; set; }
    }
}
