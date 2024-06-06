using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HumanResourcesManagement.Models
{
    public partial class TblHinhThucDaoTao
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Ten khong duoc de trong")]
        public string? Ten { get; set; }
    }
}
