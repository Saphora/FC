///<reference path="../Core/FC.ts"/>
module FC.Modules.Location {
    export class Location {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        static $inject = ['$location', 'FC.Core.Services.AuthService'];
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
            this.$Application.AddRoute("/locations", "/Scripts/Modules/Location/Views/overview.html", "FC.Modules.Location.Controllers.LocationOverviewController", "vm");
            this.$Application.AddRoute("/locations/details/:LocationID", "/Scripts/Modules/Location/Views/details.html", "FC.Modules.Details.Controllers.LocationDetailsController", "vm");
            this.$Application.AddRoute("/locations/create", "/Scripts/Modules/Location/Views/create.html", "FC.Modules.Location.Controllers.LocationCRUDController", "vm");
            this.$Application.AddRoute("/locations/create/:step", "/Scripts/Modules/Location/Views/create.html", "FC.Modules.Location.Controllers.LocationCRUDController", "vm");
            this.$Application.AddRoute("/locations/edit/:LocationID", "/Scripts/Modules/Location/Views/create.html", "FC.Modules.Location.Controllers.LocationCRUDController", "vm");
            this.$Application.AddRoute("/locations/delete/:LocationID", "/Scripts/Modules/Location/Views/overview.html", "FC.Modules.Location.Controllers.LocationCRUDController", "vm");

        }
    }
}
var LocationModule = new FC.Modules.Location.Location(angular.module('FC.Modules.Location', ApplicationDependencies), Application);

