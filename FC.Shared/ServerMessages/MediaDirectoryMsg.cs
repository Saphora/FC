using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ServerMessages
{
    public class MediaDirectoryMsg
    {
        public Guid? DirectoryID { get; set; }
        public Guid? ParentID { get; set; }
        public string  DirectoryName { get; set;}
        public string Author { get; set; }
    }
}

