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
                var LineupService = (function (_super) {
                    __extends(LineupService, _super);
                    function LineupService(http, q) {
                        _super.call(this, http, q);
                    }
                    LineupService.prototype.GetList = function () {
                        return this.Get('/API/Lineups/GetList');
                    };
                    LineupService.prototype.GetByStage = function (stageID) {
                        return this.Get('/API/Lineups/GetByFestival?stageID=' + stageID);
                    };
                    LineupService.prototype.Create = function (model) {
                        var result = this.Post('/API/Lineup/Create', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    LineupService.prototype.Update = function (model) {
                        var result = this.Post('/API/Lineup/Update', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    LineupService.prototype.Delete = function (model) {
                        var result = this.Post('/API/Lineup/Delete', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    LineupService.prototype.ForceDelete = function (model) {
                        var result = this.Post('/API/Lineup/ForceDelete', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    LineupService.$inject = ['$http', '$q'];
                    return LineupService;
                }(FC.Core.ServiceBase));
                Services.LineupService = LineupService;
            })(Services = Festival.Services || (Festival.Services = {}));
        })(Festival = Modules.Festival || (Modules.Festival = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=LineupService.js.map