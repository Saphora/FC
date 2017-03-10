///<reference path="../Core/FC.ts"/>
module FC.Modules.Media {
    export class Media {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
            this.$Application.AddRoute("/media/embed-upload", "/Scripts/Modules/Media/Views/file-upload.html", "FC.Modules.Media.Controllers.MediaModalController", "vm");
            this.$Application.AddRoute("/media/browsefiles/:isxhr","/Scripts/Modules/Media/Views/files.html", "FC.Modules.Media.Controllers.MediaModalController", "vm");
        }
    }
}

var MediaModule = new FC.Modules.Media.Media(angular.module('FC.Modules.Media', ApplicationDependencies), Application);
