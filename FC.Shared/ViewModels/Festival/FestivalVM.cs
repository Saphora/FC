using FC.Shared.Entities;
using FC.Shared.ViewModels.Date;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ViewModels.Festival
{
    public class FestivalVM
    { 
        public FestivalVM() { }
        public FestivalVM(UFestival f)
        {
            this.FestivalID = f.FestivalID;
            if (f.DayCount > 1)
            {
                this.Daycount = string.Format("{0} days", f.DayCount);
            } else
            {
                this.Daycount = string.Format("1 day", f.DayCount);
            }
            this.Genres = f.Genres;
            if (this.Genres.Count > 3)
            {
                this.GenreCount = string.Format("+{0}", (f.Genres.Count - 3));
            }
            this.IMG = f.LogoID;
            if (f.Country != null)
            {
                int strLen = f.Country.Name.Length + f.City.Length;
                this.Country = f.Country;
            }
            if (f.City != null)
            {
                if (f.City.Length >= 12)
                {
                    this.City = f.City.Substring(0, 9) + "...";
                }
                else
                {
                    this.City = f.City;
                }
            } else
            {
                this.City = "Unkown";
            }
            this.Name = f.Name;
            this.URL = f.URL;
            if (f.Country != null) {
                if (f.Country.Name.Length >= 12)
                {
                    this.CountryName = f.Country.Name.Substring(0, 9) + "...";
                } else
                {
                    this.CountryName = f.Country.Name;
                }
            } else
            {
                this.CountryName = "Unknown";
            }
            this.Visitors = f.Visitors;
            
            int v = 0;
            if(int.TryParse(f.Visitors, out v))
            {
                if(v < 100 || v >= 100 && v < 500)
                {
                    this.Visitors = "100 - 500";
                }
                if (v > 1000 && v <= 5000)
                {
                    this.Visitors = "1K - 5k";
                }
                if (v > 5000 && v <= 10000)
                {
                    this.Visitors = "5K - 10K";
                }
                if (v > 10000 && v <= 50000)
                {
                    this.Visitors = "10K - 50K";
                }
                if (v > 50000 && v <= 100000)
                {
                    this.Visitors = "50K - 100K";
                }
                if (v > 100000)
                {
                    this.Visitors = "100K+";
                }
            }
            int obsoleteID = 0;
            this.IsMediaObsolete = false;
            if (f.StartDate != null && f.StartDate != DateTime.MinValue && f.EndDate != null && f.EndDate != DateTime.MinValue)
            {
                this.StartDateExplosion = new DateVM(f.StartDate);
                this.EndDateExplosion = new DateVM(f.EndDate);
            }
        }
        public string City { get; set; }
        public UCountry Country { get; set; }
        public string CountryName { get; set; }
        public DateVM StartDateExplosion { get; }
        public DateVM EndDateExplosion { get; }
        public string Location { get; set; }
        public Guid? FestivalID { get; set; }
        public string DateString { get; set; }
        public string Daycount { get; set; }
        public List<UGenre> Genres { get; set; }
        public Guid? IMG { get; set; }
        public string Name { get; set; }
        public string GenreCount { get; set; }
        public string URL { get; set; }
        public bool IsMediaObsolete { get; set; }
        public string SpotifyURL { get; set; }
        public string Visitors { get; set; }
        public string IsTopFestival { get; set; }
        public string FacebookUR { get; set; }
        public string TwitterURL { get; set; }
        public string YoutubeURL { get; set; }
        public string FlickrURL { get; set; }
        public string InstagramURL { get; set; }
        public int OrderDate { get; set; }

    }
}
