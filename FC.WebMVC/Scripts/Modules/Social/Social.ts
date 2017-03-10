///<reference path="../Core/FC.ts"/>
module FC.Modules.Social {
    export class Social {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
        }
    }
}
var SocialModule = new FC.Modules.Social.Social(angular.module('FC.Modules.Social', ApplicationDependencies), Application);