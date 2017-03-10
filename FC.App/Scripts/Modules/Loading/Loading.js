///<reference path="../Core/FC.ts" />
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Loading;
        (function (Loading_1) {
            var Loading = (function () {
                function Loading(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Loading.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Loading;
            }());
            Loading_1.Loading = Loading;
        })(Loading = Modules.Loading || (Modules.Loading = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var LoadingModule = new FC.Modules.Loading.Loading(angular.module('FC.Modules.Loading', ApplicationDependencies), Application);
