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
        var Festival;
        (function (Festival) {
            var Services;
            (function (Services) {
                var StageService = (function (_super) {
                    __extends(StageService, _super);
                    function StageService(http, q) {
                        _super.call(this, http, q);
                    }
                    StageService.prototype.GetList = function () {
                        return this.Get('/API/Stages/GetList');
                    };
                    StageService.prototype.GetByFestival = function (festivalID) {
                        return this.Get('/API/Stages/GetByFestival?festivalID=' + festivalID);
                    };
                    StageService.prototype.Create = function (model) {
                        var result = this.Post('/API/Stage/Create', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    StageService.prototype.Update = function (model) {
                        var result = this.Post('/API/Stage/Update', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    StageService.prototype.Delete = function (model) {
                        var result = this.Post('/API/Stage/Delete', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    StageService.prototype.ForceDelete = function (model) {
                        var result = this.Post('/API/Stage/ForceDelete', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    StageService.$inject = ['$http', '$q'];
                    return StageService;
                }(FC.Core.ServiceBase));
                Services.StageService = StageService;
            })(Services = Festival.Services || (Festival.Services = {}));
        })(Festival = Modules.Festival || (Modules.Festival = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=StageService.js.map