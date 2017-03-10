///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts" />

module FC.Modules.Rates.Services {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class RatesService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];
        private Localization: INT.IUserLocalization;
        private Euro = 0;
        private Rates: Array<FC.Core.CoreModel.KeyValuePair<string, string>>;
        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }
        public GetList(): ng.IPromise<INT.IServiceResponse<any>> {
            throw new Error("RatesService.GetList() is not available.");
        }
        //CacheManager.WriteStorage("rates", rates, 600 * 60 * 24);
        //fx.rates = CacheManager.GetStorage("rates").data;
        //CacheManager.Contains("rates")
        //this.RawJSONP('http://api.fixer.io/latest?&base=EUR&callback=JSON_CALLBACK').then(function (r) {

        EurToUc(eur: number, localization: INT.IUserLocalization, callback: Function, scope: ng.IScope): void {
            var vm = this;
            vm.Euro = eur;
            vm.Localization = localization;
            var result = "";
            var rDict = new CM.Dictionary<string, number>();
            var rates: FC.Modules.Rates.Model.Rates;
            this.RawJSONP('http://api.fixer.io/latest?&base=EUR&callback=JSON_CALLBACK').then(function (r) {
                if (r && r.data) {
                    rates = new FC.Modules.Rates.Model.Rates(r.data);
                    callback(rates, scope);
                }
            });
        }

        public Regenerate(): any { //regenerate genre cache
            this.Get('/API/News/Regenerate/');
        }
    }
    Application.app.service('FC.Modules.Rates.Services.RatesService', FC.Modules.Rates.Services.RatesService)
}