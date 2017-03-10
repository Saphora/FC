///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
module FC.Modules.Menu.Services {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export class MenuSectionService extends FC.Core.ServiceBase implements INT.IServiceBase<MODELS.MenuSection> {
        static $inject = ['$http', '$q'];

        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuSection>>> {
            return this.GetAll();
        }

        public Search(keyword: string): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuSection>>> {
            return this.Get<IList<MODELS.MenuSection>>('/API/Menu/GetByPartialName?name=' + keyword);
        }

        public GetPaged(size: number, page: number): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuSection>>> {
            return this.Get<IList<MODELS.MenuSection>>('/API/Menu/GetPaged?size=' + size + '&page=' + page);
        }

        public GetSorted(sortIndex: string, page: number = 1): ng.IPromise<INT.IServiceResponse<IList<FC.Shared.Models.MenuSection>>> {
            return this.Get<IList<FC.Shared.Models.MenuSection>>('/API/Menu/GetSorted?sortIndex=' + sortIndex + '&page=' + page);
        }


        public GetPagedCount(page: number = 1, sortIndex: string): ng.IPromise<INT.IServiceResponse<number>> {
            return this.Get('/API/Menu/GetPagedCount?&page=' + page + '&sortIndex=' + sortIndex);
        }

        public GetAll(): ng.IPromise<INT.IServiceResponse<IList<MODELS.MenuSection>>> {
            return this.Get<IList<MODELS.MenuSection>>('/API/Menu/GetAllSections');
        }

        public GetByID(id: string): ng.IPromise<INT.IServiceResponse<MODELS.MenuSection>> {
            return this.Get<MODELS.MenuSection>('/API/Menu/GetByID?&id=' + id);
        }

        public GetByPartialName(name: string): ng.IPromise<INT.IServiceResponse<MODELS.MenuSection[]>> {
            return this.Get<IList<MODELS.MenuSection>>('/API/Menu/GetByPartialName?&name=' + name);
        }

        public Create(model: FC.Shared.Models.MenuSection): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, FC.Shared.Models.MenuSection>(
                '/API/Menu/Create',
                new FC.Shared.Models.ServiceMessage<FC.Shared.Models.MenuSection>(model));
            return result;
        }

        public Update(model: FC.Shared.Models.MenuSection): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, FC.Shared.Models.MenuSection>(
                '/API/Menu/Update',
                new FC.Shared.Models.ServiceMessage<FC.Shared.Models.MenuSection>(model));
            return result;
        }

        public Delete(model: FC.Shared.Models.MenuSection): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, FC.Shared.Models.MenuSection>(
                '/API/Menu/Delete',
                new FC.Shared.Models.ServiceMessage<FC.Shared.Models.MenuSection>(model));
            return result;
        }

        public ForceDelete(model: FC.Shared.Models.MenuSection): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, FC.Shared.Models.MenuSection>(
                '/API/Menu/ForceDelete',
                new FC.Shared.Models.ServiceMessage<FC.Shared.Models.MenuSection>(model));
            return result;
        }
    }
    MenuModule.GetApplication().app.service('FC.Modules.Menu.Services.MenuSectionService', FC.Modules.Menu.Services.MenuSectionService)
}