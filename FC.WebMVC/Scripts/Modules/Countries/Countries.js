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
                    this.$Application.AddRoute("/countries", "/Scripts/Modules/Countries/Views/overview.html", "FC.Modules.Countries.Controllers.CountryOverviewController", "vm");
                    this.$Application.AddRoute("/countries/:pagenum", "/Scripts/Modules/Countries/Views/overview.html", "FC.Modules.Countries.Controllers.CountryOverviewController", "vm");
                    this.$Application.AddRoute("/countries/sort/:character", "/Scripts/Modules/Countries/Views/overview.html", "FC.Modules.Countries.Controllers.CountryOverviewController", "vm");
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
//# sourceMappingURL=Countries.js.map