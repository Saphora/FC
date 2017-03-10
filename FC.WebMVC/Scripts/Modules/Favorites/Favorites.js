///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Favorites;
        (function (Favorites_1) {
            var Favorites = (function () {
                function Favorites(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                }
                Favorites.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Favorites;
            }());
            Favorites_1.Favorites = Favorites;
        })(Favorites = Modules.Favorites || (Modules.Favorites = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var FavoritesModule = new FC.Modules.Favorites.Favorites(angular.module('FC.Modules.Favorites', ApplicationDependencies), Application);
//# sourceMappingURL=Favorites.js.map