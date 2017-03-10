///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
module FC.Modules.Social.Services {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    import SVCMSG = FC.Shared.ServiceMessages;
    export class SocialService extends FC.Core.ServiceBase implements INT.IServiceBase<MODELS.SocialProfile> {
        static $inject = ['$http', '$q'];

        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.SocialProfileType>>> {
            return this.Get<IList<MODELS.SocialProfileType>>('/API/Social/GetList');
        }

        public GetAllTypes(): ng.IPromise<INT.IServiceResponse<IList<MODELS.SocialProfileType>>> {
            return this.Get<IList<MODELS.SocialProfileType>>("/API/Social/GetAllTypes");
        }

        public GetPagedCount(page: number = 1, sortIndex: string): ng.IPromise<INT.IServiceResponse<number>> {
            throw new Error("SocialService.GetPagedCount is not implemented yet.");
        }

        public GetAll(): ng.IPromise<INT.IServiceResponse<IList<MODELS.SocialProfile>>> {
            return this.Get<IList<MODELS.SocialProfile>>('/API/Social/GetAll');
        }

        public GetByID(id: string): ng.IPromise<INT.IServiceResponse<MODELS.SocialProfile>> {
            return this.Get<MODELS.SocialProfile>('/API/Social/GetByID?&id=' + id);
        }

        public GetByContentID(id: string): ng.IPromise<INT.IServiceResponse<MODELS.SocialProfile>> {
            return this.Get<MODELS.SocialProfile>('/API/Social/GetByContentID?&id=' + id);
        }

        public GetByPartialName(name: string): ng.IPromise<INT.IServiceResponse<IList<MODELS.SocialProfile>>> {
            return this.Get<IList<MODELS.SocialProfile>>('/API/Social/GetByPartialName?&name=' + name);
        }

        public Create(msg: FC.Shared.ServiceMessages.SocialProfileMsg): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, SVCMSG.SocialProfileMsg>(
                '/API/Social/Create',
                new MODELS.ServiceMessage<SVCMSG.SocialProfileMsg>(msg));
            return result;
        }

        public Update(model: MODELS.SocialProfile): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, MODELS.SocialProfile>(
                '/API/Social/Update',
                new MODELS.ServiceMessage<MODELS.SocialProfile>(model));
            return result;
        }

        public Delete(model: MODELS.SocialProfile): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, MODELS.SocialProfile>(
                '/API/Social/Delete',
                new MODELS.ServiceMessage<MODELS.SocialProfile>(model));
            return result;
        }

        public ForceDelete(model: MODELS.SocialProfile): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Post<VM.RepositoryState, MODELS.SocialProfile>(
                '/API/Social/ForceDelete',
                new MODELS.ServiceMessage<MODELS.SocialProfile>(model));
            return result;
        }
    }
    SocialModule.GetApplication().app.service('FC.Modules.Social.Services.SocialService', FC.Modules.Social.Services.SocialService)
}