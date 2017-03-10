declare module FC.Modules.Calendar.Services {
    class CalendarService extends FC.Core.ServiceBase {
        static $inject: string[];
        private $q;
        private $http;
        constructor(http: ng.IHttpService, q: any);
        GetMonths(): ng.IPromise<any>;
        GetFestivals(genre: Number, month: Number, year: Number): ng.IPromise<any>;
    }
}
