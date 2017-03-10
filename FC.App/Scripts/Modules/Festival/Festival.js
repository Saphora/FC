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
                    this.$Application.AddRoute("/festival/:festival/:country/:year/:month", "/Scripts/Modules/Festival/Views/festival-detail-columns.html", "FC.Modules.Festival.Controllers.FestivalDetailController", "vm");
                }
                Festival.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Festival;
            }());
            Festival_1.Festival = Festival;
        })(Festival = Modules.Festival || (Modules.Festival = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FestivalModule = new FC.Modules.Festival.Festival(angular.module('FC.Modules.Festival', ApplicationDependencies), Application);
