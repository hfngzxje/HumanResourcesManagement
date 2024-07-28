using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class EmailHistory
    {
        public int Id { get; set; }
        public string Ma { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime SentDateTime { get; set; }
        public string Greeting { get; set; } = null!;

        public virtual TblNhanVien MaNavigation { get; set; } = null!;
    }
}
