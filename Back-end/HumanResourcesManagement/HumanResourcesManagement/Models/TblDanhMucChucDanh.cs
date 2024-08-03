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
            TblLichSuDieuChuyenIdChucVuCuNavigations = new HashSet<TblLichSuDieuChuyen>();
            TblLichSuDieuChuyenIdChucVuMoiNavigations = new HashSet<TblLichSuDieuChuyen>();
            TblNhanViens = new HashSet<TblNhanVien>();
        }

        public int Id { get; set; }
        public string? Ma { get; set; }
        public string? Ten { get; set; }
        public double? Phucap { get; set; }

        public virtual ICollection<TblDanhMucNhomLuong> TblDanhMucNhomLuongs { get; set; }
        public virtual ICollection<TblHopDong> TblHopDongs { get; set; }
        public virtual ICollection<TblLichSuDieuChuyen> TblLichSuDieuChuyenIdChucVuCuNavigations { get; set; }
        public virtual ICollection<TblLichSuDieuChuyen> TblLichSuDieuChuyenIdChucVuMoiNavigations { get; set; }
        public virtual ICollection<TblNhanVien> TblNhanViens { get; set; }
    }
}
