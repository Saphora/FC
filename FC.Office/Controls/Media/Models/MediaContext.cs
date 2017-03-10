using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Office.Controls.Media.Models
{
    public class MediaContext
    {
        public List<TreeNode> Directories { get; set; }
        public List<TreeNode> Files { get; set; }
        public TreeNode MyProperty { get; set; }
        public string SelectedImageSource { get; set; }
    }
}
