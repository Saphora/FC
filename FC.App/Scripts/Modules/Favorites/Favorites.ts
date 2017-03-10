///<reference path="../Core/FC.ts"/>
module FC.Modules.Favorites {
    export class Favorites {
        public $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
        }
    }
}
var FavoritesModule = new FC.Modules.Favorites.Favorites(angular.module('FC.Modules.Favorites', ApplicationDependencies), Application);
