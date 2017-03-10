var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Models;
        (function (Models) {
            var UFestival = (function (_super) {
                __extends(UFestival, _super);
                function UFestival(f) {
                    _super.call(this, f);
                    this.FestivalID = f.FestivalID;
                    this.CountryID = f.CountryID;
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
                    this.CampingAvailable = f.CampingAvailable;
                    if (f.Genres != null && f.Genres.length > 0) {
                        this.Genres = f.Genres;
                    }
                    else {
                        this.Genres = new Array();
                    }
                    this.Description = f.Description;
                    if (f.Artists != null && f.Artists.length > 0) {
                        this.Artists = f.Artists;
                    }
                    else {
                        this.Artists = new Array();
                    }
                    this.Address = f.Address;
                    this.ZIPCode = f.ZIPCode;
                    this.Website = f.Website;
                    this.Stages = f.Stages;
                    this.FacebookURL = f.FacebookURL;
                    this.InstagramURL = f.InstagramURL;
                    this.TwitterURL = f.TwitterURL;
                    this.YoutubeURL = f.YoutubeURL;
                    this.FlickrURL = f.FlickrURL;
                    this.AftermovieYoutubeURL = f.AftermovieYoutubeURL;
                    this.BusInfo = f.BusInfo;
                    this.TrainInfo = f.TrainInfo;
                    this.AirPlaneInfo = f.AirPlaneInfo;
                    this.CarInfo = f.CarInfo;
                    this.TaxiInfo = f.TaxiInfo;
                    this.IsTopFestival = f.IsTopFestival;
                    this.IsSoldOut = f.IsSoldOut;
                    this.Rating = f.Rating;
                    this.Thumbnail = f.Thumbnail;
                    this.ContentType = f.ContentType;
                    this.MetaKeys = f.MetaKeys;
                    this.MetaDescription = f.MetaDescription;
                    this.Author = f.Author;
                    this.Title = f.Title;
                    this.OrderDate = f.OrderDate;
                    this.DisplayDate = f.DisplayDate;
                    this.ShortText = f.ShortText;
                    this.DetailText = f.DetailText;
                    this.Link = f.Link;
                    this.ShowReadMore = f.ShowReadMore;
                    this.SortOrder = f.SortOrder;
                    this.Rating = f.Rating;
                }
                return UFestival;
            }(Models.BaseModel));
            Models.UFestival = UFestival;
        })(Models = Shared.Models || (Shared.Models = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
