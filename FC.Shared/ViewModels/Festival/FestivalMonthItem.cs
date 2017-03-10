using FC.Interfaces.Data;
using FC.Shared.Entities;
using FC.Shared.EntityMapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ViewModels.Festival
{
    public class FestivalMonthItem : BaseModel
    {

        
        public virtual String Name { get; set; }

        
        public virtual string Logo { get; set; }

        
        public virtual string IndoorOutdoor { get; set; }

        
        public virtual UCountry Country { get; set; }

        
        public virtual string City { get; set; }

        
        public virtual string Location { get; set; }

        
        public virtual double TicketPrice { get; set; }

        
        public virtual double DailyTicketPrice { get; set; }

        
        public virtual double Visitors { get; set; }

        
        public virtual DateTime StartDate { get; set; }

        
        public virtual DateTime EndDate { get; set; }

        
        public string Genres { get; set; }

        
        public virtual string IsTopFestival { get; set; }

        
        public virtual int Stages { get; set; }

        
        public virtual string FacebookURL { get; set; }

        
        public virtual string TwitterURL { get; set; }

        
        public virtual string YoutubeURL { get; set; }

        
        public virtual string FlickrURL { get; set; }

        
        public virtual string InstagramURL { get; set; }
        
        public virtual string SpotifyURL { get; set; }
        
        public virtual string DeezerURL { get; set; }
        public virtual long DayCount
        {
            get
            {
                return new TimeSpan(this.EndDate.Ticks - this.StartDate.Ticks).Days + 1;
            }
        }
        public virtual string CultureStartDate
        {
            set { value = StartDate.ToString("d", CultureInfo.CurrentCulture); }
            get { return StartDate.ToString("d", CultureInfo.CurrentCulture); }
        }
        public virtual string CultureEndDate { set { value = EndDate.ToString("d", CultureInfo.CurrentCulture); } get { return EndDate.ToString("d", CultureInfo.CurrentCulture); } }


        public FestivalMonthItem()
            : base()
        {

        }
        public FestivalMonthItem(object data)
        {
            FestivalMonthItem f = (FestivalMonthItem)data;
            this.Name = f.Name;
            this.Logo = f.Logo;
            this.IndoorOutdoor = f.IndoorOutdoor;
            this.Country = f.Country;
            this.City = f.City;
            this.Location = f.Location;
            this.TicketPrice = f.TicketPrice;
            this.DailyTicketPrice = f.DailyTicketPrice;
            this.Visitors = f.Visitors;
            this.StartDate = f.StartDate;
            this.EndDate = f.EndDate;
            this.Genres = f.Genres;
            this.IsTopFestival = f.IsTopFestival;
            this.Stages = f.Stages;
            this.FacebookURL = f.FacebookURL;
            this.TwitterURL = f.TwitterURL;
            this.YoutubeURL = f.YoutubeURL;
            this.FlickrURL = f.FlickrURL;
            this.InstagramURL = f.InstagramURL;
            this.SpotifyURL = f.SpotifyURL;
            this.DeezerURL = f.DeezerURL;
        }

        public IContentDetail constructor(IContentDetail data, string title)
        {
            throw new NotImplementedException();
        }
    }
}
