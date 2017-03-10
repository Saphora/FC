declare module FC.Modules.Festival.Services {
    class FestivalService extends FC.Core.ServiceBase {
        static $inject: string[];
        private $q;
        private $http;
        constructor(http: ng.IHttpService, q: any);
        GetFestival(festivalId: number): ng.IPromise<any>;
    }
}
