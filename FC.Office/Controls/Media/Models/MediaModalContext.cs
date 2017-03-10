using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Office.Controls.Media.Models
{
    public class MediaModalContext
    {
        public MediaModalContext()
        {
            MediaData = new MediaTreeList();
            MediaModel = new FC.Shared.Entities.Media();
            DirModel = new FC.Shared.Entities.MediaDirectory();
        }
        public MediaTreeList MediaData { get; set; }
        public FC.Shared.Entities.Media MediaModel { get; set; }
        public FC.Shared.Entities.MediaDirectory DirModel { get; set; }
    }
}
