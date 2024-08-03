using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblDanhMucPhongBan
    {
        public TblDanhMucPhongBan()
        {
            TblDanhMucTos = new HashSet<TblDanhMucTo>();
            TblDieuChuyens = new HashSet<TblDieuChuyen>();
            TblLichSuDieuChuyenIdPhongCuNavigations = new HashSet<TblLichSuDieuChuyen>();
            TblLichSuDieuChuyenIdPhongMoiNavigations = new HashSet<TblLichSuDieuChuyen>();
            TblNhanViens = new HashSet<TblNhanVien>();
        }

        public int Id { get; set; }
        public string? Ma { get; set; }
        public string? Ten { get; set; }

        public virtual ICollection<TblDanhMucTo> TblDanhMucTos { get; set; }
        public virtual ICollection<TblDieuChuyen> TblDieuChuyens { get; set; }
        public virtual ICollection<TblLichSuDieuChuyen> TblLichSuDieuChuyenIdPhongCuNavigations { get; set; }
        public virtual ICollection<TblLichSuDieuChuyen> TblLichSuDieuChuyenIdPhongMoiNavigations { get; set; }
        public virtual ICollection<TblNhanVien> TblNhanViens { get; set; }
    }
}
