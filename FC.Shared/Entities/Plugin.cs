using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FC.Shared.Attribs;
namespace FC.Shared.Entities
{
    public class Plugin
    {   
        [Key]
        public Guid? PluginID { get; set; }

        public string PluginName { get; set; }

        public string PluginDescription { get; set; }

        public string PluginWebsite { get; set; }

        public string PluginPath { get; set; }

        public Guid? AuthorID { get; set; }

        [ForeignKey("AuthorID")]
        public ApplicationUser Author { get; set; }

        public string Version { get; set; }

        public Guid? AlbumID { get; set; }

        [ForeignKey("AlbumID")]
        public MediaDirectory Album { get; set; }

        [ForeignKey("MediaID")]
        public Media Thumbnail { get; set; }

        public Guid? MediaID { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime ArchiveDate { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public DateTime Expires { get; set; }

    }
}
