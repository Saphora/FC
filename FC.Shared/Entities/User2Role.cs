using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class User2Role
    {
        [Key]
        public Guid? U2RID { get; set; }
        public Guid? UserID { get; set; }
        public Guid? RoleID { get; set; }

        [ForeignKey("RoleID")]
        public Role Role { get; set; }

        [ForeignKey("UserID")]
        public ApplicationUser User { get; set; }
    }
}
