var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../Calendar.ts"/>
///<reference path="../../Core/ServiceBase.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Calendar;
        (function (Calendar) {
            var Services;
            (function (Services) {
                var CalendarService = (function (_super) {
                    __extends(CalendarService, _super);
                    function CalendarService(http, q) {
                        _super.call(this, http, q);
                    }
                    CalendarService.prototype.GetMonths = function () {
                        return this.Get('/Umbraco/API/Calendar/GetMonths');
                    };
                    CalendarService.prototype.GetFestivals = function (genre, month, year) {
                        return this.Get('/Umbraco/API/Festival/GetByMonth?&genre=' + genre + '&month=' + (month + 1) + '&year=' + year);
                    };
                    CalendarService.prototype.GetFestivalsByCountry = function (genre, month, year, country) {
                        return this.Get('/Umbraco/API/Festival/GetByCountry?&genre=' + genre + '&month=' + (month + 1) + '&year=' + year + '&country=' + country);
                    };
                    CalendarService.prototype.GetFilteredFestivals = function (month, year, genres, countryId) {
                        var filter = new FC.Shared.ServiceMessages.FestivalFilter();
                        filter.GenreIDs = genres;
                        filter.CountryIDs = countryId;
                        filter.MonthNum = month;
                        filter.YearNum = year;
                        return this.Post('/Umbraco/API/Festival/GetFiltered', new FC.Shared.Models.ServiceMessage(filter));
                    };
                    CalendarService.$inject = ['$http', '$q'];
                    return CalendarService;
                }(FC.Core.ServiceBase));
                Services.CalendarService = CalendarService;
                CalendarModule.$Application.RegisterService('FC.Modules.Calendar.Services.CalendarService', FC.Modules.Calendar.Services.CalendarService);
            })(Services = Calendar.Services || (Calendar.Services = {}));
        })(Calendar = Modules.Calendar || (Modules.Calendar = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
