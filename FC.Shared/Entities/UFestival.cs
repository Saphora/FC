using FC.Interfaces.Data;
using FC.Shared.EntityMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Configuration;
using System.Globalization;
using System.Linq;
using FC.Shared.Attribs;
using FC.Shared.ViewModels.Date;
using FC.Shared.ViewModels.Festival;

namespace FC.Shared.Entities
{

    
    public class UFestival : BaseModel
    {
        public UFestival()
        {

        }

        [Key]
        public Guid? FestivalID { get; set; }
        
        public bool IsPopular { get; set; }
        
        [Validation(ValidationRule.Guid, false)]
        public Guid? CountryID { get; set; }
        
        public  List<Ticket> Tickets { get; set; }

        public string ZIPCode { get; set; }

        public  long DayCount
        {
            get
            {
                return new TimeSpan(this.EndDate.Ticks - this.StartDate.Ticks).Days + 1;
            }
        }

        public  List<SocialProfile> SocialProfiles { get; set; }
        
        public  int IsSoldOut { get; set; }
        [Validation(ValidationRule.Guid,false)]
        public  Guid? LogoID { get; set; }

        public  string IndoorOutdoor { get; set; }

        [ForeignKey("CountryID")]
        public  UCountry Country { get; set; }
        
        public  string City { get; set; }
        
        public  string Visitors { get; set; }

        private DateTime _stdt { get; set; }
        
        public  DateTime StartDate {
            set
            {
                this.StartDateExplosion = new DateVM(value);
                this._stdt = value.ToUniversalTime();
            } 
            get
            {
                this.StartDateExplosion = new DateVM(this._stdt.ToLocalTime());
                return this._stdt.ToLocalTime();
            }
        }


        private DateTime _edt { get; set; }

        public  DateTime EndDate {
            set
            {
                this.EndDateExplosion = new DateVM(value);
                this._edt = value.ToUniversalTime();
            }
            get
            {
                this.EndDateExplosion = new DateVM(this._edt.ToLocalTime());
                return this._edt.ToLocalTime();
            }
        }
        
        public  List<UGenre> Genres { get; set; }
        
        public  string Description { get; set; }
      
        public  List<Stage> StageList { get; set; }

        [Validation(ValidationRule.Guid, false)]
        public  Guid? FestivalLocationID { get; set; }

        [ForeignKey("FestivalLocationID")]
        public  Location FestivalLocation { get; set; }

        [Validation(ValidationRule.Guid, false)]
        public Guid? MediaDirectoryID { get; set; }

        [ForeignKey("MediaDirectoryID")]
        public MediaDirectory Album { get; set; }

        public Guid? ProfileImageID { get; set; }

        [ForeignKey("ProfileImageID")]
        public  Media ProfileImage { get; set; }

        [NotMapped]
        public DateVM StartDateExplosion {
            get;set;
        }
        [NotMapped]
        public DateVM EndDateExplosion
        {
            get;set;
        }
        
        public bool TopFestival { get; set; }

        public string MetaKeys
        {
            get;set;
        }

        public string MetaDescription
        {
            get;set;
        }

        public string Title
        {
            get;set;
        }

        public long OrderDate
        {
            get;set;
        }

        public string ShortText
        {
            get;set;
        }

        public string MetaTitle
        {
            get;set;
        }
    }
}
