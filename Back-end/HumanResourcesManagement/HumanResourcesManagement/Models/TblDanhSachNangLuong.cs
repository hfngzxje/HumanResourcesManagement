using HumanResourcesManagement.Config.Converter;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblDanhSachNangLuong
    {
        public int Id { get; set; }
        public string Mahopdong { get; set; } = null!;
        public string Manv { get; set; } = null!;
        public string? Hosoluongcu { get; set; }
        public string? Hosoluongmoi { get; set; }
        public int? Trangthai { get; set; }

        public virtual TblHopDong MahopdongNavigation { get; set; } = null!;
        public virtual TblNhanVien ManvNavigation { get; set; } = null!;

        protected void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblDanhSachNangLuong>(entity =>
            {
                entity.Property(e => e.Hosoluongcu)
                    .HasConversion(new HoSoLuongRequestConverter());

                entity.Property(e => e.Hosoluongmoi)
                    .HasConversion(new HoSoLuongRequestConverter());
            });
        }
    }

}
