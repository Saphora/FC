using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class Permission
    {
        /// <summary>
        /// Unique identifier.
        /// </summary>
        [Key]
        public Guid? PermissionID { get; set; }

        /// <summary>
        /// A machine friendly name, please note that all values will formatted to e.g(XXX_XXX, JOURNALIST,FESTIVAL_ADMIN).
        /// </summary>
        public string PermissionKey { get; set; }

        /// <summary>
        /// The weight define the importance of the permission. This is not fully implemented at the moment.
        /// </summary>
        public int Weight { get; set; }
    }
}
