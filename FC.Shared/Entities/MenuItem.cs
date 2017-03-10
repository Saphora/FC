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
    public class MenuItem : BaseModel
    {
        [Key]
        public Guid? MenuItemID { get; set; }
        public Guid? ParentID { get; set; }
        public Guid? OpositeID { get; set; } //example usage see PUBLISH / UNPUBLISH ITEMS.
        public string FAIcon { get; set; }
        public string Title { get; set; }
        public string OnClick { get; set; }
        /// <summary>
        /// When IsSpecific is true, this item shall not be visible when the user views a collection page. Only visible when user views detail pages like artist detail / festival detail etc.
        /// </summary>
        public bool IsSpecific { get; set; }
        [Index]
        public Guid? SectionID { get; set; }


    }
}
