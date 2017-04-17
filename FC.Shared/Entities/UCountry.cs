using FC.Interfaces.Data;
using FC.Shared.EntityMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    
    public class UCountry : BaseModel
    {
        [Key]
        public Guid? CountryID { get; set; }

        public bool IsPopular { get; set; }
       
        public UCountry()
        {
        }

        public UCountry(object country):
            base(country) 
        {
            UCountry c = (UCountry)country;
            this.Name = c.Name;
            this.CultureIsoName = c.CultureIsoName;
            this.LanguageName = c.LanguageName;
        }
        public string CultureIsoName { get; set; }
        public string LanguageName { get; set; }
        public string Currency { get; set; }
        
    }
}
