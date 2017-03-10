///<reference path="../Core/FC.ts"/>
module FC.Modules.Countries {
    export class Countries {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
            this.$Application.AddRoute("/countries", "/Scripts/Modules/Countries/Views/overview.html", "FC.Modules.Countries.Controllers.CountryOverviewController", "vm");
            this.$Application.AddRoute("/countries/:pagenum", "/Scripts/Modules/Countries/Views/overview.html", "FC.Modules.Countries.Controllers.CountryOverviewController", "vm");
            this.$Application.AddRoute("/countries/sort/:character", "/Scripts/Modules/Countries/Views/overview.html", "FC.Modules.Countries.Controllers.CountryOverviewController", "vm");
        }
    }
}
var CountriesModule = new FC.Modules.Countries.Countries(angular.module('FC.Modules.Countries', ApplicationDependencies), Application);