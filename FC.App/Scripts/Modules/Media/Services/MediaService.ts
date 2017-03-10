module FC.Modules.Media.Services {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    import ENV = FC.Core.Environment;
    export class MediaService extends FC.Core.ServiceBase {
        static $inject = ['$http', '$q'];
        public Token : FC.Shared.Util.Storage<string>;
        constructor(http: ng.IHttpService, q: ng.IQService) {
            super(http, q);
            this.Token = CacheManager.Get<string>('Token');
        }

        public GetList(): ng.IPromise<INT.IServiceResponse<IList<MODELS.Media>>> {
            return this.Get<IList<MODELS.Media>>('/API/Media/GetItemList');
        }

        public GetRoot(): ng.IPromise<INT.IServiceResponse<FC.Shared.Interfaces.IMediaDirectory>> {
            
            return this.Get<INT.IMediaDirectory>('/API/Media/GetRoot');
        }
        public GetDirectories(): ng.IPromise<INT.IServiceResponse<FC.Shared.Interfaces.IMediaDirectory[]>> {
            return this.Get<INT.IMediaDirectory[]>('/API/Media/GetDirectories');
        }
        public GetByID(id: string) {
            return this.Get<INT.IMedia>('/API/Media/GetByID?id=' + id);
        }
        public GetDirByID(id: string) {
            return this.Get<INT.IMediaDirectory>('/API/Media/GetDirByID?id=' + id);
        }

        public GetDirectoryMedia(id: string) {
            return this.Get<INT.IMedia[]>('/API/Media/GetDirectoryMedia?id=' + id);
        }

        public GetAllChildren(parentId: string) {
            return this.Get<INT.IMediaDirectory[]>('/API/Media/GetChildren?id=' + parentId);
        }

        public CreateDirectory(dir: FC.Shared.ServiceMessages.MediaDirectoryMsg): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = null;
            result = this.Post<VM.RepositoryState, FC.Shared.ServiceMessages.MediaDirectoryMsg>('/API/Media/CreateDirectory', new FC.Shared.Models.ServiceMessage<FC.Shared.ServiceMessages.MediaDirectoryMsg>(dir));
            return result;
        }

        public UploadFiles(files: Array<File>, dirID:string, token:string,  width: number = 0, height: number = 0, thumb: boolean = false): ng.IPromise<INT.IServiceResponse<FC.Shared.ViewModels.RepositoryState>> {
            var result = this.Upload<FC.Shared.ViewModels.RepositoryState>('/API/Media/Upload/?dirID=' + dirID + '&width=' + width + '&height=' + height + '&thumb=' + thumb + '&token=' + token, files);
            result.then(function (r) {
                window.dispatchEvent(new CustomEvent("MediaServiceFileUploaded", {'detail':r}));
            });
            return result;
        }

        public DeleteMedia(media: FC.Shared.Models.Media): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Get('/API/Media/DeleteMedia/?mediaID='+media.MediaID);
            return result;
        }

        public DeleteMediaDir(mediaDir: FC.Shared.Models.MediaDirectory): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Get('/API/Media/DeleteMediaDir/?id='+mediaDir.DirectoryID);
            return result;
        }

        public ForceDeleteMediaDir(mediaDir: FC.Shared.Models.MediaDirectory): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>> {
            var result = this.Get('/API/Media/ForceDeleteDirectory/?'+mediaDir.DirectoryID);
            return result;
        }

        public EditMediaDir(mediaDir: FC.Shared.Models.MediaDirectory): ng.IPromise<INT.IServiceResponse<VM.RepositoryState>>{
            var result = this.Post<VM.RepositoryState, MODELS.MediaDirectory>('/API/Media/EditDirectory', new FC.Shared.Models.ServiceMessage<MODELS.MediaDirectory>(mediaDir));
            return result;
        }
    }
}
MediaModule.GetApplication().app.service('FC.Modules.Media.Services.MediaService', FC.Modules.Media.Services.MediaService);