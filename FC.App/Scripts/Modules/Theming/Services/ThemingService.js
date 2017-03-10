///<reference path="../Theming.ts"/>
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Theming;
        (function (Theming) {
            var Services;
            (function (Services) {
                var ThemingService = (function (_super) {
                    __extends(ThemingService, _super);
                    function ThemingService(http, q, $route, routeParams, location) {
                        _super.call(this, http, q);
                        var vm = this;
                        this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                        this.$location = location;
                        this.$routeParams = routeParams;
                    }
                    ThemingService.prototype.GetByID = function (id) {
                        return this.Get('/Umracou/API/Theme/GetByID?id=' + id);
                    };
                    ThemingService.prototype.GetAll = function () {
                        return this.Get('/Umbraco/API/Theme/GetAll');
                    };
                    ThemingService.prototype.getActiveThemeFromCache = function () {
                        var vm = this;
                        var deferred = vm.$q.defer();
                        var theme = vm.CacheManager.GetStorage("active-theme").data;
                        if (theme != null) {
                        }
                    };
                    ThemingService.prototype.GetActiveTheme = function () {
                        return this.Get('/Umbraco/API/Theme/GetDefault');
                    };
                    ThemingService.$inject = ['$http', '$q', '$route', '$routeParams', '$location'];
                    return ThemingService;
                }(FC.Core.ServiceBase));
                Services.ThemingService = ThemingService;
                ThemingModule.GetApplication().RegisterService('FC.Modules.Theming.Services.ThemingService', FC.Modules.Theming.Services.ThemingService);
            })(Services = Theming.Services || (Theming.Services = {}));
        })(Theming = Modules.Theming || (Modules.Theming = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
