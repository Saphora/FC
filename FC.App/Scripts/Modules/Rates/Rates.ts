///<reference path="../Core/FC.ts"/>
module FC.Modules.Rates {
    export class Rates {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
        }
    }
}

var RatesModule = new FC.Modules.Rates.Rates(angular.module('FC.Modules.Rates', ApplicationDependencies), Application);