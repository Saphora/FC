///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Festival;
        (function (Festival_1) {
            var Festival = (function () {
                function Festival(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
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
                Festival.prototype.GetApplication = function () {
                    return this.$Application;
                };
                Festival.$inject = ['$location', 'FC.Core.Services.AuthService'];
                return Festival;
            }());
            Festival_1.Festival = Festival;
        })(Festival = Modules.Festival || (Modules.Festival = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FestivalModule = new FC.Modules.Festival.Festival(angular.module('FC.Modules.Festival', ApplicationDependencies), Application);
//# sourceMappingURL=Festival.js.map