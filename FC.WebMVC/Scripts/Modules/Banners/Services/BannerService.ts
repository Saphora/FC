module FC.Modules.Banners.Services {
    import INT = FC.Shared.Interfaces;
    export class BannerService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];

        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<any>> {
            throw new Error("BannerService.GetList() is not implemented.");
        }

        GetBanners(filter: FC.Shared.ServiceMessages.BannerFilter): ng.IPromise<FC.Shared.Interfaces.IServiceResponse<FC.Shared.Models.UBanner[]>> {
            
            return this.Post<Array<FC.Shared.Interfaces.IUBanner>, FC.Shared.ServiceMessages.BannerFilter>('/API/Banner/GetFiltered', new FC.Shared.Models.ServiceMessage<FC.Shared.ServiceMessages.BannerFilter>(filter));
        }
    }
}
BannerModule.GetApplication().app.service('FC.Modules.Banners.Services.BannerService', FC.Modules.Banners.Services.BannerService);