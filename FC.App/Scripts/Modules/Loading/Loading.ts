///<reference path="../Core/FC.ts" />
module FC.Modules.Loading {
    export class Loading {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
        }
    }
}

var LoadingModule = new FC.Modules.Loading.Loading(angular.module('FC.Modules.Loading', ApplicationDependencies), Application);