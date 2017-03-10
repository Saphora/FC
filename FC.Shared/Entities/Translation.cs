using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class Translation
    {
        [Key]
        public Guid? TranslationID { get; set; }
        
        public Guid? LanguageID { get; set; }

        [ForeignKey("LanguageID")]
        public Language Language { get; set; }

        [Index]
        public string TransKey { get; set; }

        public string Value { get; set; }
    }
}
