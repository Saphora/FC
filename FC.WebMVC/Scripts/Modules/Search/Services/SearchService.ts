module FC.Modules.Search.Services {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export class SearchService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];

        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.UTheme>>> {
            throw new Error("SearchService GetList is not available");
        }

        Search(filter: FC.Shared.ServiceMessages.SearchFilter): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.FestivalListItem[]>> {
            return this.Post<MODELS.FestivalListItem[], FC.Shared.ServiceMessages.SearchFilter>('/API/Search/Search', new FC.Shared.Models.ServiceMessage<FC.Shared.ServiceMessages.SearchFilter>(filter));
        }
    }
}
SearchModule.GetApplication().app.service('FC.Modules.Search.Services.SearchService', FC.Modules.Search.Services.SearchService);