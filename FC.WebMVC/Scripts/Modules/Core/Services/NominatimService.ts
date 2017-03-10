///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts" />
///<reference path="../AppConfig.ts" />
module FC.Core.Services {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;

    export class Coordinate {
        x: number;
        y: number;
    }
    export class NominatimService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];
        private Localization: INT.IUserLocalization;
        private Euro = 0;
        private Rates: Array<FC.Core.CoreModel.KeyValuePair<string, string>>;
        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }
        //public GetUserlocation(lat: number, long: number): ng.IPromise<FC.Shared.Models.NLocation> {
        //    //var location: FC.Shared.Models.NLocation;
        //    //return this.GetRaw(Environment.GeoServicesURL+'/reverse.php?format=html&lat=' + lat + '&lon=' + long + '&format=json');
        //}
        public GetList(): ng.IPromise<INT.IServiceResponse<any>> {
            throw new Error("NominatimService.GetList() is not implemented.");
        }
        public GetCoordByCode(code: string): ng.IPromise<Coordinate> {
            return this.GetRaw(Environment.GeoServicesURL + '/search.php?format=html&countrycodes='+code+'&format=json');
        }
    }
    Application.app.service('FC.Core.Services.NominatimService', FC.Core.Services.NominatimService)
}
