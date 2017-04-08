///<reference path="../Core/FC.ts"/>
module FC.Modules.Menu {
    export class Menu {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
        }
    }
}
var MenuModule = new FC.Modules.Menu.Menu(angular.module('FC.Modules.Menu', ApplicationDependencies), Application);