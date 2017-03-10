var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Festival;
        (function (Festival) {
            var Services;
            (function (Services) {
                var FestivalService = (function (_super) {
                    __extends(FestivalService, _super);
                    function FestivalService(http, q) {
                        _super.call(this, http, q);
                    }
                    FestivalService.prototype.GetList = function () {
                        return this.Get('/API/Festival/GetList');
                    };
                    FestivalService.prototype.GetUpcoming = function () {
                        return this.Get('/API/Festival/GetUpcoming');
                    };
                    FestivalService.prototype.GetFestival = function (festivalId) {
                        return this.Get('/API/Festival/GetByID?&id=' + festivalId);
                    };
                    FestivalService.prototype.Create = function (festival) {
                        return this.Post('/API/Festival/Create', new FC.Shared.Models.ServiceMessage(festival));
                    };
                    FestivalService.prototype.Update = function (festival) {
                        return this.Post('/API/Festival/Update', new FC.Shared.Models.ServiceMessage(festival));
                    };
                    FestivalService.prototype.Delete = function (festival) {
                        return this.Post('/API/Festival/Delete', new FC.Shared.Models.ServiceMessage(festival));
                    };
                    FestivalService.prototype.ForceDelete = function (festival) {
                        return this.Post('/API/Festival/ForceDelete', new FC.Shared.Models.ServiceMessage(festival));
                    };
                    FestivalService.$inject = ['$http', '$q'];
                    return FestivalService;
                }(FC.Core.ServiceBase));
                Services.FestivalService = FestivalService;
            })(Services = Festival.Services || (Festival.Services = {}));
        })(Festival = Modules.Festival || (Modules.Festival = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
FestivalModule.GetApplication().app.service('FC.Modules.Festival.Services.FestivalService', FC.Modules.Festival.Services.FestivalService);
//# sourceMappingURL=FestivalService.js.map