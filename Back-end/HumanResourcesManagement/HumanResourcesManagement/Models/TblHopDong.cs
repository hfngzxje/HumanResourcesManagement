using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblHopDong
    {
        public TblHopDong()
        {
            TblLuongs = new HashSet<TblLuong>();
        }

        public string Mahopdong { get; set; } = null!;
        public int? Loaihopdong { get; set; }
        public int? Chucdanh { get; set; }
        public DateTime? Hopdongtungay { get; set; }
        public DateTime? Hopdongdenngay { get; set; }
        public string? Ghichu { get; set; }
        public string? Ma { get; set; }
        public int? TrangThai { get; set; }

        public virtual TblDanhMucChucDanh? ChucdanhNavigation { get; set; }
        public virtual TblDanhMucLoaiHopDong? LoaihopdongNavigation { get; set; }
        public virtual TblNhanVien? MaNavigation { get; set; }
        public virtual ICollection<TblLuong> TblLuongs { get; set; }
    }
}
