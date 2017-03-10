///<reference path="../Core/FC.ts"/>
module FC.Modules.Rating {
    export class Rating {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
        }
    }
}

var RatingModule = new FC.Modules.Rating.Rating(angular.module('FC.Modules.Rating', ApplicationDependencies), Application);