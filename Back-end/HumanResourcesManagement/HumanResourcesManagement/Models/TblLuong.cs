using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblLuong
    {
        public int Id { get; set; }
        public string? Mahopdong { get; set; }
        public double? Phucaptrachnhiem { get; set; }
        public double? Phucapkhac { get; set; }
        public double? Tongluong { get; set; }
        public string? Thoihanlenluong { get; set; }
        public DateTime? Ngayhieuluc { get; set; }
        public DateTime? Ngayketthuc { get; set; }
        public string? Ghichu { get; set; }
        public int? Nhomluong { get; set; }

        public virtual TblHopDong? MahopdongNavigation { get; set; }
        public virtual TblDanhMucNhomLuong? NhomluongNavigation { get; set; }
    }
}
