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

        
        public  String Name { get; set; }

        
        public  string Logo { get; set; }

        
        public  string IndoorOutdoor { get; set; }

        
        public  UCountry Country { get; set; }

        
        public  string City { get; set; }

        
        public  string Location { get; set; }

        
        public  double TicketPrice { get; set; }

        
        public  double DailyTicketPrice { get; set; }

        
        public  double Visitors { get; set; }

        
        public  DateTime StartDate { get; set; }

        
        public  DateTime EndDate { get; set; }

        
        public string Genres { get; set; }

        
        public  string IsTopFestival { get; set; }

        
        public  int Stages { get; set; }

        
        public  string FacebookURL { get; set; }

        
        public  string TwitterURL { get; set; }

        
        public  string YoutubeURL { get; set; }

        
        public  string FlickrURL { get; set; }

        
        public  string InstagramURL { get; set; }
        
        public  string SpotifyURL { get; set; }
        
        public  string DeezerURL { get; set; }
        public  long DayCount
        {
            get
            {
                return new TimeSpan(this.EndDate.Ticks - this.StartDate.Ticks).Days + 1;
            }
        }
        public  string CultureStartDate
        {
            set { value = StartDate.ToString("d", CultureInfo.CurrentCulture); }
            get { return StartDate.ToString("d", CultureInfo.CurrentCulture); }
        }
        public  string CultureEndDate { set { value = EndDate.ToString("d", CultureInfo.CurrentCulture); } get { return EndDate.ToString("d", CultureInfo.CurrentCulture); } }


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
