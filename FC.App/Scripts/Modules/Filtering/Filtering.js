///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Filtering;
        (function (Filtering_1) {
            var Filtering = (function () {
                function Filtering(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Filtering.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Filtering;
            }());
            Filtering_1.Filtering = Filtering;
        })(Filtering = Modules.Filtering || (Modules.Filtering = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FilteringModule = new FC.Modules.Filtering.Filtering(angular.module('FC.Modules.Filtering', ApplicationDependencies), Application);
