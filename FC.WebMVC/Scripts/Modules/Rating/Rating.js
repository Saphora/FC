///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Rating;
        (function (Rating_1) {
            var Rating = (function () {
                function Rating(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Rating.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Rating;
            }());
            Rating_1.Rating = Rating;
        })(Rating = Modules.Rating || (Modules.Rating = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var RatingModule = new FC.Modules.Rating.Rating(angular.module('FC.Modules.Rating', ApplicationDependencies), Application);
//# sourceMappingURL=Rating.js.map