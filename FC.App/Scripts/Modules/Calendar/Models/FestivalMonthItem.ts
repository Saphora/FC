///<reference path="../../../Shared/Models/BaseModel.ts"/>
///<reference path="../../../Shared/Interfaces/IFestivalMonthItem.ts"/>
module FC.Modules.Calendar.Models {

    import CM = FC.Shared.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class FestivalMonthItem extends FC.Shared.Models.BaseModel implements FC.Shared.Interfaces.IFestivalMonthItem {

        public Name: string;
        public Logo: string;
        public IndoorOutdoor: string;
        public Country: INT.IUCountry;
        public City: string;
        public Location: string;
        public TicketPrice: string;
        public DailyTicketPrice: string;
        public Visitors: string;
        public StartDate: string;
        public EndDate: string;
        public Genres: string;
        public GenreList: Array<string>;
        public IsTopFestival: string;
        public Stages: string;
        public FacebookURL: string;
        public TwitterURL: string;
        public YoutubeURL: string;
        public FlickrURL: string;
        public InstagramURL: string;
        public SpotifyURL: string;
        public DeezerURL: string;
        public CultureStartDate: string;
        public CultureEndDate: string;
        public DayCount: string;
        constructor(f: INT.IFestivalMonthItem) {
            super();
            var vm = this;
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
            this.GenreList = new Array<string>();
            this.IsTopFestival = f.IsTopFestival;
            this.Stages = f.Stages;
            this.FacebookURL = f.FacebookURL;
            this.TwitterURL = f.TwitterURL;
            this.YoutubeURL = f.YoutubeURL;
            this.FlickrURL = f.FlickrURL;
            this.InstagramURL = f.InstagramURL;
            this.SpotifyURL = f.SpotifyURL;
            this.DeezerURL = f.DeezerURL;
            this.CultureEndDate = f.CultureEndDate;
            this.CultureStartDate = f.CultureStartDate;
            this.DayCount = f.DayCount;
        }
    }
}