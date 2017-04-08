///<reference path="../Calendar.ts"/>
///<reference path="../../Core/ServiceBase.ts" />
module FC.Modules.Calendar.Services {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export class CalendarService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];

        
        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<any>> {
            throw new Error("CalendarService.GetList() is not implemented.");
        }

        public GetMonths(): ng.IPromise<INT.IServiceResponse<Array<string>>> {
            return this.Get<Array<string>>('/API/Calendar/GetMonths');
        }
        public GetFestivals(genre: number, month: number, year: number): ng.IPromise<INT.IServiceResponse<Array<INT.IFestivalMonthItem>>> {
            return this.Get<Array<INT.IFestivalMonthItem>>('/API/Festival/GetByMonth?&genre=' + genre + '&month=' + (month + 1) + '&year=' + year);
        }
        public GetFestivalsByCountry(genre: number, month: number, year: number, country:number): ng.IPromise<INT.IServiceResponse<Array<INT.IFestivalMonthItem>>> {
            return this.Get<Array<INT.IFestivalMonthItem>>('/API/Festival/GetByCountry?&genre=' + genre + '&month=' + (month + 1) + '&year=' + year + '&country='+country);
        }

        public GetDaysInMonth(year: number, month: number): ng.IPromise<INT.IServiceResponse<string[]>> {
            if (!CacheManager.Contains('monthdays-' + year + '-' + month)) {
                var result = this.Get<string[]>('/API/Calendar/GetDaysInMonth?year=' + year + '&month=' + month);
                result.then(function (r) {
                    CacheManager.WriteStorage('monthdays-' + year + '-' + month, r.Data);
                });
                return result;
            } else {
                var rsp = { Data: {}, Message: "" } as FC.Shared.Interfaces.IServiceResponse<string[]>;

                rsp.Data = CacheManager.Get<string[]>('monthdays-' + year + '-' + month).data;

                rsp.Message = '{"success":"true"}';
                return this.$q.resolve<INT.IServiceResponse<string[]>>(rsp);
            }
        }

        public GetByFilter(filter: FC.Shared.ServiceMessages.FestivalFilter) {
            return this.Post<Array<FC.Shared.ViewModels.IFestivalVM>, FC.Shared.ServiceMessages.FestivalFilter>('/API/Festival/GetByFilter', new FC.Shared.Models.ServiceMessage<FC.Shared.ServiceMessages.FestivalFilter>(filter));
        }

        public GetFilteredFestivals(month: number, year: number, genres: Array<MODELS.UGenre>, countries: Array<MODELS.UCountry>) {
            var filter = new FC.Shared.ServiceMessages.FestivalFilter();
            filter.GenreIDs = new Array<string>();
            filter.CountryIDs = new Array<string>();
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
            return this.Post<Array<FC.Shared.ViewModels.IFestivalVM>, FC.Shared.ServiceMessages.FestivalFilter>('/API/Festival/GetFiltered', new FC.Shared.Models.ServiceMessage<FC.Shared.ServiceMessages.FestivalFilter>(filter));
        }

        public GetByMonthYear(month: number, year: number) {
            var filter = new FC.Shared.ServiceMessages.FestivalFilter();
            filter.MonthNum = month;
            filter.YearNum = year;
            return this.Post<Array<FC.Shared.ViewModels.IFestivalVM>, FC.Shared.ServiceMessages.FestivalFilter>('/API/Festival/GetFiltered', new FC.Shared.Models.ServiceMessage<FC.Shared.ServiceMessages.FestivalFilter>(filter));
        }
    }
    CalendarModule.$Application.RegisterService('FC.Modules.Calendar.Services.CalendarService', FC.Modules.Calendar.Services.CalendarService);
}                                            