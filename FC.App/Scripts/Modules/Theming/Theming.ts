///<reference path="../Core/FC.ts"/>
module FC.Modules.Theming {
    export class Theming {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
        }
    }
}
var ThemingModule = new FC.Modules.Theming.Theming(angular.module('FC.Modules.Theming', ApplicationDependencies), Application);