///<reference path="../Core/FC.ts"/>
module FC.Modules.Menu {
    export class Menu {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
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
    }
}
var MenuModule = new FC.Modules.Menu.Menu(angular.module('FC.Modules.Menu', ApplicationDependencies), Application);