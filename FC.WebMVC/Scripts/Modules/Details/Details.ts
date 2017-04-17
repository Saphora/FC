///<reference path="../Core/FC.ts"/>
module FC.Modules.Details {
    export class Details {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        static $inject = ['$location', 'FC.Core.Services.AuthService'];
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
        }
    }
}
var DetailsModule = new FC.Modules.Details.Details(angular.module('FC.Modules.Details', ApplicationDependencies), Application);

