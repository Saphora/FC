var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../../Shared/Models/BaseModel.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Calendar;
        (function (Calendar) {
            var Models;
            (function (Models) {
                var FestivalMonthItem = (function (_super) {
                    __extends(FestivalMonthItem, _super);
                    function FestivalMonthItem(f) {
                        _super.call(this, f);
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
                        this.GenreList = new Array();
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
                    return FestivalMonthItem;
                }(FC.Shared.Models.BaseModel));
                Models.FestivalMonthItem = FestivalMonthItem;
            })(Models = Calendar.Models || (Calendar.Models = {}));
        })(Calendar = Modules.Calendar || (Modules.Calendar = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
