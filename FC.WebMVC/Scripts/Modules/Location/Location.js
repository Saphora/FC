///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Location;
        (function (Location_1) {
            var Location = (function () {
                function Location(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                    this.$Application.AddRoute("/locations", "/Scripts/Modules/Location/Views/overview.html", "FC.Modules.Location.Controllers.LocationOverviewController", "vm");
                    this.$Application.AddRoute("/locations/details/:LocationID", "/Scripts/Modules/Location/Views/details.html", "FC.Modules.Details.Controllers.LocationDetailsController", "vm");
                    this.$Application.AddRoute("/locations/create", "/Scripts/Modules/Location/Views/create.html", "FC.Modules.Location.Controllers.LocationCRUDController", "vm");
                    this.$Application.AddRoute("/locations/create/:step", "/Scripts/Modules/Location/Views/create.html", "FC.Modules.Location.Controllers.LocationCRUDController", "vm");
                    this.$Application.AddRoute("/locations/edit/:LocationID", "/Scripts/Modules/Location/Views/create.html", "FC.Modules.Location.Controllers.LocationCRUDController", "vm");
                    this.$Application.AddRoute("/locations/delete/:LocationID", "/Scripts/Modules/Location/Views/overview.html", "FC.Modules.Location.Controllers.LocationCRUDController", "vm");
                }
                Location.prototype.GetApplication = function () {
                    return this.$Application;
                };
                Location.$inject = ['$location', 'FC.Core.Services.AuthService'];
                return Location;
            }());
            Location_1.Location = Location;
        })(Location = Modules.Location || (Modules.Location = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var LocationModule = new FC.Modules.Location.Location(angular.module('FC.Modules.Location', ApplicationDependencies), Application);
//# sourceMappingURL=Location.js.map