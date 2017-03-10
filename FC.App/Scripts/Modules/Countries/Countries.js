///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Countries;
        (function (Countries_1) {
            var Countries = (function () {
                function Countries(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Countries.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Countries;
            }());
            Countries_1.Countries = Countries;
        })(Countries = Modules.Countries || (Modules.Countries = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var CountriesModule = new FC.Modules.Countries.Countries(angular.module('FC.Modules.Countries', ApplicationDependencies), Application);
