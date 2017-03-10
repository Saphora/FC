using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using FC.Office.Properties;
using System.ComponentModel;

namespace FC.Office.Controls.Media.Models
{
    public enum TreeNodeType { Dir,File }
    public class TreeNode : INotifyPropertyChanged
    {
        public TreeNodeType Type { get; set; }
        public Guid? DirID { get; set; }
        public Guid? MediaID { get; set; }
        public string Source { get; set; }
        public string NodeName { get; set; }
        public string ImgSource { get; set; }
        public List<TreeNode> Files { get; set; }

        public bool IsSelected { get; set; }
        public bool IsExpaned { get; set; }

        public TreeNode(string name, TreeNodeType type) : base()
        {
            this.NodeName = name;
            this.Type = type;
            this.IsSelected = false;
            this.IsExpaned = false;
            switch (type)
            {
                case TreeNodeType.Dir:
                    ImgSource = @"https://festival-calendar.nl:8080/icons/folder.png";
                    break;
                case TreeNodeType.File:
                    ImgSource = @"https://festival-calendar.nl:8080/icons/image.png";
                    break;
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;
    }
}
