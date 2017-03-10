using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class Role
    {
        public Role()
        {
            Permissions = new List<Permission>();
            this.Name = "Hello word";
        }
        
        [Key]
        public Guid? RoleID { get; set; }

        [Index]
        public string Name { get; set; }

        public List<Permission> Permissions { get; set; }
    }
}
