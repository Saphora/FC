///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Banners;
        (function (Banners_1) {
            var Banners = (function () {
                function Banners(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Banners.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Banners;
            }());
            Banners_1.Banners = Banners;
        })(Banners = Modules.Banners || (Modules.Banners = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var BannerModule = new FC.Modules.Banners.Banners(angular.module('FC.Modules.Banners', ApplicationDependencies), Application);
