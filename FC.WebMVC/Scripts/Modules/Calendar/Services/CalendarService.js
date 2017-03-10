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
                    CalendarService.prototype.GetList = function () {
                        throw new Error("CalendarService.GetList() is not implemented.");
                    };
                    CalendarService.prototype.GetMonths = function () {
                        return this.Get('/API/Calendar/GetMonths');
                    };
                    CalendarService.prototype.GetFestivals = function (genre, month, year) {
                        return this.Get('/API/Festival/GetByMonth?&genre=' + genre + '&month=' + (month + 1) + '&year=' + year);
                    };
                    CalendarService.prototype.GetFestivalsByCountry = function (genre, month, year, country) {
                        return this.Get('/API/Festival/GetByCountry?&genre=' + genre + '&month=' + (month + 1) + '&year=' + year + '&country=' + country);
                    };
                    CalendarService.prototype.GetDaysInMonth = function (year, month) {
                        if (!CacheManager.Contains('monthdays-' + year + '-' + month)) {
                            var result = this.Get('/API/Calendar/GetDaysInMonth?year=' + year + '&month=' + month);
                            result.then(function (r) {
                                CacheManager.WriteStorage('monthdays-' + year + '-' + month, r.Data);
                            });
                            return result;
                        }
                        else {
                            var rsp = { Data: {}, Message: "" };
                            rsp.Data = CacheManager.Get('monthdays-' + year + '-' + month).data;
                            rsp.Message = '{"success":"true"}';
                            return this.$q.resolve(rsp);
                        }
                    };
                    CalendarService.prototype.GetFilteredFestivals = function (month, year, genres, countries) {
                        var filter = new FC.Shared.ServiceMessages.FestivalFilter();
                        filter.GenreIDs = new Array();
                        filter.CountryIDs = new Array();
                        if (genres) {
                            genres.forEach(function (v, k) {
                                filter.GenreIDs.push(v.GenreID);
                            });
                        }
                        if (countries) {
                            countries.forEach(function (v, k) {
                                filter.CountryIDs.push(v.CountryID);
                            });
                        }
                        filter.MonthNum = month;
                        filter.YearNum = year;
                        return this.Post('/API/Festival/GetFiltered', new FC.Shared.Models.ServiceMessage(filter));
                    };
                    CalendarService.prototype.GetByMonthYear = function (month, year) {
                        var filter = new FC.Shared.ServiceMessages.FestivalFilter();
                        filter.MonthNum = month;
                        filter.YearNum = year;
                        return this.Post('/API/Festival/GetFiltered', new FC.Shared.Models.ServiceMessage(filter));
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
//# sourceMappingURL=CalendarService.js.map