using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblLichSuDieuChuyen
    {
        public int Id { get; set; }
        public int? IdDieuChuyen { get; set; }
        public string? Ma { get; set; }
        public DateTime? NgayDieuChuyen { get; set; }
        public int? IdPhongCu { get; set; }
        public int? IdPhongMoi { get; set; }
        public int? IdToCu { get; set; }
        public int? IdToMoi { get; set; }
        public int? IdChucVuCu { get; set; }
        public int? IdChucVuMoi { get; set; }
        public string? GhiChu { get; set; }
        public short? TrangThai { get; set; }

        public virtual TblDanhMucChucDanh? IdChucVuCuNavigation { get; set; }
        public virtual TblDanhMucChucDanh? IdChucVuMoiNavigation { get; set; }
        public virtual TblDieuChuyen? IdDieuChuyenNavigation { get; set; }
        public virtual TblDanhMucPhongBan? IdPhongCuNavigation { get; set; }
        public virtual TblDanhMucPhongBan? IdPhongMoiNavigation { get; set; }
        public virtual TblDanhMucTo? IdToCuNavigation { get; set; }
        public virtual TblDanhMucTo? IdToMoiNavigation { get; set; }
        public virtual TblNhanVien? MaNavigation { get; set; }
    }
}
