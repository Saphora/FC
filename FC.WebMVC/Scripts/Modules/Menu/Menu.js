///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Menu;
        (function (Menu_1) {
            var Menu = (function () {
                function Menu(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                    this.$Application.AddRoute("/menus", "/Scripts/Modules/Menu/Views/overview.html", "FC.Modules.Menu.Controllers.MenuOverviewController", "vm");
                    this.$Application.AddRoute("/menus/:pagenum", "/Scripts/Modules/Menu/Views/overview.html", "FC.Modules.Menu.Controllers.MenuOverviewController", "vm");
                    this.$Application.AddRoute("/menus/sort/:character", "/Scripts/Modules/Menu/Views/overview.html", "FC.Modules.Menu.Controllers.MenuOverviewController", "vm");
                    this.$Application.AddRoute("/menus/menuitems/create", "/Scripts/Modules/Menu/Views/create-item.html", "FC.Modules.Menu.Controllers.MenuCRUDController", "vm");
                    this.$Application.AddRoute("/menus/menuitems/create/:step", "/Scripts/Modules/Menu/Views/create-item.html", "FC.Modules.Menu.Controllers.MenuCRUDController", "vm");
                    this.$Application.AddRoute("/menus/menusections/create", "/Scripts/Modules/Menu/Views/create-section.html", "FC.Modules.Menu.Controllers.MenuCRUDController", "vm");
                    this.$Application.AddRoute("/menus/menusections/create/:step", "/Scripts/Modules/Menu/Views/create-section.html", "FC.Modules.Menu.Controllers.MenuCRUDController", "vm");
                    this.$Application.AddRoute("/menus/menuitems/edit/:menuitemid", "/Scripts/Modules/Menu/Views/create-item.html", "FC.Modules.Menu.Controllers.MenuCRUDController", "vm");
                    this.$Application.AddRoute("/menus/menusections/edit/:menusectionid", "/Scripts/Modules/Menu/Views/create-section.html", "FC.Modules.Menu.Controllers.MenuCRUDController", "vm");
                    this.$Application.AddRoute("/menus/menuitems/:sectionid", "/Scripts/Modules/Menu/Views/menuitems-overview.html", "FC.Modules.Menu.Controllers.MenuOverviewController", "vm");
                }
                Menu.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Menu;
            }());
            Menu_1.Menu = Menu;
        })(Menu = Modules.Menu || (Modules.Menu = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var MenuModule = new FC.Modules.Menu.Menu(angular.module('FC.Modules.Menu', ApplicationDependencies), Application);
//# sourceMappingURL=Menu.js.map