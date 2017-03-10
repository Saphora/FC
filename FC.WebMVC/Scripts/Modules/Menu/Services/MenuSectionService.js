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
                var MenuSectionService = (function (_super) {
                    __extends(MenuSectionService, _super);
                    function MenuSectionService(http, q) {
                        _super.call(this, http, q);
                    }
                    MenuSectionService.prototype.GetList = function () {
                        return this.GetAll();
                    };
                    MenuSectionService.prototype.Search = function (keyword) {
                        return this.Get('/API/Menu/GetByPartialName?name=' + keyword);
                    };
                    MenuSectionService.prototype.GetPaged = function (size, page) {
                        return this.Get('/API/Menu/GetPaged?size=' + size + '&page=' + page);
                    };
                    MenuSectionService.prototype.GetSorted = function (sortIndex, page) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Menu/GetSorted?sortIndex=' + sortIndex + '&page=' + page);
                    };
                    MenuSectionService.prototype.GetPagedCount = function (page, sortIndex) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Menu/GetPagedCount?&page=' + page + '&sortIndex=' + sortIndex);
                    };
                    MenuSectionService.prototype.GetAll = function () {
                        return this.Get('/API/Menu/GetAllSections');
                    };
                    MenuSectionService.prototype.GetByID = function (id) {
                        return this.Get('/API/Menu/GetByID?&id=' + id);
                    };
                    MenuSectionService.prototype.GetByPartialName = function (name) {
                        return this.Get('/API/Menu/GetByPartialName?&name=' + name);
                    };
                    MenuSectionService.prototype.Create = function (model) {
                        var result = this.Post('/API/Menu/Create', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    MenuSectionService.prototype.Update = function (model) {
                        var result = this.Post('/API/Menu/Update', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    MenuSectionService.prototype.Delete = function (model) {
                        var result = this.Post('/API/Menu/Delete', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    MenuSectionService.prototype.ForceDelete = function (model) {
                        var result = this.Post('/API/Menu/ForceDelete', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    MenuSectionService.$inject = ['$http', '$q'];
                    return MenuSectionService;
                }(FC.Core.ServiceBase));
                Services.MenuSectionService = MenuSectionService;
                MenuModule.GetApplication().app.service('FC.Modules.Menu.Services.MenuSectionService', FC.Modules.Menu.Services.MenuSectionService);
            })(Services = Menu.Services || (Menu.Services = {}));
        })(Menu = Modules.Menu || (Modules.Menu = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=MenuSectionService.js.map