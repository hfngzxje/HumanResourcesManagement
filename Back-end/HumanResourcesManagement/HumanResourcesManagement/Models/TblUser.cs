using System;
using System.Collections.Generic;

namespace HumanResourcesManagement.Models
{
    public partial class TblUser
    {
        public string Username { get; set; } = null!;
        public string? Password { get; set; }
    }
}
