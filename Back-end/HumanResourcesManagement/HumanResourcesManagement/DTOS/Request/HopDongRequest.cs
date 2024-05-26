﻿using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.DTOS.Request
{
    public class HopDongRequest
    {
        [Required(ErrorMessage = "Ma hop dong is required")]
        public string Mahopdong { get; set; } = null!;
        [Required(ErrorMessage = "Loai hop dong is required")]
        public int? Loaihopdong { get; set; }
        [Required(ErrorMessage = "Chuc danh is required")]
        public int? Chucdanh { get; set; }
        public double? Luongcoban { get; set; }
        [Required(ErrorMessage = "Ngay hieu luc is required")]
        [DataType(DataType.Date)]
        public DateTime? Hopdongtungay { get; set; }
        [Required(ErrorMessage = "Ngay het han is required")]
        [DataType(DataType.Date)]
        public DateTime? Hopdongdenngay { get; set; }
        public string? Ghichu { get; set; }
        [Required(ErrorMessage = "Ma is required")]
        public string? Ma { get; set; }
    }
}