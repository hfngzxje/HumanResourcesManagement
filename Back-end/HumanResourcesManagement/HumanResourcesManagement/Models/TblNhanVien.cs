using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblNhanVien
    {
        public TblNhanVien()
        {
            EmailHistories = new HashSet<EmailHistory>();
            TblDieuChuyens = new HashSet<TblDieuChuyen>();
            TblHopDongs = new HashSet<TblHopDong>();
            TblKhenThuongKyLuats = new HashSet<TblKhenThuongKyLuat>();
            TblNgoaiNgus = new HashSet<TblNgoaiNgu>();
            TblNguoiThans = new HashSet<TblNguoiThan>();
            TblTrinhDoVanHoas = new HashSet<TblTrinhDoVanHoa>();
        }

        public string Ma { get; set; } = null!;
        public string? Ten { get; set; }
        public short Honnhan { get; set; }
        public DateTime? Ngaysinh { get; set; }
        public bool Gioitinh { get; set; }
        public string? Didong { get; set; }
        public string? Cmnd { get; set; }
        public DateTime? Cmndngaycap { get; set; }
        public string? Cmndnoicap { get; set; }
        public string? Noisinh { get; set; }
        public string? Quequan { get; set; }
        public string? Thuongtru { get; set; }
        public string? Tamtru { get; set; }
        public int? Dantoc { get; set; }
        public int? Tongiao { get; set; }
        public string? Nghenghiep { get; set; }
        public int? Chucvuhientai { get; set; }
        public DateTime? Ngaytuyendung { get; set; }
        public string? Congviecchinh { get; set; }
        public DateTime? Ngayvaoban { get; set; }
        public DateTime? Ngaychinhthuc { get; set; }
        public string? Coquantuyendung { get; set; }
        public int? Ngachcongchuc { get; set; }
        public string? Ngachcongchucnoidung { get; set; }
        public DateTime? Ngayvaodang { get; set; }
        public DateTime? Ngayvaodangchinhthuc { get; set; }
        public DateTime? Ngaynhapngu { get; set; }
        public DateTime? Ngayxuatngu { get; set; }
        public string? Quanhamcaonhat { get; set; }
        public string? Danhhieucaonhat { get; set; }
        public DateTime? Ngayvaodoan { get; set; }
        public string? Noithamgia { get; set; }
        public bool Lathuongbinh { get; set; }
        public bool Laconchinhsach { get; set; }
        public string? Thuongbinh { get; set; }
        public string? Conchinhsach { get; set; }
        public string? Bhxh { get; set; }
        public string? Bhyt { get; set; }
        public string? Atm { get; set; }
        public string? Nganhang { get; set; }
        public int? Phong { get; set; }
        public int? To { get; set; }
        public string? Anh { get; set; }
        public string? Email { get; set; }
        public string? MatKhau { get; set; }
        public int? VaiTroId { get; set; }
        public int? EmailHistoryId { get; set; }

        public virtual TblDanhMucChucDanh? ChucvuhientaiNavigation { get; set; }
        public virtual TblDanhMucDanToc? DantocNavigation { get; set; }
        public virtual TblDanhMucNgachCongChuc? NgachcongchucNavigation { get; set; }
        public virtual TblDanhMucPhongBan? PhongNavigation { get; set; }
        public virtual TblDanhMucTo? ToNavigation { get; set; }
        public virtual TblDanhMucTonGiao? TongiaoNavigation { get; set; }
        public virtual TblVaiTro? VaiTro { get; set; }
        public virtual ICollection<EmailHistory> EmailHistories { get; set; }
        public virtual ICollection<TblDieuChuyen> TblDieuChuyens { get; set; }
        public virtual ICollection<TblHopDong> TblHopDongs { get; set; }
        public virtual ICollection<TblKhenThuongKyLuat> TblKhenThuongKyLuats { get; set; }
        public virtual ICollection<TblNgoaiNgu> TblNgoaiNgus { get; set; }
        public virtual ICollection<TblNguoiThan> TblNguoiThans { get; set; }
        public virtual ICollection<TblTrinhDoVanHoa> TblTrinhDoVanHoas { get; set; }
    }
}
