///<reference path="../Core/FC.ts"/>
module FC.Modules.Genres {
    export class Genres {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
            this.$Application.AddRoute("/genres", "/scripts/modules/genres/views/overview.html", "FC.Modules.Genres.Controllers.GenreOverviewController", "vm");
        }
    }
}
var GenresModule = new FC.Modules.Genres.Genres(angular.module('FC.Modules.Genres', ApplicationDependencies), Application);