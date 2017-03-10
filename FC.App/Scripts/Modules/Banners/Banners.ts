///<reference path="../Core/FC.ts"/>
module FC.Modules.Banners {
    export class Banners {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
        }
    }
}

var BannerModule = new FC.Modules.Banners.Banners(angular.module('FC.Modules.Banners', ApplicationDependencies), Application);