var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Media;
        (function (Media) {
            var Services;
            (function (Services) {
                var MediaService = (function (_super) {
                    __extends(MediaService, _super);
                    function MediaService(http, q) {
                        _super.call(this, http, q);
                        this.Token = CacheManager.Get('Token');
                    }
                    MediaService.prototype.GetList = function () {
                        return this.Get('/API/Media/GetItemList');
                    };
                    MediaService.prototype.GetRoot = function () {
                        return this.Get('/API/Media/GetRoot');
                    };
                    MediaService.prototype.GetDirectories = function () {
                        return this.Get('/API/Media/GetDirectories');
                    };
                    MediaService.prototype.GetByID = function (id) {
                        return this.Get('/API/Media/GetByID?id=' + id);
                    };
                    MediaService.prototype.GetDirByID = function (id) {
                        return this.Get('/API/Media/GetDirByID?id=' + id);
                    };
                    MediaService.prototype.GetDirectoryMedia = function (id) {
                        return this.Get('/API/Media/GetDirectoryMedia?id=' + id);
                    };
                    MediaService.prototype.GetAllChildren = function (parentId) {
                        return this.Get('/API/Media/GetChildren?id=' + parentId);
                    };
                    MediaService.prototype.CreateDirectory = function (dir) {
                        var result = null;
                        result = this.Post('/API/Media/CreateDirectory', new FC.Shared.Models.ServiceMessage(dir));
                        return result;
                    };
                    MediaService.prototype.UploadFiles = function (files, dirID, token, width, height, thumb) {
                        if (width === void 0) { width = 0; }
                        if (height === void 0) { height = 0; }
                        if (thumb === void 0) { thumb = false; }
                        var result = this.Upload('/API/Media/Upload/?dirID=' + dirID + '&width=' + width + '&height=' + height + '&thumb=' + thumb + '&token=' + token, files);
                        result.then(function (r) {
                            window.dispatchEvent(new CustomEvent("MediaServiceFileUploaded", { 'detail': r }));
                        });
                        return result;
                    };
                    MediaService.prototype.DeleteMedia = function (media) {
                        var result = this.Get('/API/Media/DeleteMedia/?mediaID=' + media.MediaID);
                        return result;
                    };
                    MediaService.prototype.DeleteMediaDir = function (mediaDir) {
                        var result = this.Get('/API/Media/DeleteMediaDir/?id=' + mediaDir.DirectoryID);
                        return result;
                    };
                    MediaService.prototype.ForceDeleteMediaDir = function (mediaDir) {
                        var result = this.Get('/API/Media/ForceDeleteDirectory/?' + mediaDir.DirectoryID);
                        return result;
                    };
                    MediaService.prototype.EditMediaDir = function (mediaDir) {
                        var result = this.Post('/API/Media/EditDirectory', new FC.Shared.Models.ServiceMessage(mediaDir));
                        return result;
                    };
                    MediaService.$inject = ['$http', '$q'];
                    return MediaService;
                }(FC.Core.ServiceBase));
                Services.MediaService = MediaService;
            })(Services = Media.Services || (Media.Services = {}));
        })(Media = Modules.Media || (Modules.Media = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
MediaModule.GetApplication().app.service('FC.Modules.Media.Services.MediaService', FC.Modules.Media.Services.MediaService);
//# sourceMappingURL=MediaService.js.map