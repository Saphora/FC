var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/ServiceBase.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Countries;
        (function (Countries) {
            var Services;
            (function (Services) {
                var CountriesService = (function (_super) {
                    __extends(CountriesService, _super);
                    function CountriesService(http, q) {
                        _super.call(this, http, q);
                    }
                    CountriesService.prototype.GetCountry = function (id) {
                        return this.Get('/Umracou/API/Country/GetByID?id=' + id);
                    };
                    CountriesService.prototype.GetAll = function () {
                        return this.Get('/Umbraco/API/Country/GetAll');
                    };
                    CountriesService.prototype.GetByCode = function (code) {
                        return this.Get('/Umbraco/API/Country/GetByCode?code=' + code);
                    };
                    CountriesService.$inject = ['$http', '$q'];
                    return CountriesService;
                }(FC.Core.ServiceBase));
                Services.CountriesService = CountriesService;
                CountriesModule.GetApplication().app.service('FC.Modules.Countries.Services.CountriesService', FC.Modules.Countries.Services.CountriesService);
            })(Services = Countries.Services || (Countries.Services = {}));
        })(Countries = Modules.Countries || (Modules.Countries = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
