///<reference path="../Core/FC.ts"/>
module FC.Modules.Artists {
    export class Artists {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
            this.$Application.AddRoute("/artists", "/Scripts/Modules/Artists/Views/overview.html", "FC.Modules.Artists.Controllers.ArtistOverviewController", "vm");
            this.$Application.AddRoute("/artists/:pagenum", "/Scripts/Modules/Artists/Views/overview.html", "FC.Modules.Artists.Controllers.ArtistOverviewController", "vm");
            this.$Application.AddRoute("/artists/sort/:character", "/Scripts/Modules/Artists/Views/overview.html", "FC.Modules.Artists.Controllers.ArtistOverviewController", "vm");
        }
    }
}
var ArtistsModule = new FC.Modules.Artists.Artists(angular.module('FC.Modules.Artists', ApplicationDependencies), Application);