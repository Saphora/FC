var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../Countries.ts"/>
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
                    CountriesService.prototype.GetList = function () {
                        return this.GetAll();
                    };
                    CountriesService.prototype.GetPaged = function (size, page) {
                        return this.Get('/API/Country/GetPaged?size=' + size + '&page=' + page);
                    };
                    CountriesService.prototype.GetSorted = function (sortIndex, page) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Country/GetSorted?sortIndex=' + sortIndex + '&page=' + page);
                    };
                    CountriesService.prototype.GetPagedCount = function (page, sortIndex) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Country/GetPagedCount?&page=' + page + '&sortIndex=' + sortIndex);
                    };
                    CountriesService.prototype.GetCountry = function (id) {
                        return this.Get('/API/Country/GetByID?id=' + id);
                    };
                    CountriesService.prototype.GetAll = function () {
                        return this.Get('/API/Country/GetAll');
                    };
                    CountriesService.prototype.GetByCode = function (code) {
                        return this.Get('/API/Country/GetByCode?code=' + code);
                    };
                    CountriesService.prototype.Create = function (model) {
                        return null;
                    };
                    CountriesService.prototype.Delete = function (model) {
                        return null;
                    };
                    CountriesService.prototype.Update = function (model) {
                        return null;
                    };
                    CountriesService.prototype.ForceDelete = function (model) {
                        return null;
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
//# sourceMappingURL=CountriesService.js.map