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
        var Menu;
        (function (Menu) {
            var Services;
            (function (Services) {
                var QuickMenuService = (function (_super) {
                    __extends(QuickMenuService, _super);
                    function QuickMenuService(http, q) {
                        _super.call(this, http, q);
                        this.rootGenres = new Array();
                    }
                    QuickMenuService.prototype.GetList = function () {
                        return this.Get('/API/Menu/GetList');
                    };
                    QuickMenuService.prototype.GetMenu = function (pageKey) {
                        if (pageKey === void 0) { pageKey = ''; }
                        if (pageKey == null) {
                            pageKey = '';
                        }
                        return this.Get('/API/Menu/GetMenu?pageKey=' + pageKey);
                    };
                    QuickMenuService.$inject = ['$http', '$q'];
                    return QuickMenuService;
                }(FC.Core.ServiceBase));
                Services.QuickMenuService = QuickMenuService;
                GenresModule.GetApplication().app.service('FC.Modules.Menu.Services.QuickMenuService', FC.Modules.Menu.Services.QuickMenuService);
            })(Services = Menu.Services || (Menu.Services = {}));
        })(Menu = Modules.Menu || (Modules.Menu = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=QuickMenuService.js.map