using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace HumanResourcesManagement.Models
{
    public partial class NhanSuContext : DbContext
    {
        public NhanSuContext()
        {
        }

        public NhanSuContext(DbContextOptions<NhanSuContext> options)
            : base(options)
        {
        }

        public virtual DbSet<EmailHistory> EmailHistories { get; set; } = null!;
        public virtual DbSet<TblDanhMucChucDanh> TblDanhMucChucDanhs { get; set; } = null!;
        public virtual DbSet<TblDanhMucChuyenMon> TblDanhMucChuyenMons { get; set; } = null!;
        public virtual DbSet<TblDanhMucDanToc> TblDanhMucDanTocs { get; set; } = null!;
        public virtual DbSet<TblDanhMucHieuQua> TblDanhMucHieuQuas { get; set; } = null!;
        public virtual DbSet<TblDanhMucKhenThuongKyLuat> TblDanhMucKhenThuongKyLuats { get; set; } = null!;
        public virtual DbSet<TblDanhMucLoaiHopDong> TblDanhMucLoaiHopDongs { get; set; } = null!;
        public virtual DbSet<TblDanhMucNgachCongChuc> TblDanhMucNgachCongChucs { get; set; } = null!;
        public virtual DbSet<TblDanhMucNgoaiNgu> TblDanhMucNgoaiNgus { get; set; } = null!;
        public virtual DbSet<TblDanhMucNguoiThan> TblDanhMucNguoiThans { get; set; } = null!;
        public virtual DbSet<TblDanhMucNhomLuong> TblDanhMucNhomLuongs { get; set; } = null!;
        public virtual DbSet<TblDanhMucPhongBan> TblDanhMucPhongBans { get; set; } = null!;
        public virtual DbSet<TblDanhMucTo> TblDanhMucTos { get; set; } = null!;
        public virtual DbSet<TblDanhMucTonGiao> TblDanhMucTonGiaos { get; set; } = null!;
        public virtual DbSet<TblDanhMucTrinhDo> TblDanhMucTrinhDos { get; set; } = null!;
        public virtual DbSet<TblDanhSachNangLuong> TblDanhSachNangLuongs { get; set; } = null!;
        public virtual DbSet<TblDieuChuyen> TblDieuChuyens { get; set; } = null!;
        public virtual DbSet<TblHinhThucDaoTao> TblHinhThucDaoTaos { get; set; } = null!;
        public virtual DbSet<TblHopDong> TblHopDongs { get; set; } = null!;
        public virtual DbSet<TblKhenThuongKyLuat> TblKhenThuongKyLuats { get; set; } = null!;
        public virtual DbSet<TblLichSuDieuChuyen> TblLichSuDieuChuyens { get; set; } = null!;
        public virtual DbSet<TblLichSuHoatDong> TblLichSuHoatDongs { get; set; } = null!;
        public virtual DbSet<TblLuong> TblLuongs { get; set; } = null!;
        public virtual DbSet<TblNgoaiNgu> TblNgoaiNgus { get; set; } = null!;
        public virtual DbSet<TblNguoiThan> TblNguoiThans { get; set; } = null!;
        public virtual DbSet<TblNhanVien> TblNhanViens { get; set; } = null!;
        public virtual DbSet<TblTrinhDoVanHoa> TblTrinhDoVanHoas { get; set; } = null!;
        public virtual DbSet<TblVaiTro> TblVaiTros { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("server =(local); database = NhanSu; uid=sa;pwd=123456;Trusted_Connection=True;Encrypt=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmailHistory>(entity =>
            {
                entity.ToTable("EmailHistory");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .HasColumnName("email");

                entity.Property(e => e.Greeting).HasColumnName("greeting");

                entity.Property(e => e.Ma)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ma")
                    .IsFixedLength();

                entity.Property(e => e.SentDateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("sentDateTime");

                entity.HasOne(d => d.MaNavigation)
                    .WithMany(p => p.EmailHistories)
                    .HasForeignKey(d => d.Ma)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__EmailHistory__ma__2BFE89A6");
            });

            modelBuilder.Entity<TblDanhMucChucDanh>(entity =>
            {
                entity.ToTable("tblDanhMucChucDanh");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ma)
                    .HasMaxLength(10)
                    .HasColumnName("ma");

                entity.Property(e => e.Phucap).HasColumnName("phucap");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
            });

            modelBuilder.Entity<TblDanhMucChuyenMon>(entity =>
            {
                entity.ToTable("tblDanhMucChuyenMon");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ma)
                    .HasMaxLength(5)
                    .HasColumnName("ma");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
            });

            modelBuilder.Entity<TblDanhMucDanToc>(entity =>
            {
                entity.ToTable("tblDanhMucDanToc");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ma)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ma");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
            });

            modelBuilder.Entity<TblDanhMucHieuQua>(entity =>
            {
                entity.ToTable("tblDanhMucHieuQua");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ma)
                    .HasMaxLength(5)
                    .HasColumnName("ma");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
            });

            modelBuilder.Entity<TblDanhMucKhenThuongKyLuat>(entity =>
            {
                entity.ToTable("tblDanhMucKhenThuongKyLuat");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ma)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ma");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
            });

            modelBuilder.Entity<TblDanhMucLoaiHopDong>(entity =>
            {
                entity.ToTable("tblDanhMucLoaiHopDong");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ma)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ma");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
            });

            modelBuilder.Entity<TblDanhMucNgachCongChuc>(entity =>
            {
                entity.ToTable("tblDanhMucNgachCongChuc");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ma)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ma");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
            });

            modelBuilder.Entity<TblDanhMucNgoaiNgu>(entity =>
            {
                entity.ToTable("tblDanhMucNgoaiNgu");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ma)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ma");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
            });

            modelBuilder.Entity<TblDanhMucNguoiThan>(entity =>
            {
                entity.ToTable("tblDanhMucNguoiThan");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ma)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ma");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
            });

            modelBuilder.Entity<TblDanhMucNhomLuong>(entity =>
            {
                entity.HasKey(e => e.Nhomluong)
                    .HasName("PK__tblDanhM__2E93B6DA52DFEB47");

                entity.ToTable("tblDanhMucNhomLuong");

                entity.Property(e => e.Nhomluong).HasColumnName("nhomluong");

                entity.Property(e => e.Bacluong).HasColumnName("bacluong");

                entity.Property(e => e.Ghichu)
                    .HasMaxLength(100)
                    .HasColumnName("ghichu");

                entity.Property(e => e.Hesoluong).HasColumnName("hesoluong");

                entity.Property(e => e.Luongcoban).HasColumnName("luongcoban");

                entity.Property(e => e.Ngachcongchuc).HasColumnName("ngachcongchuc");

                entity.HasOne(d => d.NgachcongchucNavigation)
                    .WithMany(p => p.TblDanhMucNhomLuongs)
                    .HasForeignKey(d => d.Ngachcongchuc)
                    .HasConstraintName("FK__tblDanhMu__ngach__0697FACD");
            });

            modelBuilder.Entity<TblDanhMucPhongBan>(entity =>
            {
                entity.ToTable("tblDanhMucPhongBan");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ma)
                    .HasMaxLength(5)
                    .HasColumnName("ma");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
            });

            modelBuilder.Entity<TblDanhMucTo>(entity =>
            {
                entity.ToTable("tblDanhMucTo");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Idphong).HasColumnName("idphong");

                entity.Property(e => e.Ma)
                    .HasMaxLength(5)
                    .HasColumnName("ma");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");

                entity.HasOne(d => d.IdphongNavigation)
                    .WithMany(p => p.TblDanhMucTos)
                    .HasForeignKey(d => d.Idphong)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblDanhMu__idpho__2CF2ADDF");
            });

            modelBuilder.Entity<TblDanhMucTonGiao>(entity =>
            {
                entity.ToTable("tblDanhMucTonGiao");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ma)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ma");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
            });

            modelBuilder.Entity<TblDanhMucTrinhDo>(entity =>
            {
                entity.ToTable("tblDanhMucTrinhDo");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ma)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ma");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
            });

            modelBuilder.Entity<TblDanhSachNangLuong>(entity =>
            {
                entity.ToTable("tblDanhSachNangLuong");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Hosoluongcu)
                    .HasColumnType("text")
                    .HasColumnName("hosoluongcu");

                entity.Property(e => e.Hosoluongmoi)
                    .HasColumnType("text")
                    .HasColumnName("hosoluongmoi");

                entity.Property(e => e.Mahopdong)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("mahopdong")
                    .IsFixedLength();

                entity.Property(e => e.Manv)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("manv")
                    .IsFixedLength();

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");

                entity.HasOne(d => d.MahopdongNavigation)
                    .WithMany(p => p.TblDanhSachNangLuongs)
                    .HasForeignKey(d => d.Mahopdong)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblDanhSa__mahop__41B8C09B");

                entity.HasOne(d => d.ManvNavigation)
                    .WithMany(p => p.TblDanhSachNangLuongs)
                    .HasForeignKey(d => d.Manv)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblDanhSac__manv__42ACE4D4");
            });

            modelBuilder.Entity<TblDieuChuyen>(entity =>
            {
                entity.ToTable("tblDieuChuyen");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Chitiet)
                    .HasMaxLength(300)
                    .HasColumnName("chitiet");

                entity.Property(e => e.Chucvu).HasColumnName("chucvu");

                entity.Property(e => e.Manv)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("manv")
                    .IsFixedLength();

                entity.Property(e => e.Ngayhieuluc)
                    .HasColumnType("datetime")
                    .HasColumnName("ngayhieuluc");

                entity.Property(e => e.Phong).HasColumnName("phong");

                entity.Property(e => e.To).HasColumnName("to");

                entity.HasOne(d => d.ManvNavigation)
                    .WithMany(p => p.TblDieuChuyens)
                    .HasForeignKey(d => d.Manv)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblDieuChu__manv__2EDAF651");

                entity.HasOne(d => d.PhongNavigation)
                    .WithMany(p => p.TblDieuChuyens)
                    .HasForeignKey(d => d.Phong)
                    .HasConstraintName("FK__tblDieuCh__phong__2DE6D218");

                entity.HasOne(d => d.ToNavigation)
                    .WithMany(p => p.TblDieuChuyens)
                    .HasForeignKey(d => d.To)
                    .HasConstraintName("FK__tblDieuChuye__to__2FCF1A8A");
            });

            modelBuilder.Entity<TblHinhThucDaoTao>(entity =>
            {
                entity.ToTable("tblHinhThucDaoTao");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ma)
                    .HasMaxLength(5)
                    .HasColumnName("ma");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
            });

            modelBuilder.Entity<TblHopDong>(entity =>
            {
                entity.HasKey(e => e.Mahopdong)
                    .HasName("PK__tblHopDo__44476340418569F1");

                entity.ToTable("tblHopDong");

                entity.Property(e => e.Mahopdong)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("mahopdong")
                    .IsFixedLength();

                entity.Property(e => e.Chucdanh).HasColumnName("chucdanh");

                entity.Property(e => e.Ghichu)
                    .HasMaxLength(300)
                    .HasColumnName("ghichu");

                entity.Property(e => e.Hopdongdenngay)
                    .HasColumnType("datetime")
                    .HasColumnName("hopdongdenngay");

                entity.Property(e => e.Hopdongtungay)
                    .HasColumnType("datetime")
                    .HasColumnName("hopdongtungay");

                entity.Property(e => e.Loaihopdong).HasColumnName("loaihopdong");

                entity.Property(e => e.Ma)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ma")
                    .IsFixedLength();

                entity.HasOne(d => d.ChucdanhNavigation)
                    .WithMany(p => p.TblHopDongs)
                    .HasForeignKey(d => d.Chucdanh)
                    .HasConstraintName("FK_ChucDanh");

                entity.HasOne(d => d.LoaihopdongNavigation)
                    .WithMany(p => p.TblHopDongs)
                    .HasForeignKey(d => d.Loaihopdong)
                    .HasConstraintName("FK__tblHopDon__loaih__30C33EC3");

                entity.HasOne(d => d.MaNavigation)
                    .WithMany(p => p.TblHopDongs)
                    .HasForeignKey(d => d.Ma)
                    .HasConstraintName("FK__tblHopDong__ma__31B762FC");
            });

            modelBuilder.Entity<TblKhenThuongKyLuat>(entity =>
            {
                entity.ToTable("tblKhenThuongKyLuat");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Khenthuongkiluat).HasColumnName("khenthuongkiluat");

                entity.Property(e => e.Lido)
                    .HasMaxLength(100)
                    .HasColumnName("lido");

                entity.Property(e => e.Ma)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ma")
                    .IsFixedLength();

                entity.Property(e => e.Ngay)
                    .HasColumnType("datetime")
                    .HasColumnName("ngay");

                entity.Property(e => e.Noidung)
                    .HasMaxLength(100)
                    .HasColumnName("noidung");

                entity.Property(e => e.Ten).HasColumnName("ten");

                entity.HasOne(d => d.MaNavigation)
                    .WithMany(p => p.TblKhenThuongKyLuats)
                    .HasForeignKey(d => d.Ma)
                    .HasConstraintName("FK__tblKhenThuon__ma__02084FDA");

                entity.HasOne(d => d.TenNavigation)
                    .WithMany(p => p.TblKhenThuongKyLuats)
                    .HasForeignKey(d => d.Ten)
                    .HasConstraintName("FK__tblKhenThuo__ten__01142BA1");
            });

            modelBuilder.Entity<TblLichSuDieuChuyen>(entity =>
            {
                entity.ToTable("tblLichSuDieuChuyen");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.GhiChu)
                    .HasMaxLength(100)
                    .HasColumnName("ghiChu");

                entity.Property(e => e.IdChucVuCu).HasColumnName("idChucVuCu");

                entity.Property(e => e.IdChucVuMoi).HasColumnName("idChucVuMoi");

                entity.Property(e => e.IdDieuChuyen).HasColumnName("idDieuChuyen");

                entity.Property(e => e.IdPhongCu).HasColumnName("idPhongCu");

                entity.Property(e => e.IdPhongMoi).HasColumnName("idPhongMoi");

                entity.Property(e => e.IdToCu).HasColumnName("idToCu");

                entity.Property(e => e.IdToMoi).HasColumnName("idToMoi");

                entity.Property(e => e.Ma)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ma")
                    .IsFixedLength();

                entity.Property(e => e.NgayDieuChuyen)
                    .HasColumnType("datetime")
                    .HasColumnName("ngayDieuChuyen");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.HasOne(d => d.IdChucVuCuNavigation)
                    .WithMany(p => p.TblLichSuDieuChuyenIdChucVuCuNavigations)
                    .HasForeignKey(d => d.IdChucVuCu)
                    .HasConstraintName("FK__tblLichSu__idChu__681373AD");

                entity.HasOne(d => d.IdChucVuMoiNavigation)
                    .WithMany(p => p.TblLichSuDieuChuyenIdChucVuMoiNavigations)
                    .HasForeignKey(d => d.IdChucVuMoi)
                    .HasConstraintName("FK__tblLichSu__idChu__690797E6");

                entity.HasOne(d => d.IdDieuChuyenNavigation)
                    .WithMany(p => p.TblLichSuDieuChuyens)
                    .HasForeignKey(d => d.IdDieuChuyen)
                    .HasConstraintName("FK__tblLichSu__idDie__625A9A57");

                entity.HasOne(d => d.IdPhongCuNavigation)
                    .WithMany(p => p.TblLichSuDieuChuyenIdPhongCuNavigations)
                    .HasForeignKey(d => d.IdPhongCu)
                    .HasConstraintName("FK__tblLichSu__idPho__6442E2C9");

                entity.HasOne(d => d.IdPhongMoiNavigation)
                    .WithMany(p => p.TblLichSuDieuChuyenIdPhongMoiNavigations)
                    .HasForeignKey(d => d.IdPhongMoi)
                    .HasConstraintName("FK__tblLichSu__idPho__65370702");

                entity.HasOne(d => d.IdToCuNavigation)
                    .WithMany(p => p.TblLichSuDieuChuyenIdToCuNavigations)
                    .HasForeignKey(d => d.IdToCu)
                    .HasConstraintName("FK__tblLichSu__idToC__662B2B3B");

                entity.HasOne(d => d.IdToMoiNavigation)
                    .WithMany(p => p.TblLichSuDieuChuyenIdToMoiNavigations)
                    .HasForeignKey(d => d.IdToMoi)
                    .HasConstraintName("FK__tblLichSu__idToM__671F4F74");

                entity.HasOne(d => d.MaNavigation)
                    .WithMany(p => p.TblLichSuDieuChuyens)
                    .HasForeignKey(d => d.Ma)
                    .HasConstraintName("FK__tblLichSuDie__ma__634EBE90");
            });

            modelBuilder.Entity<TblLichSuHoatDong>(entity =>
            {
                entity.ToTable("tblLichSuHoatDong");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Action)
                    .HasMaxLength(100)
                    .HasColumnName("action");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("createdAt");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("createdBy")
                    .IsFixedLength();

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.TblLichSuHoatDongs)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblLichSu__creat__6BE40491");
            });

            modelBuilder.Entity<TblLuong>(entity =>
            {
                entity.ToTable("tblLuong");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ghichu)
                    .HasMaxLength(100)
                    .HasColumnName("ghichu");

                entity.Property(e => e.Mahopdong)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("mahopdong")
                    .IsFixedLength();

                entity.Property(e => e.Ngaybatdau)
                    .HasColumnType("datetime")
                    .HasColumnName("ngaybatdau");

                entity.Property(e => e.Ngayketthuc)
                    .HasColumnType("datetime")
                    .HasColumnName("ngayketthuc");

                entity.Property(e => e.Nhomluong).HasColumnName("nhomluong");

                entity.Property(e => e.Phucapkhac).HasColumnName("phucapkhac");

                entity.Property(e => e.Phucaptrachnhiem).HasColumnName("phucaptrachnhiem");

                entity.Property(e => e.Thoihanlenluong)
                    .HasMaxLength(10)
                    .HasColumnName("thoihanlenluong");

                entity.Property(e => e.Tongluong).HasColumnName("tongluong");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");

                entity.HasOne(d => d.MahopdongNavigation)
                    .WithMany(p => p.TblLuongs)
                    .HasForeignKey(d => d.Mahopdong)
                    .HasConstraintName("FK__tblLuong__mahopd__02FC7413");

                entity.HasOne(d => d.NhomluongNavigation)
                    .WithMany(p => p.TblLuongs)
                    .HasForeignKey(d => d.Nhomluong)
                    .HasConstraintName("FK_nhomluong");
            });

            modelBuilder.Entity<TblNgoaiNgu>(entity =>
            {
                entity.ToTable("tblNgoaiNgu");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ma)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ma")
                    .IsFixedLength();

                entity.Property(e => e.Ngaycap)
                    .HasColumnType("datetime")
                    .HasColumnName("ngaycap");

                entity.Property(e => e.Ngoaingu).HasColumnName("ngoaingu");

                entity.Property(e => e.Noicap)
                    .HasMaxLength(50)
                    .HasColumnName("noicap");

                entity.Property(e => e.Trinhdo)
                    .HasMaxLength(50)
                    .HasColumnName("trinhdo");

                entity.HasOne(d => d.MaNavigation)
                    .WithMany(p => p.TblNgoaiNgus)
                    .HasForeignKey(d => d.Ma)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblNgoaiNgu__ma__05D8E0BE");

                entity.HasOne(d => d.NgoainguNavigation)
                    .WithMany(p => p.TblNgoaiNgus)
                    .HasForeignKey(d => d.Ngoaingu)
                    .HasConstraintName("FK__tblNgoaiN__ngoai__04E4BC85");
            });

            modelBuilder.Entity<TblNguoiThan>(entity =>
            {
                entity.ToTable("tblNguoiThan");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Diachi)
                    .HasMaxLength(150)
                    .HasColumnName("diachi");

                entity.Property(e => e.Dienthoai)
                    .HasMaxLength(16)
                    .IsUnicode(false)
                    .HasColumnName("dienthoai");

                entity.Property(e => e.Gioitinh)
                    .HasColumnName("gioitinh")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Khac)
                    .HasMaxLength(300)
                    .HasColumnName("khac");

                entity.Property(e => e.Ma)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ma")
                    .IsFixedLength();

                entity.Property(e => e.Ngaysinh)
                    .HasColumnType("datetime")
                    .HasColumnName("ngaysinh");

                entity.Property(e => e.Nghenghiep)
                    .HasMaxLength(50)
                    .HasColumnName("nghenghiep");

                entity.Property(e => e.Quanhe).HasColumnName("quanhe");

                entity.Property(e => e.Ten)
                    .HasMaxLength(40)
                    .HasColumnName("ten");

                entity.HasOne(d => d.MaNavigation)
                    .WithMany(p => p.TblNguoiThans)
                    .HasForeignKey(d => d.Ma)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblNguoiThan__ma__07C12930");

                entity.HasOne(d => d.QuanheNavigation)
                    .WithMany(p => p.TblNguoiThans)
                    .HasForeignKey(d => d.Quanhe)
                    .HasConstraintName("FK__tblNguoiT__quanh__06CD04F7");
            });

            modelBuilder.Entity<TblNhanVien>(entity =>
            {
                entity.HasKey(e => e.Ma)
                    .HasName("PK__tblNhanV__3213C8B74912818C");

                entity.ToTable("tblNhanVien");

                entity.Property(e => e.Ma)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ma")
                    .IsFixedLength();

                entity.Property(e => e.Anh).HasColumnName("anh");

                entity.Property(e => e.Atm)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("atm");

                entity.Property(e => e.Bhxh)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("bhxh")
                    .IsFixedLength();

                entity.Property(e => e.Bhyt)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("bhyt")
                    .IsFixedLength();

                entity.Property(e => e.Chucvuhientai).HasColumnName("chucvuhientai");

                entity.Property(e => e.Cmnd)
                    .HasMaxLength(9)
                    .IsUnicode(false)
                    .HasColumnName("cmnd")
                    .IsFixedLength();

                entity.Property(e => e.Cmndngaycap)
                    .HasColumnType("datetime")
                    .HasColumnName("cmndngaycap");

                entity.Property(e => e.Cmndnoicap)
                    .HasMaxLength(20)
                    .HasColumnName("cmndnoicap");

                entity.Property(e => e.Conchinhsach)
                    .HasMaxLength(50)
                    .HasColumnName("conchinhsach");

                entity.Property(e => e.Congviecchinh)
                    .HasMaxLength(50)
                    .HasColumnName("congviecchinh");

                entity.Property(e => e.Coquantuyendung)
                    .HasMaxLength(50)
                    .HasColumnName("coquantuyendung");

                entity.Property(e => e.Danhhieucaonhat)
                    .HasMaxLength(50)
                    .HasColumnName("danhhieucaonhat");

                entity.Property(e => e.Dantoc).HasColumnName("dantoc");

                entity.Property(e => e.Didong)
                    .HasMaxLength(16)
                    .IsUnicode(false)
                    .HasColumnName("didong");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.EmailHistoryId).HasColumnName("emailHistoryId");

                entity.Property(e => e.Gioitinh).HasColumnName("gioitinh");

                entity.Property(e => e.Honnhan).HasColumnName("honnhan");

                entity.Property(e => e.Laconchinhsach).HasColumnName("laconchinhsach");

                entity.Property(e => e.Lathuongbinh).HasColumnName("lathuongbinh");

                entity.Property(e => e.MatKhau)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("matKhau");

                entity.Property(e => e.Ngachcongchuc).HasColumnName("ngachcongchuc");

                entity.Property(e => e.Ngachcongchucnoidung)
                    .HasMaxLength(50)
                    .HasColumnName("ngachcongchucnoidung");

                entity.Property(e => e.Nganhang)
                    .HasMaxLength(50)
                    .HasColumnName("nganhang");

                entity.Property(e => e.Ngaychinhthuc)
                    .HasColumnType("datetime")
                    .HasColumnName("ngaychinhthuc");

                entity.Property(e => e.Ngaynhapngu)
                    .HasColumnType("datetime")
                    .HasColumnName("ngaynhapngu");

                entity.Property(e => e.Ngaysinh)
                    .HasColumnType("datetime")
                    .HasColumnName("ngaysinh");

                entity.Property(e => e.Ngaytuyendung)
                    .HasColumnType("datetime")
                    .HasColumnName("ngaytuyendung");

                entity.Property(e => e.Ngayvaoban)
                    .HasColumnType("datetime")
                    .HasColumnName("ngayvaoban");

                entity.Property(e => e.Ngayvaodang)
                    .HasColumnType("datetime")
                    .HasColumnName("ngayvaodang");

                entity.Property(e => e.Ngayvaodangchinhthuc)
                    .HasColumnType("datetime")
                    .HasColumnName("ngayvaodangchinhthuc");

                entity.Property(e => e.Ngayvaodoan)
                    .HasColumnType("datetime")
                    .HasColumnName("ngayvaodoan");

                entity.Property(e => e.Ngayxuatngu)
                    .HasColumnType("datetime")
                    .HasColumnName("ngayxuatngu");

                entity.Property(e => e.Nghenghiep)
                    .HasMaxLength(50)
                    .HasColumnName("nghenghiep");

                entity.Property(e => e.Noisinh)
                    .HasMaxLength(150)
                    .HasColumnName("noisinh");

                entity.Property(e => e.Noithamgia)
                    .HasMaxLength(50)
                    .HasColumnName("noithamgia");

                entity.Property(e => e.Phong).HasColumnName("phong");

                entity.Property(e => e.Quanhamcaonhat)
                    .HasMaxLength(50)
                    .HasColumnName("quanhamcaonhat");

                entity.Property(e => e.Quequan)
                    .HasMaxLength(150)
                    .HasColumnName("quequan");

                entity.Property(e => e.Tamtru)
                    .HasMaxLength(150)
                    .HasColumnName("tamtru");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");

                entity.Property(e => e.Thuongbinh)
                    .HasMaxLength(50)
                    .HasColumnName("thuongbinh");

                entity.Property(e => e.Thuongtru)
                    .HasMaxLength(150)
                    .HasColumnName("thuongtru");

                entity.Property(e => e.To).HasColumnName("to");

                entity.Property(e => e.Tongiao).HasColumnName("tongiao");

                entity.Property(e => e.VaiTroId).HasColumnName("vaiTroId");

                entity.HasOne(d => d.ChucvuhientaiNavigation)
                    .WithMany(p => p.TblNhanViens)
                    .HasForeignKey(d => d.Chucvuhientai)
                    .HasConstraintName("FK__tblNhanVi__chucv__08B54D69");

                entity.HasOne(d => d.DantocNavigation)
                    .WithMany(p => p.TblNhanViens)
                    .HasForeignKey(d => d.Dantoc)
                    .HasConstraintName("FK__tblNhanVi__danto__09A971A2");

                entity.HasOne(d => d.NgachcongchucNavigation)
                    .WithMany(p => p.TblNhanViens)
                    .HasForeignKey(d => d.Ngachcongchuc)
                    .HasConstraintName("FK__tblNhanVi__ngach__0A9D95DB");

                entity.HasOne(d => d.PhongNavigation)
                    .WithMany(p => p.TblNhanViens)
                    .HasForeignKey(d => d.Phong)
                    .HasConstraintName("FK__tblNhanVi__phong__0B91BA14");

                entity.HasOne(d => d.ToNavigation)
                    .WithMany(p => p.TblNhanViens)
                    .HasForeignKey(d => d.To)
                    .HasConstraintName("FK__tblNhanVien__to__0E6E26BF");

                entity.HasOne(d => d.TongiaoNavigation)
                    .WithMany(p => p.TblNhanViens)
                    .HasForeignKey(d => d.Tongiao)
                    .HasConstraintName("FK__tblNhanVi__tongi__0C85DE4D");

                entity.HasOne(d => d.VaiTro)
                    .WithMany(p => p.TblNhanViens)
                    .HasForeignKey(d => d.VaiTroId)
                    .HasConstraintName("FK__tblNhanVi__vaiTr__0D7A0286");
            });

            modelBuilder.Entity<TblTrinhDoVanHoa>(entity =>
            {
                entity.ToTable("tblTrinhDoVanHoa");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Chuyennganh).HasColumnName("chuyennganh");

                entity.Property(e => e.Denthoigian)
                    .HasColumnType("datetime")
                    .HasColumnName("denthoigian");

                entity.Property(e => e.Hinhthucdaotao).HasColumnName("hinhthucdaotao");

                entity.Property(e => e.Ma)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ma")
                    .IsFixedLength();

                entity.Property(e => e.Tentruong)
                    .HasMaxLength(50)
                    .HasColumnName("tentruong");

                entity.Property(e => e.Trinhdo).HasColumnName("trinhdo");

                entity.Property(e => e.Tuthoigian)
                    .HasColumnType("datetime")
                    .HasColumnName("tuthoigian");

                entity.HasOne(d => d.ChuyennganhNavigation)
                    .WithMany(p => p.TblTrinhDoVanHoas)
                    .HasForeignKey(d => d.Chuyennganh)
                    .HasConstraintName("FK__tblTrinhD__chuye__0F624AF8");

                entity.HasOne(d => d.HinhthucdaotaoNavigation)
                    .WithMany(p => p.TblTrinhDoVanHoas)
                    .HasForeignKey(d => d.Hinhthucdaotao)
                    .HasConstraintName("FK__tblTrinhD__hinht__10566F31");

                entity.HasOne(d => d.MaNavigation)
                    .WithMany(p => p.TblTrinhDoVanHoas)
                    .HasForeignKey(d => d.Ma)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblTrinhDoVa__ma__123EB7A3");

                entity.HasOne(d => d.TrinhdoNavigation)
                    .WithMany(p => p.TblTrinhDoVanHoas)
                    .HasForeignKey(d => d.Trinhdo)
                    .HasConstraintName("FK__tblTrinhD__trinh__114A936A");
            });

            modelBuilder.Entity<TblVaiTro>(entity =>
            {
                entity.HasKey(e => e.VaiTroId)
                    .HasName("PK__tblVaiTr__846C746F2539924B");

                entity.ToTable("tblVaiTro");

                entity.Property(e => e.VaiTroId).HasColumnName("vaiTroId");

                entity.Property(e => e.TenVaiTro)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("tenVaiTro");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
