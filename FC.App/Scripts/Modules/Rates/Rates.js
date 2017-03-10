///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Rates;
        (function (Rates_1) {
            var Rates = (function () {
                function Rates(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Rates.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Rates;
            }());
            Rates_1.Rates = Rates;
        })(Rates = Modules.Rates || (Modules.Rates = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var RatesModule = new FC.Modules.Rates.Rates(angular.module('FC.Modules.Rates', ApplicationDependencies), Application);
