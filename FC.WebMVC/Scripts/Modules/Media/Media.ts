///<reference path="../Core/FC.ts"/>
module FC.Modules.Media {
    export class Media {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
        }
    }
}

var MediaModule = new FC.Modules.Media.Media(angular.module('FC.Modules.Media', ApplicationDependencies), Application);
