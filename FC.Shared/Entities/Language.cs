using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Globalization;
using System.ComponentModel.DataAnnotations;

namespace FC.Shared.Entities
{
    public class Language
    {
        [Key]
        public Guid LanguageID { get; set; }

        [Index("TwoLetterLangName", IsClustered =true, IsUnique =true)]
        public string TwoLetterLangName { get; set; }

        [Index("LangName", IsClustered = true, IsUnique = true)]
        public string LangName { get; set; }
        public string IsoCulture { get; set; }
        public int CodePage { get; set; }

    }
}
