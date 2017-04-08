using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class MenuSection2Roles
    {
        [Key]
        public Guid? MS2RID { get; set; }
        public Guid? RoleID { get; set; }
        public Guid? MenuSectionID { get; set; }

        [ForeignKey("RoleID")]
        public  Role Role { get; set; }
        [ForeignKey("MenuSectionID")]
        public  MenuSection Section { get; set; }
    }
}
