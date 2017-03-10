///<reference path="../Theming.ts"/>
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />


//function asyncGreet(name) {
//    var deferred = $q.defer();

//    setTimeout(function () {
//        deferred.notify('About to greet ' + name + '.');

//        if (okToGreet(name)) {
//            deferred.resolve('Hello, ' + name + '!');
//        } else {
//            deferred.reject('Greeting ' + name + ' is not allowed.');
//        }
//    }, 1000);

//    return deferred.promise;
//}

module FC.Modules.Theming.Services {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class ThemingService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q', '$route', '$routeParams', '$location'];
        public ActiveGenreID: number;
        public ActiveTheme: INT.IUTheme;
        public CacheManager: FC.Shared.Util.CacheManager;
        private $location: any;
        private $routeParams: any;
        constructor(http: ng.IHttpService, q: any, $route: ng.route.IRoute, routeParams: any, location: any) {
            super(http, q);
            var vm = this;
            this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
            this.$location = location;
            this.$routeParams = routeParams;
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.UTheme>>> {
            return this.Get<IList<MODELS.UTheme>>('/API/Theme/GetList');
        }

        GetByID(id: number): ng.IPromise<INT.IServiceResponse<INT.IUTheme>> {
            return this.Get('/Umracou/API/Theme/GetByID?id=' + id);
        }

        GetAll(): ng.IPromise<INT.IServiceResponse<INT.IUTheme[]>> {
            return this.Get('/API/Theme/GetAll');
        }
        private getActiveThemeFromCache() {
            var vm = this;
            var deferred = vm.$q.defer();
            var theme = vm.CacheManager.GetStorage("active-theme").data;
            if (theme != null) {
            }
        }
        GetActiveTheme(): ng.IPromise<INT.IServiceResponse<INT.IUTheme>> {
            return this.Get('/API/Theme/GetDefault');
        }
    }
    ThemingModule.GetApplication().RegisterService('FC.Modules.Theming.Services.ThemingService', FC.Modules.Theming.Services.ThemingService);
}                  