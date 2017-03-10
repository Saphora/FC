using FC.BL.Repositories;
using FC.Shared.Config;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Office.Controls.Media.Models
{
    public class MediaTreeNode
    {
        private RepositoryContext repositories { get; set; }
        public MediaTreeNode()
        {
            this.Directories = new List<MediaTreeNode>();

        }

        public Guid? ID { get; set; }
        public Guid? ParentID { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string ImageSource { get; set; }
        public List<MediaTreeNode> Directories { get; set; }
    }

    public class MediaTreeList : List<MediaTreeNode>
    {
        public MediaTreeList(MediaTreeNode parent = null)
            :base()
        {
            Name = "Root";
        }

        public MediaTreeList()
            : base()
        {
            Name = "Root";
        }
        public string Name { get; set; }
    }
}
