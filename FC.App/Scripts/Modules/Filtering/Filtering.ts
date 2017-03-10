///<reference path="../Core/FC.ts"/>
module FC.Modules.Filtering {
    export class Filtering {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
        }
    }
}

var FilteringModule = new FC.Modules.Filtering.Filtering(angular.module('FC.Modules.Filtering', ApplicationDependencies), Application);