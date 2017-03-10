///<reference path="../Location.ts"/>
module FC.Modules.Location.Services {

    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;

    export class GeonamesService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];

        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }

        /**
         * The gets the english city name by postalcode & two letter country code
         * @param postalcode (6832) etc.
         * @param country (NL, UK, US) etc.
         */
        public Search(postalcode, country): ng.IPromise<any> {
            return this.GetRaw('http://api.geonames.org/postalCodeSearchJSON?postalcode=' + postalcode + '&maxRows=10&username=festivalcalendar&country=' + country);
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<any>> {
            throw new Error("GeonamesService.GetList() is not implemented.");
        }
        

    }
}
LocationModule.GetApplication().app.service('FC.Modules.Location.Services.GeonamesService', FC.Modules.Location.Services.GeonamesService);