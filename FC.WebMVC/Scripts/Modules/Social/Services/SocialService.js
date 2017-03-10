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
        var Social;
        (function (Social) {
            var Services;
            (function (Services) {
                var MODELS = FC.Shared.Models;
                var SocialService = (function (_super) {
                    __extends(SocialService, _super);
                    function SocialService(http, q) {
                        _super.call(this, http, q);
                    }
                    SocialService.prototype.GetList = function () {
                        return this.Get('/API/Social/GetList');
                    };
                    SocialService.prototype.GetAllTypes = function () {
                        return this.Get("/API/Social/GetAllTypes");
                    };
                    SocialService.prototype.GetPagedCount = function (page, sortIndex) {
                        if (page === void 0) { page = 1; }
                        throw new Error("SocialService.GetPagedCount is not implemented yet.");
                    };
                    SocialService.prototype.GetAll = function () {
                        return this.Get('/API/Social/GetAll');
                    };
                    SocialService.prototype.GetByID = function (id) {
                        return this.Get('/API/Social/GetByID?&id=' + id);
                    };
                    SocialService.prototype.GetByContentID = function (id) {
                        return this.Get('/API/Social/GetByContentID?&id=' + id);
                    };
                    SocialService.prototype.GetByPartialName = function (name) {
                        return this.Get('/API/Social/GetByPartialName?&name=' + name);
                    };
                    SocialService.prototype.Create = function (msg) {
                        var result = this.Post('/API/Social/Create', new MODELS.ServiceMessage(msg));
                        return result;
                    };
                    SocialService.prototype.Update = function (model) {
                        var result = this.Post('/API/Social/Update', new MODELS.ServiceMessage(model));
                        return result;
                    };
                    SocialService.prototype.Delete = function (model) {
                        var result = this.Post('/API/Social/Delete', new MODELS.ServiceMessage(model));
                        return result;
                    };
                    SocialService.prototype.ForceDelete = function (model) {
                        var result = this.Post('/API/Social/ForceDelete', new MODELS.ServiceMessage(model));
                        return result;
                    };
                    SocialService.$inject = ['$http', '$q'];
                    return SocialService;
                }(FC.Core.ServiceBase));
                Services.SocialService = SocialService;
                SocialModule.GetApplication().app.service('FC.Modules.Social.Services.SocialService', FC.Modules.Social.Services.SocialService);
            })(Services = Social.Services || (Social.Services = {}));
        })(Social = Modules.Social || (Modules.Social = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=SocialService.js.map