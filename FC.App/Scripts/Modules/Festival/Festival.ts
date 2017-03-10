///<reference path="../Core/FC.ts"/>
module FC.Modules.Festival {
    export class Festival {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        static $inject = ['$location', 'FC.Core.Services.AuthService'];
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
            this.$Application.AddRoute("/festival/add", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
            this.$Application.AddRoute("/festival/add/:step", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
            this.$Application.AddRoute("/festival/add/:step", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
            this.$Application.AddRoute("/festival/add/:step", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
            this.$Application.AddRoute("/festival/add/confirm", "/Scripts/Modules/Festival/Views/wizard/confirmation.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
            this.$Application.AddRoute("/festival/add/error", "/Scripts/Modules/Festival/Views/wizard/error.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");

            this.$Application.AddRoute("/festival/edit/:festivalID", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
            this.$Application.AddRoute("/festival/publish/:festivalID", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
            this.$Application.AddRoute("/festival/delete/:festivalID", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
            this.$Application.AddRoute("/festival/edit/:festivalID/:step", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
            this.$Application.AddRoute("/festival/edit/:festivalID/:step", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
            this.$Application.AddRoute("/festival/edit/:festivalID/:step", "/Scripts/Modules/Festival/Views/wizard/wizard.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
            this.$Application.AddRoute("/festival/edit/:festivalID/confirm", "/Scripts/Modules/Festival/Views/wizard/confirmation.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
            this.$Application.AddRoute("/festival/edit/:festivalID/error", "/Scripts/Modules/Festival/Views/wizard/error.html", "FC.Modules.Festival.Controllers.FestivalCRUDController", "vm");
        }
    }
}
var FestivalModule = new FC.Modules.Festival.Festival(angular.module('FC.Modules.Festival', ApplicationDependencies), Application);

