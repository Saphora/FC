///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Theming;
        (function (Theming_1) {
            var Theming = (function () {
                function Theming(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Theming.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Theming;
            }());
            Theming_1.Theming = Theming;
        })(Theming = Modules.Theming || (Modules.Theming = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var ThemingModule = new FC.Modules.Theming.Theming(angular.module('FC.Modules.Theming', ApplicationDependencies), Application);
