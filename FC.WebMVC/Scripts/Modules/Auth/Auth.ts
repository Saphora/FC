///<reference path="../Core/FC.ts"/>
module FC.Modules.Auth {
    export class Auth {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
        }
    }
}
var AuthModule = new FC.Modules.Auth.Auth(angular.module('FC.Modules.Auth', ApplicationDependencies), Application);