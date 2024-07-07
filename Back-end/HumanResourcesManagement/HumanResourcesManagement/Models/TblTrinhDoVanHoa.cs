using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblTrinhDoVanHoa
    {
        public int Id { get; set; }
        public string? Tentruong { get; set; }
        public int? Chuyennganh { get; set; }
        public DateTime? Tuthoigian { get; set; }
        public DateTime? Denthoigian { get; set; }
        public int? Hinhthucdaotao { get; set; }
        public int? Trinhdo { get; set; }
        public string Ma { get; set; } = null!;

        public virtual TblDanhMucChuyenMon? ChuyennganhNavigation { get; set; }
        public virtual TblHinhThucDaoTao? HinhthucdaotaoNavigation { get; set; }
        public virtual TblNhanVien MaNavigation { get; set; } = null!;
        public virtual TblDanhMucTrinhDo? TrinhdoNavigation { get; set; }
    }
}
