///<reference path="../Location.ts"/>
module FC.Modules.Location.Services {

    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;

    export class LocationService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];

        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.Location>>> {
            return this.Get<IList<MODELS.Location>>('/API/Location/GetList');
        }

        public Search(keyword: string): ng.IPromise<INT.IServiceResponse<IList<MODELS.Location>>> {
            return this.Get<IList<MODELS.Location>>('/API/Location/GetByPartialName?name=' + keyword);
        }

        public GetPaged(size: number, page: number): ng.IPromise<INT.IServiceResponse<IList<MODELS.Location>>> {
            return this.Get<IList<MODELS.Location>>('/API/Location/GetPaged?size=' + size + '&page=' + page);
        }

        public GetSorted(countryID: string, sortIndex: string, page: number = 1): ng.IPromise<INT.IServiceResponse<IList<MODELS.Location>>> {
            if (!sortIndex) {
                sortIndex = "0-9";
            }
            return this.Get<IList<FC.Shared.Models.Location>>('/API/Location/GetSorted?&countryID='+countryID+'&sortIndex=' + sortIndex + '&page=' + page);
        }


        public GetPagedCount(countryID: string, page: number = 1, sortIndex: string): ng.IPromise<INT.IServiceResponse<number>> {
            return this.Get('/API/Location/GetPagedCount?&countryID='+countryID+'&page=' + page + '&sortIndex=' + sortIndex);
        }

        public GetLocation(LocationId: string): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.Location>> {
            return this.Get<FC.Shared.Models.Location>('/API/Location/GetByID?&id=' + LocationId);
        }

        public GetByCountry(countryID: string): ng.IPromise<INT.IServiceResponse<IList<MODELS.Location>>> {
            return this.Get<FC.Shared.Models.Location[]>('/API/Location/GetByCountry?&countryID=' + countryID);
        }

        public Create(Location: FC.Shared.Models.Location): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> {
            return this.Post<VM.RepositoryState, FC.Shared.Models.Location>('/API/Location/Create', new FC.Shared.Models.ServiceMessage<FC.Shared.Models.Location>(Location));
        }

        public Update(Location: FC.Shared.Models.Location): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> {
            return this.Post<VM.RepositoryState, FC.Shared.Models.Location>('/API/Location/Update', new FC.Shared.Models.ServiceMessage<FC.Shared.Models.Location>(Location));
        }

        public Delete(Location: FC.Shared.Models.Location): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> {
            return this.Post<VM.RepositoryState, FC.Shared.Models.Location>('/API/Location/Delete', new FC.Shared.Models.ServiceMessage<FC.Shared.Models.Location>(Location));
        }

        public ForceDelete(Location: FC.Shared.Models.Location): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> {
            return this.Post<VM.RepositoryState, FC.Shared.Models.Location>('/API/Location/ForceDelete', new FC.Shared.Models.ServiceMessage<FC.Shared.Models.Location>(Location));
        }
    }
}
LocationModule.GetApplication().app.service('FC.Modules.Location.Services.LocationService', FC.Modules.Location.Services.LocationService);