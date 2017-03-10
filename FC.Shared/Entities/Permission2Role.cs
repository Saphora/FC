using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class Permission2Role
    {
        [Key]
        public Guid? P2RID { get; set; }
        public Guid? PermissionID { get; set; }
        public Guid? RoleID { get; set; }

        [ForeignKey("PermissionID")]
        public Permission Permission { get; set; }

        [ForeignKey("RoleID")]
        public Role Role { get; set; }
      
    }
}
