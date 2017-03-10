///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
module FC.Modules.Festival.Services {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export class LineupService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];

        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.LineupItem>>> {
            return this.Get<IList<MODELS.LineupItem>>('/API/Lineups/GetList');
        }

        public GetByStage(stageID: string): ng.IPromise<INT.IServiceResponse<IList<MODELS.LineupItem>>> {
            return this.Get<IList<MODELS.LineupItem>>('/API/Lineups/GetByFestival?stageID=' + stageID);
        }

        public Create(model: MODELS.LineupItem): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, MODELS.LineupItem>(
                '/API/Lineup/Create',
                new FC.Shared.Models.ServiceMessage<MODELS.LineupItem>(model));
            return result;
        }

        public Update(model: MODELS.LineupItem): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, MODELS.LineupItem>(
                '/API/Lineup/Update',
                new FC.Shared.Models.ServiceMessage<MODELS.LineupItem>(model));
            return result;
        }

        public Delete(model: MODELS.LineupItem): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, MODELS.LineupItem>(
                '/API/Lineup/Delete',
                new FC.Shared.Models.ServiceMessage<MODELS.LineupItem>(model));
            return result;
        }

        public ForceDelete(model: MODELS.LineupItem): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, MODELS.LineupItem>(
                '/API/Lineup/ForceDelete',
                new FC.Shared.Models.ServiceMessage<MODELS.LineupItem>(model));
            return result;
        }
    }
}