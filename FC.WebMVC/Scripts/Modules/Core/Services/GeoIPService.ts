//?q=77.251.172.231
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts" />
///<reference path="../AppConfig.ts" />
module FC.Core.Services {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class GeoIPService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];
        private Localization: INT.IUserLocalization;
        private Euro = 0;
        private Rates: Array<FC.Core.CoreModel.KeyValuePair<string, string>>;
        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.Media>>> {
            throw new Error("GeoIPService.GetList() is not implemented.");
        }

        public GetByIP(ip?: string): ng.IPromise<INT.IServiceResponse<INT.IFreeGeoIPModel>> {
            if (ip) {
                return this.GetRaw(Environment.GeoIPURL + '?q=' + ip);
            } else {
                return this.GetRaw(Environment.GeoIPURL);
            }
        }
    }
    Application.app.service('FC.Core.Services.NominatimService', FC.Core.Services.NominatimService)
}
