///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
module FC.Modules.Menu.Services {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export class MenuItemService extends FC.Core.ServiceBase implements INT.IServiceBase<MODELS.MenuItem> {
        static $inject = ['$http', '$q'];

        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }


        public GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuItem>>> {
            return this.Get<IList<MODELS.MenuItem>>('/API/Menu/GetItemList');
        }

        public Search(keyword: string): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuItem>>> {
            return this.Get<IList<MODELS.MenuItem>>('/API/Menu/GetByPartialName?name=' + keyword);
        }

        public GetBySectionID(sectionID:string): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuItem>>> {
            return this.Get<IList<MODELS.MenuItem>>('/API/Menu/GetBySectionID?sectionID='+sectionID);
        }

        public GetPaged(size: number, page: number): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuItem>>> {
            return this.Get<IList<MODELS.MenuItem>>('/API/Menu/GetPagedMenuItem?size=' + size + '&page=' + page);
        }

        public GetSorted(sortIndex: string, page: number = 1): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuItem>>> {
            return this.Get<IList<FC.Shared.Models.MenuItem>>('/API/Menu/GetSortedMenuItem?sortIndex=' + sortIndex + '&page=' + page);
        }


        public GetPagedCount(page: number = 1, sortIndex: string): ng.IPromise<INT.IServiceResponse<number>> {
            return this.Get('/API/Menu/GetPagedCount?&page=' + page + '&sortIndex=' + sortIndex);
        }

        public GetAll(): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuItem>>> {
            return this.Get<IList<MODELS.MenuItem>>('/API/Menu/GetAllItems');
        }

        public GetByID(id: string): ng.IPromise<INT.IServiceResponse<MODELS.MenuItem>> {
            return this.Get<MODELS.MenuItem>('/API/Menu/GetMenuItemByID?&id=' + id);
        }

        public GetByPartialName(name: string): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuItem>>> {
            return this.Get<IList<MODELS.MenuItem>>('/API/Menu/GetByPartialName?&name=' + name);
        }

        public Create(model: FC.Shared.Models.MenuItem): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, FC.Shared.Models.MenuItem>(
                '/API/Menu/CreateMenuItem',
                new FC.Shared.Models.ServiceMessage<FC.Shared.Models.MenuItem>(model));
            return result;
        }

        public Update(model: FC.Shared.Models.MenuItem): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, FC.Shared.Models.MenuItem>(
                '/API/Menu/UpdateMenuItem',
                new FC.Shared.Models.ServiceMessage<FC.Shared.Models.MenuItem>(model));
            return result;
        }

        public Delete(model: FC.Shared.Models.MenuItem): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, FC.Shared.Models.MenuItem>(
                '/API/Menu/DeleteMenuItem',
                new FC.Shared.Models.ServiceMessage<FC.Shared.Models.MenuItem>(model));
            return result;
        }

        public ForceDelete(model: FC.Shared.Models.MenuItem): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, FC.Shared.Models.MenuItem>(
                '/API/Menu/ForceDelete',
                new FC.Shared.Models.ServiceMessage<FC.Shared.Models.MenuItem>(model));
            return result;
        }
    }
    MenuModule.GetApplication().app.service('FC.Modules.Menu.Services.MenuItemService', FC.Modules.Menu.Services.MenuItemService)
}