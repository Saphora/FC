﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FC.Shared.Attribs;


namespace FC.Shared.Entities
{
    public class CalendarCardAd : BaseModel
    {
        [Key]
        public Guid? CalendarAdvID { get; set; }

        [Validation(ValidationRule.Guid, true)]
        public Guid? AdvertisementID { get; set; }

        [ForeignKey("AdvertisementID")]
        public  Advertisement Advertisment { get; set; }

        public string Title { get; set; }
        public string Image { get; set; }
        public string TextLine { get; set; }
        public bool CanRate { get; set; }

        public bool MusicGenresVisible { get; set; }
        [Validation(ValidationRule.Website, false)]
        public string DeepLink { get; set; }
        
    }
}
