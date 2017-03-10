///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Artists;
        (function (Artists_1) {
            var Artists = (function () {
                function Artists(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                    this.$Application.AddRoute("/artists", "/Scripts/Modules/Artists/Views/overview.html", "FC.Modules.Artists.Controllers.ArtistOverviewController", "vm");
                    this.$Application.AddRoute("/artists/:pagenum", "/Scripts/Modules/Artists/Views/overview.html", "FC.Modules.Artists.Controllers.ArtistOverviewController", "vm");
                    this.$Application.AddRoute("/artists/sort/:character", "/Scripts/Modules/Artists/Views/overview.html", "FC.Modules.Artists.Controllers.ArtistOverviewController", "vm");
                }
                Artists.prototype.GetApplication = function () {
                    return this.$Application;
                };
                return Artists;
            }());
            Artists_1.Artists = Artists;
        })(Artists = Modules.Artists || (Modules.Artists = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var ArtistsModule = new FC.Modules.Artists.Artists(angular.module('FC.Modules.Artists', ApplicationDependencies), Application);
//# sourceMappingURL=Artists.js.map