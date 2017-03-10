///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Genres;
        (function (Genres_1) {
            var Genres = (function () {
                function Genres(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Genres.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Genres;
            }());
            Genres_1.Genres = Genres;
        })(Genres = Modules.Genres || (Modules.Genres = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var GenresModule = new FC.Modules.Genres.Genres(angular.module('FC.Modules.Genres', ApplicationDependencies), Application);
