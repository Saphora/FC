///<reference path="../ServiceBase.ts" />
module FC.Core.Services {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class LocalizationService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];

        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<any>> {
            throw new Error("LocalizationService.GetList() is not implemented.");
        }

        GetLocaleInfo(): ng.IPromise<INT.IServiceResponse<Localization>> {
            return this.Get<Localization>('/API/Localization/GetLocaleInfo');
        }
        public Regenerate(): any { //regenerate genre cache
            this.Get('/API/Festival/Regenerate/');
        }
    }
    Application.app.service('FC.Core.Services.LocalizationService', FC.Core.Services.LocalizationService)
}