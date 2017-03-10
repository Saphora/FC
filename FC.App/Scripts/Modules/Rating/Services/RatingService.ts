module FC.Modules.Rating.Services {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class RatingService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];

        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<any>> {
            throw new Error("Rating service GetList is not available");
        }

        GetRate(ContentItemID: string, ContentItemType: string): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RatingVm>> {
            return this.Get<FC.Shared.ViewModels.RatingVm>('/API/Rating/GetRating?&contentItemID=' + ContentItemID + '&type=' + ContentItemType);
        }

        Rate(ContentItemID: string, ContentItemType: string, CreditAmmount:number): ng.IPromise<INT.IServiceResponse<string>> {
            var msg = new FC.Shared.ServiceMessages.RatingMsg();
            if (CreditAmmount <= 5) {
                msg.CreditAmmount = CreditAmmount;
                msg.ContentType = ContentItemType;
                msg.ContentItemID = ContentItemID;
                return this.Post<string, FC.Shared.ServiceMessages.RatingMsg>('/API/Rating/Rate', new FC.Shared.Models.ServiceMessage<FC.Shared.ServiceMessages.RatingMsg>(msg));
            } else {
                return null;
            }
        }
    }
}
RatingModule.GetApplication().app.service('FC.Modules.Rating.Services.RatingService', FC.Modules.Rating.Services.RatingService);