///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
module FC.Core.Services {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export class RolesService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];

        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.Role>>> {
            return this.Get<IList<MODELS.Role>>('/API/Auth/GetRoleList');
        }


        public Create(model: MODELS.Role): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, MODELS.Role>(
                '/API/Auth/CreateRole',
                new FC.Shared.Models.ServiceMessage<MODELS.Role>(model));
            return result;
        }

        public Update(model: MODELS.Role): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, MODELS.Role>(
                '/API/Auth/UpdateRole',
                new FC.Shared.Models.ServiceMessage<MODELS.Role>(model));
            return result;
        }

        public Delete(model: MODELS.Role): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, MODELS.Role>(
                '/API/Auth/DeleteRole',
                new FC.Shared.Models.ServiceMessage<MODELS.Role>(model));
            return result;
        }

        public ForceDelete(model: MODELS.Role): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, MODELS.Role>(
                '/API/Auth/ForceDeleteRole',
                new FC.Shared.Models.ServiceMessage<MODELS.Role>(model));
            return result;
        }
    }
}