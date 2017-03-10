///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
module FC.Modules.Festival.Services {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export class StageService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];

        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.Stage>>> {
            return this.Get<IList<MODELS.Stage>>('/API/Stages/GetList');
        }

        public GetByFestival(festivalID:string): ng.IPromise<INT.IServiceResponse<IList<MODELS.Stage>>> {
            return this.Get<IList<MODELS.Stage>>('/API/Stages/GetByFestival?festivalID='+festivalID);
        }

        public Create(model: MODELS.Stage): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, MODELS.Stage>(
                '/API/Stage/Create',
                new FC.Shared.Models.ServiceMessage<MODELS.Stage>(model));
            return result;
        }

        public Update(model: MODELS.Stage): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, MODELS.Stage>(
                '/API/Stage/Update',
                new FC.Shared.Models.ServiceMessage<MODELS.Stage>(model));
            return result;
        }

        public Delete(model: MODELS.Stage): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, MODELS.Stage>(
                '/API/Stage/Delete',
                new FC.Shared.Models.ServiceMessage<MODELS.Stage>(model));
            return result;
        }

        public ForceDelete(model: MODELS.Stage): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, MODELS.Stage>(
                '/API/Stage/ForceDelete',
                new FC.Shared.Models.ServiceMessage<MODELS.Stage>(model));
            return result;
        }
    }
}