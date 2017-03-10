///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
module FC.Modules.Menu.Services {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import VM = FC.Shared.ViewModels;
    import MODULES = FC.Modules;
    export class QuickMenuService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];

        private rootGenres: Array<FC.Shared.Models.UGenre>;

        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
            this.rootGenres = new Array<FC.Shared.Models.UGenre>();
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuSection>>> {
            return this.Get<IList<MODELS.MenuSection>>('/API/Menu/GetList');
        }

        public GetMenu(pageKey: string=''): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.MenuSection[]>> {
            if (pageKey == null) {
                pageKey = '';
            }
            return this.Get<MODELS.MenuSection[]>('/API/Menu/GetMenu?pageKey='+pageKey);
        }
        //public GetPaged(size: number, page: number): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.UGenre[]>> {
        //    return this.Get<MODELS.UGenre[]>('/API/Genre/GetPaged?size=' + size + '&page=' + page);
        //}

        //public GetSorted(sortIndex: string, page: number = 1): ng.IPromise<INT.IServiceResponse<FC.Shared.Models.UGenre[]>> {
        //    return this.Get<MODELS.UGenre[]>('/API/Genre/GetSorted?sortIndex=' + sortIndex + '&page=' + page);
        //}

        //public GetPagedCount(page: number = 1, sortIndex: string): ng.IPromise<INT.IServiceResponse<number>> {
        //    return this.Get('/API/Genre/GetPagedCount?&page=' + page + '&sortIndex=' + sortIndex);
        //}

        //public Search(key: string): ng.IPromise<INT.IServiceResponse<INT.IUGenre[]>> {
        //    return this.Get<INT.IUGenre[]>('/API/Genre/Search?name=' + key);
        //}

        //public GetByID(id: string): ng.IPromise<INT.IServiceResponse<MODELS.UGenre>> {
        //    return this.Get<MODELS.UGenre>('/API/Genre/GetByID?id=' + id);
        //}

        //public Create(genre: INT.IUGenre): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
        //    return this.Post<VM.RepositoryState, INT.IUGenre>('/API/Genre/Create', new FC.Shared.Models.ServiceMessage<INT.IUGenre>(genre));
        //}

        //public Update(genre: INT.IUGenre): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
        //    return this.Post<VM.RepositoryState, INT.IUGenre>('/API/Genre/Update', new FC.Shared.Models.ServiceMessage<INT.IUGenre>(genre));
        //}

        //public Delete(genre: INT.IUGenre): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
        //    return this.Post<VM.RepositoryState, INT.IUGenre>('/API/Genre/Delete', new FC.Shared.Models.ServiceMessage<INT.IUGenre>(genre));
        //}
        //public ForceDelete(genre: INT.IUGenre): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
        //    return this.Post<VM.RepositoryState, INT.IUGenre>('/API/Genre/ForceDelete', new FC.Shared.Models.ServiceMessage<INT.IUGenre>(genre));
        //}
    }
    GenresModule.GetApplication().app.service('FC.Modules.Menu.Services.QuickMenuService', FC.Modules.Menu.Services.QuickMenuService)
}