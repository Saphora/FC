///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Rates;
        (function (Rates) {
            var Services;
            (function (Services) {
                var CM = FC.Core.CoreModel;
                var RatesService = (function (_super) {
                    __extends(RatesService, _super);
                    function RatesService(http, q) {
                        _super.call(this, http, q);
                        this.Euro = 0;
                    }
                    //CacheManager.WriteStorage("rates", rates, 600 * 60 * 24);
                    //fx.rates = CacheManager.GetStorage("rates").data;
                    //CacheManager.Contains("rates")
                    //this.RawJSONP('http://api.fixer.io/latest?&base=EUR&callback=JSON_CALLBACK').then(function (r) {
                    RatesService.prototype.EurToUc = function (eur, localization, callback, scope) {
                        var vm = this;
                        vm.Euro = eur;
                        vm.Localization = localization;
                        var result = "";
                        var rDict = new CM.Dictionary();
                        var rates;
                        this.RawJSONP('http://api.fixer.io/latest?&base=EUR&callback=JSON_CALLBACK').then(function (r) {
                            if (r && r.data) {
                                rates = new FC.Modules.Rates.Model.Rates(r.data);
                                callback(rates, scope);
                            }
                        });
                    };
                    RatesService.prototype.Regenerate = function () {
                        this.Get('/Umbraco/API/News/Regenerate/');
                    };
                    RatesService.$inject = ['$http', '$q'];
                    return RatesService;
                }(FC.Core.ServiceBase));
                Services.RatesService = RatesService;
                Application.app.service('FC.Modules.Rates.Services.RatesService', FC.Modules.Rates.Services.RatesService);
            })(Services = Rates.Services || (Rates.Services = {}));
        })(Rates = Modules.Rates || (Modules.Rates = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
