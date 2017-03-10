var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Artists;
        (function (Artists) {
            var Services;
            (function (Services) {
                var ArtistService = (function (_super) {
                    __extends(ArtistService, _super);
                    function ArtistService(http, q) {
                        _super.call(this, http, q);
                    }
                    ArtistService.prototype.GetList = function () {
                        return this.GetAll();
                    };
                    ArtistService.prototype.Search = function (keyword) {
                        return this.Get('/API/Artist/GetByPartialName?name=' + keyword);
                    };
                    ArtistService.prototype.GetPaged = function (size, page) {
                        return this.Get('/API/Artist/GetPaged?size=' + size + '&page=' + page);
                    };
                    ArtistService.prototype.GetSorted = function (sortIndex, page) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Artist/GetSorted?sortIndex=' + sortIndex + '&page=' + page);
                    };
                    ArtistService.prototype.GetPagedCount = function (page, sortIndex) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Artist/GetPagedCount?&page=' + page + '&sortIndex=' + sortIndex);
                    };
                    ArtistService.prototype.GetAll = function () {
                        return this.Get('/API/Artist/GetAll');
                    };
                    ArtistService.prototype.GetByID = function (id) {
                        return this.Get('/API/Artist/GetByID?&id=' + id);
                    };
                    ArtistService.prototype.GetByPartialName = function (name) {
                        return this.Get('/API/Artist/GetByPartialName?&name=' + name);
                    };
                    ArtistService.prototype.Create = function (model) {
                        var result = this.Post('/API/Artist/Create', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    ArtistService.prototype.Update = function (model) {
                        var result = this.Post('/API/Artist/Update', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    ArtistService.prototype.Delete = function (model) {
                        var result = this.Post('/API/Artist/Delete', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    ArtistService.prototype.ForceDelete = function (model) {
                        var result = this.Post('/API/Artist/ForceDelete', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    ArtistService.$inject = ['$http', '$q'];
                    return ArtistService;
                }(FC.Core.ServiceBase));
                Services.ArtistService = ArtistService;
                ArtistsModule.GetApplication().app.service('FC.Modules.Artists.Services.ArtistService', FC.Modules.Artists.Services.ArtistService);
            })(Services = Artists.Services || (Artists.Services = {}));
        })(Artists = Modules.Artists || (Modules.Artists = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=ArtistService.js.map