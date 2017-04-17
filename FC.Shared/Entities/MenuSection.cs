using FC.Interfaces.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class MenuSection: BaseModel
    {
        [Key]
        public Guid? SectionID { get; set; }
        public string Name { get; set; }
        public string FAIcon { get; set; }
        public int SortOrder { get; set; }
        public string PageKey { get; set; }
        public List<MenuItem> MenuItems { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsPublished { get; set; }
    }
}
