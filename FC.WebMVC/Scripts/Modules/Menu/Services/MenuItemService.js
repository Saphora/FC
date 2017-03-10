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
                var MenuItemService = (function (_super) {
                    __extends(MenuItemService, _super);
                    function MenuItemService(http, q) {
                        _super.call(this, http, q);
                    }
                    MenuItemService.prototype.GetList = function () {
                        return this.Get('/API/Menu/GetItemList');
                    };
                    MenuItemService.prototype.Search = function (keyword) {
                        return this.Get('/API/Menu/GetByPartialName?name=' + keyword);
                    };
                    MenuItemService.prototype.GetBySectionID = function (sectionID) {
                        return this.Get('/API/Menu/GetBySectionID?sectionID=' + sectionID);
                    };
                    MenuItemService.prototype.GetPaged = function (size, page) {
                        return this.Get('/API/Menu/GetPagedMenuItem?size=' + size + '&page=' + page);
                    };
                    MenuItemService.prototype.GetSorted = function (sortIndex, page) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Menu/GetSortedMenuItem?sortIndex=' + sortIndex + '&page=' + page);
                    };
                    MenuItemService.prototype.GetPagedCount = function (page, sortIndex) {
                        if (page === void 0) { page = 1; }
                        return this.Get('/API/Menu/GetPagedCount?&page=' + page + '&sortIndex=' + sortIndex);
                    };
                    MenuItemService.prototype.GetAll = function () {
                        return this.Get('/API/Menu/GetAllItems');
                    };
                    MenuItemService.prototype.GetByID = function (id) {
                        return this.Get('/API/Menu/GetMenuItemByID?&id=' + id);
                    };
                    MenuItemService.prototype.GetByPartialName = function (name) {
                        return this.Get('/API/Menu/GetByPartialName?&name=' + name);
                    };
                    MenuItemService.prototype.Create = function (model) {
                        var result = this.Post('/API/Menu/CreateMenuItem', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    MenuItemService.prototype.Update = function (model) {
                        var result = this.Post('/API/Menu/UpdateMenuItem', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    MenuItemService.prototype.Delete = function (model) {
                        var result = this.Post('/API/Menu/DeleteMenuItem', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    MenuItemService.prototype.ForceDelete = function (model) {
                        var result = this.Post('/API/Menu/ForceDelete', new FC.Shared.Models.ServiceMessage(model));
                        return result;
                    };
                    MenuItemService.$inject = ['$http', '$q'];
                    return MenuItemService;
                }(FC.Core.ServiceBase));
                Services.MenuItemService = MenuItemService;
                MenuModule.GetApplication().app.service('FC.Modules.Menu.Services.MenuItemService', FC.Modules.Menu.Services.MenuItemService);
            })(Services = Menu.Services || (Menu.Services = {}));
        })(Menu = Modules.Menu || (Modules.Menu = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=MenuItemService.js.map