///<reference path="../Core/FC.ts"/>
module FC.Modules.Search {
    export class Search {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
        }
    }
}

var SearchModule = new FC.Modules.Search.Search(angular.module('FC.Modules.Search', ApplicationDependencies), Application);