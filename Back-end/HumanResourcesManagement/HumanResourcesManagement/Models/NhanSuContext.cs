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

        public virtual DbSet<TblDanhMucChucDanh> TblDanhMucChucDanhs { get; set; } = null!;
        public virtual DbSet<TblDanhMucChuyenMon> TblDanhMucChuyenMons { get; set; } = null!;
        public virtual DbSet<TblDanhMucDanToc> TblDanhMucDanTocs { get; set; } = null!;
        public virtual DbSet<TblDanhMucHieuQua> TblDanhMucHieuQuas { get; set; } = null!;
        public virtual DbSet<TblDanhMucKhenThuongKyLuat> TblDanhMucKhenThuongKyLuats { get; set; } = null!;
        public virtual DbSet<TblDanhMucLoaiHopDong> TblDanhMucLoaiHopDongs { get; set; } = null!;
        public virtual DbSet<TblDanhMucNgachCongChuc> TblDanhMucNgachCongChucs { get; set; } = null!;
        public virtual DbSet<TblDanhMucNgoaiNgu> TblDanhMucNgoaiNgus { get; set; } = null!;
        public virtual DbSet<TblDanhMucNguoiThan> TblDanhMucNguoiThans { get; set; } = null!;
        public virtual DbSet<TblDanhMucPhongBan> TblDanhMucPhongBans { get; set; } = null!;
        public virtual DbSet<TblDanhMucTo> TblDanhMucTos { get; set; } = null!;
        public virtual DbSet<TblDanhMucTonGiao> TblDanhMucTonGiaos { get; set; } = null!;
        public virtual DbSet<TblDanhMucTrinhDo> TblDanhMucTrinhDos { get; set; } = null!;
        public virtual DbSet<TblDieuChuyen> TblDieuChuyens { get; set; } = null!;
        public virtual DbSet<TblHinhThucDaoTao> TblHinhThucDaoTaos { get; set; } = null!;
        public virtual DbSet<TblHopDong> TblHopDongs { get; set; } = null!;
        public virtual DbSet<TblKhenThuongKyLuat> TblKhenThuongKyLuats { get; set; } = null!;
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
                optionsBuilder.UseSqlServer("server=MSI;database=NhanSu;uid=sa;pwd=123456");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
            });

            modelBuilder.Entity<TblDanhMucLoaiHopDong>(entity =>
            {
                entity.ToTable("tblDanhMucLoaiHopDong");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ma)
                    .HasMaxLength(5)
                    .HasColumnName("ma");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
            });

            modelBuilder.Entity<TblDanhMucNgachCongChuc>(entity =>
            {
                entity.ToTable("tblDanhMucNgachCongChuc");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
            });

            modelBuilder.Entity<TblDanhMucNgoaiNgu>(entity =>
            {
                entity.ToTable("tblDanhMucNgoaiNgu");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
            });

            modelBuilder.Entity<TblDanhMucNguoiThan>(entity =>
            {
                entity.ToTable("tblDanhMucNguoiThan");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
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
                    .HasConstraintName("FK__tblDanhMu__idpho__628FA481");
            });

            modelBuilder.Entity<TblDanhMucTonGiao>(entity =>
            {
                entity.ToTable("tblDanhMucTonGiao");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
            });

            modelBuilder.Entity<TblDanhMucTrinhDo>(entity =>
            {
                entity.ToTable("tblDanhMucTrinhDo");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
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
                    .HasConstraintName("FK__tblDieuChu__manv__6383C8BA");

                entity.HasOne(d => d.PhongNavigation)
                    .WithMany(p => p.TblDieuChuyens)
                    .HasForeignKey(d => d.Phong)
                    .HasConstraintName("FK__tblDieuCh__phong__6477ECF3");

                entity.HasOne(d => d.ToNavigation)
                    .WithMany(p => p.TblDieuChuyens)
                    .HasForeignKey(d => d.To)
                    .HasConstraintName("FK__tblDieuChuye__to__656C112C");
            });

            modelBuilder.Entity<TblHinhThucDaoTao>(entity =>
            {
                entity.ToTable("tblHinhThucDaoTao");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ten)
                    .HasMaxLength(50)
                    .HasColumnName("ten");
            });

            modelBuilder.Entity<TblHopDong>(entity =>
            {
                entity.HasKey(e => e.Mahopdong)
                    .HasName("PK__tblHopDo__44476340AE57D1E2");

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

                entity.Property(e => e.Luongcoban).HasColumnName("luongcoban");

                entity.Property(e => e.Ma)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ma")
                    .IsFixedLength();

                entity.HasOne(d => d.LoaihopdongNavigation)
                    .WithMany(p => p.TblHopDongs)
                    .HasForeignKey(d => d.Loaihopdong)
                    .HasConstraintName("FK__tblHopDon__loaih__74AE54BC");

                entity.HasOne(d => d.MaNavigation)
                    .WithMany(p => p.TblHopDongs)
                    .HasForeignKey(d => d.Ma)
                    .HasConstraintName("FK__tblHopDong__ma__73BA3083");
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
                    .HasConstraintName("FK__tblKhenThuon__ma__66603565");

                entity.HasOne(d => d.TenNavigation)
                    .WithMany(p => p.TblKhenThuongKyLuats)
                    .HasForeignKey(d => d.Ten)
                    .HasConstraintName("FK__tblKhenThuo__ten__75A278F5");
            });

            modelBuilder.Entity<TblLuong>(entity =>
            {
                entity.ToTable("tblLuong");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Bacluong)
                    .HasMaxLength(10)
                    .HasColumnName("bacluong");

                entity.Property(e => e.Ghichu)
                    .HasMaxLength(100)
                    .HasColumnName("ghichu");

                entity.Property(e => e.Hesoluong).HasColumnName("hesoluong");

                entity.Property(e => e.Mahopdong)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("mahopdong")
                    .IsFixedLength();

                entity.Property(e => e.Ngayhieuluc)
                    .HasColumnType("datetime")
                    .HasColumnName("ngayhieuluc");

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

                entity.HasOne(d => d.MahopdongNavigation)
                    .WithMany(p => p.TblLuongs)
                    .HasForeignKey(d => d.Mahopdong)
                    .HasConstraintName("FK__tblLuong__mahopd__6754599E");
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
                    .HasConstraintName("FK__tblNgoaiNgu__ma__693CA210");

                entity.HasOne(d => d.NgoainguNavigation)
                    .WithMany(p => p.TblNgoaiNgus)
                    .HasForeignKey(d => d.Ngoaingu)
                    .HasConstraintName("FK__tblNgoaiN__ngoai__68487DD7");
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
                    .HasConstraintName("FK__tblNguoiThan__ma__6B24EA82");

                entity.HasOne(d => d.QuanheNavigation)
                    .WithMany(p => p.TblNguoiThans)
                    .HasForeignKey(d => d.Quanhe)
                    .HasConstraintName("FK__tblNguoiT__quanh__6A30C649");
            });

            modelBuilder.Entity<TblNhanVien>(entity =>
            {
                entity.HasKey(e => e.Ma)
                    .HasName("PK__tblNhanV__3213C8B712F80AE7");

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
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("bhxh")
                    .IsFixedLength();

                entity.Property(e => e.Bhyt)
                    .HasMaxLength(10)
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
                    .HasConstraintName("FK__tblNhanVi__chucv__76969D2E");

                entity.HasOne(d => d.DantocNavigation)
                    .WithMany(p => p.TblNhanViens)
                    .HasForeignKey(d => d.Dantoc)
                    .HasConstraintName("FK__tblNhanVi__danto__6C190EBB");

                entity.HasOne(d => d.NgachcongchucNavigation)
                    .WithMany(p => p.TblNhanViens)
                    .HasForeignKey(d => d.Ngachcongchuc)
                    .HasConstraintName("FK__tblNhanVi__ngach__778AC167");

                entity.HasOne(d => d.PhongNavigation)
                    .WithMany(p => p.TblNhanViens)
                    .HasForeignKey(d => d.Phong)
                    .HasConstraintName("FK__tblNhanVi__phong__6E01572D");

                entity.HasOne(d => d.ToNavigation)
                    .WithMany(p => p.TblNhanViens)
                    .HasForeignKey(d => d.To)
                    .HasConstraintName("FK__tblNhanVien__to__6EF57B66");

                entity.HasOne(d => d.TongiaoNavigation)
                    .WithMany(p => p.TblNhanViens)
                    .HasForeignKey(d => d.Tongiao)
                    .HasConstraintName("FK__tblNhanVi__tongi__6D0D32F4");

                entity.HasOne(d => d.VaiTro)
                    .WithMany(p => p.TblNhanViens)
                    .HasForeignKey(d => d.VaiTroId)
                    .HasConstraintName("FK__tblNhanVi__vaiTr__787EE5A0");
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
                    .HasConstraintName("FK__tblTrinhD__chuye__6FE99F9F");

                entity.HasOne(d => d.HinhthucdaotaoNavigation)
                    .WithMany(p => p.TblTrinhDoVanHoas)
                    .HasForeignKey(d => d.Hinhthucdaotao)
                    .HasConstraintName("FK__tblTrinhD__hinht__70DDC3D8");

                entity.HasOne(d => d.MaNavigation)
                    .WithMany(p => p.TblTrinhDoVanHoas)
                    .HasForeignKey(d => d.Ma)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblTrinhDoVa__ma__72C60C4A");

                entity.HasOne(d => d.TrinhdoNavigation)
                    .WithMany(p => p.TblTrinhDoVanHoas)
                    .HasForeignKey(d => d.Trinhdo)
                    .HasConstraintName("FK__tblTrinhD__trinh__71D1E811");
            });

            modelBuilder.Entity<TblVaiTro>(entity =>
            {
                entity.HasKey(e => e.VaiTroId)
                    .HasName("PK__tblVaiTr__846C746F93938FBE");

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
