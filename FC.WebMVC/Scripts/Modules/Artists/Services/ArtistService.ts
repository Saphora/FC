///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
module FC.Modules.Artists.Services {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export class ArtistService extends FC.Core.ServiceBase implements INT.IServiceBase<MODELS.UArtist> {
        static $inject = ['$http', '$q'];

        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<any>> {
            return this.GetAll();
        }

        public Search(keyword: string): ng.IPromise<INT.IServiceResponse<INT.IArtistListVm[]>> {
            return this.Get<INT.IArtistListVm[]>('/API/Artist/GetByPartialName?name=' + keyword);
        }

        public GetPaged(size: number, page: number): ng.IPromise<INT.IServiceResponse<INT.IArtistListVm[]>> {
            return this.Get<INT.IArtistListVm[]>('/API/Artist/GetPaged?size=' + size + '&page=' + page);
        }

        public GetSorted(sortIndex:string,page:number=1): ng.IPromise<INT.IServiceResponse<FC.Modules.Artists.Models.ArtistListVM[]>> {
            return this.Get<FC.Modules.Artists.Models.ArtistListVM[]>('/API/Artist/GetSorted?sortIndex='+sortIndex+'&page='+page);
        }
        

        public GetPagedCount(page: number = 1, sortIndex: string): ng.IPromise<INT.IServiceResponse<number>> {
            return this.Get('/API/Artist/GetPagedCount?&page=' + page + '&sortIndex='+sortIndex);
        }

        public GetAll(): ng.IPromise<INT.IServiceResponse<MODELS.UArtist[]>> {
            return this.Get<MODELS.UArtist[]>('/API/Artist/GetAll');
        }

        public GetByID(id:string): ng.IPromise<INT.IServiceResponse<MODELS.UArtist>> {
            return this.Get<MODELS.UArtist>('/API/Artist/GetByID?&id='+id);
        }

        public GetByPartialName(name: string): ng.IPromise<INT.IServiceResponse<MODELS.UArtist[]>> {
            return this.Get<MODELS.UArtist[]>('/API/Artist/GetByPartialName?&name=' + name);
        }

        public Create(model: FC.Shared.Models.UArtist): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, FC.Shared.Models.UArtist>(
                '/API/Artist/Create',
                new FC.Shared.Models.ServiceMessage<FC.Shared.Models.UArtist>(model));
            return result;
        }

        public Update(model: FC.Shared.Models.UArtist): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, FC.Shared.Models.UArtist>(
                '/API/Artist/Update',
                new FC.Shared.Models.ServiceMessage<FC.Shared.Models.UArtist>(model));
            return result;
        }

        public Delete(model: FC.Shared.Models.UArtist): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, FC.Shared.Models.UArtist>(
                '/API/Artist/Delete',
                new FC.Shared.Models.ServiceMessage<FC.Shared.Models.UArtist>(model));
            return result;
        }

        public ForceDelete(model: FC.Shared.Models.UArtist): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, FC.Shared.Models.UArtist>(
                '/API/Artist/ForceDelete',
                new FC.Shared.Models.ServiceMessage<FC.Shared.Models.UArtist>(model));
            return result;
        }
    }
    ArtistsModule.GetApplication().app.service('FC.Modules.Artists.Services.ArtistService', FC.Modules.Artists.Services.ArtistService)
}