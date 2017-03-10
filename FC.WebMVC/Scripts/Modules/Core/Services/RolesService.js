var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/ServiceBase.ts" />
///<reference path="../../../Shared/Util/CacheManager.ts" />
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Services;
        (function (Services) {
            var RolesService = (function (_super) {
                __extends(RolesService, _super);
                function RolesService(http, q) {
                    _super.call(this, http, q);
                }
                RolesService.prototype.GetList = function () {
                    return this.Get('/API/Auth/GetRoleList');
                };
                RolesService.prototype.Create = function (model) {
                    var result = this.Post('/API/Auth/CreateRole', new FC.Shared.Models.ServiceMessage(model));
                    return result;
                };
                RolesService.prototype.Update = function (model) {
                    var result = this.Post('/API/Auth/UpdateRole', new FC.Shared.Models.ServiceMessage(model));
                    return result;
                };
                RolesService.prototype.Delete = function (model) {
                    var result = this.Post('/API/Auth/DeleteRole', new FC.Shared.Models.ServiceMessage(model));
                    return result;
                };
                RolesService.prototype.ForceDelete = function (model) {
                    var result = this.Post('/API/Auth/ForceDeleteRole', new FC.Shared.Models.ServiceMessage(model));
                    return result;
                };
                RolesService.$inject = ['$http', '$q'];
                return RolesService;
            }(FC.Core.ServiceBase));
            Services.RolesService = RolesService;
        })(Services = Core.Services || (Core.Services = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
//# sourceMappingURL=RolesService.js.map