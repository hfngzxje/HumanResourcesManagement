using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblNguoiThan
    {
        public int Id { get; set; }
        public string? Ten { get; set; }
        public bool? Gioitinh { get; set; }
        public DateTime? Ngaysinh { get; set; }
        public int? Quanhe { get; set; }
        public string? Nghenghiep { get; set; }
        public string? Diachi { get; set; }
        public string? Dienthoai { get; set; }
        public string? Khac { get; set; }
        public string Ma { get; set; } = null!;

        public virtual TblDanhMucNguoiThan? QuanheNavigation { get; set; }
    }
}
