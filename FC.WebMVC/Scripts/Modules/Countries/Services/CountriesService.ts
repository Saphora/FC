///<reference path="../../Core/FC.ts"/>
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../Countries.ts"/>
module FC.Modules.Countries.Services {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class CountriesService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];

        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.UCountry>>> {
            return this.GetAll();
        }

        public GetPaged(size: number, page: number): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.UCountry[]>> {
            return this.Get<MODELS.UCountry[]>('/API/Country/GetPaged?size=' + size + '&page=' + page);
        }
        public Search(name:string): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.UCountry[]>> {
            return this.Get<MODELS.UCountry[]>('/API/Country/Search?name='+name);
        }

        public GetSorted(sortIndex: string, page: number = 1): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.UCountry[]>> {
            return this.Get<MODELS.UCountry[]>('/API/Country/GetSorted?sortIndex=' + sortIndex + '&page=' + page);
        }

        public GetPagedCount(page: number = 1, sortIndex: string): ng.IPromise<INT.IServiceResponse<number>> {
            return this.Get('/API/Country/GetPagedCount?&page=' + page + '&sortIndex=' + sortIndex);
        }

        GetCountry(id: string): ng.IPromise<INT.IServiceResponse<INT.IUCountry>> {
            return this.Get('/API/Country/GetByID?id='+id);
        }

        GetAll(): ng.IPromise<INT.IServiceResponse<INT.IUCountry[]>> {
            return this.Get('/API/Country/GetAll');
        }
        GetByCode(code:string): ng.IPromise<INT.IServiceResponse<INT.IUCountry>> {
            return this.Get('/API/Country/GetByCode?code='+code);
        }

        Create(model: FC.Shared.Models.UCountry): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> {
            return null;
        }
        Delete(model: FC.Shared.Models.UCountry): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> {
            return null;
        }
        Update(model: FC.Shared.Models.UCountry): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> {
            return null;
        }
        ForceDelete(model: FC.Shared.Models.UCountry): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> {
            return null;
        }
    }
    CountriesModule.GetApplication().app.service('FC.Modules.Countries.Services.CountriesService', FC.Modules.Countries.Services.CountriesService)
}