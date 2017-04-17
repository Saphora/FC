module FC.Modules.Festival.Services {

    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;

    export class FestivalService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];

        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.UFestival>>> {
            return this.Get<IList<MODELS.UFestival>>('/API/Festival/GetList');
        }

        GetUpcoming(filter: FC.Shared.ServiceMessages.FestivalFilter): ng.IPromise<INT.IServiceResponse<FC.Modules.Festival.Models.FestivalListVM[]>> {
            return this.Get<FC.Modules.Festival.Models.FestivalListVM[]>('/API/Festival/GetUpcoming');
        }

        GetFestival(festivalId: string): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.UFestival>> {
            return this.Get<FC.Shared.Models.UFestival>('/API/Festival/GetByID?&id=' + festivalId);
        }


        public GetByFilter(filter: FC.Shared.ServiceMessages.FestivalFilter) {
            if (!filter.MonthNum) {
                filter.MonthNum = new Date().getMonth() + 1;
            }
            if (CacheManager.GetCookieValue("UserID")) {
                return this.Post<Array<FC.Shared.Models.FestivalListItem>, FC.Shared.ServiceMessages.FestivalFilter>('/API/Festival/GetByFilter', new FC.Shared.Models.ServiceMessage<FC.Shared.ServiceMessages.FestivalFilter>(filter));
            } else {
                return this.Post<Array<FC.Shared.Models.FestivalListItem>, FC.Shared.ServiceMessages.FestivalFilter>('/API/Festival/GetByFilter', new FC.Shared.Models.ServiceMessage<FC.Shared.ServiceMessages.FestivalFilter>(filter));
            }
        }

        Create(festival: FC.Shared.Models.UFestival): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> {
            return this.Post<VM.RepositoryState, FC.Shared.Models.UFestival>('/API/Festival/Create', new FC.Shared.Models.ServiceMessage<FC.Shared.Models.UFestival>(festival));
        }

        ToggleGenre(festivalID: string, genreID: string): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> {
            if (festivalID && genreID) {
                return this.Get<VM.RepositoryState>('/API/Festival/ToggleGenre?&festivalID=' + festivalID + "&genreID=" + genreID);
            } else {
                return null;
            }
        }

        Update(festival: FC.Shared.Models.UFestival): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> {
            return this.Post<VM.RepositoryState, FC.Shared.Models.UFestival>('/API/Festival/Update', new FC.Shared.Models.ServiceMessage<FC.Shared.Models.UFestival>(festival));
        }
        Delete(festival: FC.Shared.Models.UFestival): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> {
            return this.Post<VM.RepositoryState, FC.Shared.Models.UFestival>('/API/Festival/Delete', new FC.Shared.Models.ServiceMessage<FC.Shared.Models.UFestival>(festival));
        }
        ForceDelete(festival: FC.Shared.Models.UFestival): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> {
            return this.Post<VM.RepositoryState, FC.Shared.Models.UFestival>('/API/Festival/ForceDelete', new FC.Shared.Models.ServiceMessage<FC.Shared.Models.UFestival>(festival));
        }
       
    }
}
FestivalModule.GetApplication().app.service('FC.Modules.Festival.Services.FestivalService', FC.Modules.Festival.Services.FestivalService);