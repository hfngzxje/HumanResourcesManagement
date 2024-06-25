using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblDanhMucTo
    {
        public TblDanhMucTo()
        {
            TblDieuChuyens = new HashSet<TblDieuChuyen>();
            TblNhanViens = new HashSet<TblNhanVien>();
        }

        public int Id { get; set; }
        public string? Ma { get; set; }
        public string? Ten { get; set; }
        public int Idphong { get; set; }

        public virtual TblDanhMucPhongBan IdphongNavigation { get; set; } = null!;
        public virtual ICollection<TblDieuChuyen> TblDieuChuyens { get; set; }
        public virtual ICollection<TblNhanVien> TblNhanViens { get; set; }
    }
}
