using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class Translation2Language
    {
        public Guid? T2LID { get; set; }
        public Guid? TranslationID { get; set; }
        public Guid? LanguageID { get; set; }

        public  Translation Translation {get;set;}
        public  Language Language {get;set;}
    }
}
