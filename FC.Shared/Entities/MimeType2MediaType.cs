using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class MimeType2MediaType
    {
        [Key]
        public Guid MT2MTID { get; set; }
        public Guid? MimeTypeID { get; set; }
        public Guid? MediaTypeID { get; set; }

        [ForeignKey("MimeTypeID")]
        public MimeType MimeType { get; set; }

        [ForeignKey("MediaTypeID")]
        public MediaType MediaType { get; set; }
    }
}
