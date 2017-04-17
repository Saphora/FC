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
        }
    }
}
var LocationModule = new FC.Modules.Location.Location(angular.module('FC.Modules.Location', ApplicationDependencies), Application);

