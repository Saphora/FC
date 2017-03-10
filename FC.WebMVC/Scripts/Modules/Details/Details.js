///<reference path="../Core/FC.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Details;
        (function (Details_1) {
            var Details = (function () {
                function Details(NgModule, app) {
                    this.NgModule = NgModule;
                    this.app = app;
                    this.$Application = app;
                    this.$Application.AddRoute("/details/festival/:festivalID", "/Scripts/Modules/Details/Views/festival-detail.html", "FC.Modules.Details.Controllers.DetailsController", "vm");
                    this.$Application.AddRoute("/details/location/:locationID", "/Scripts/Modules/Details/Views/location-detail.html", "FC.Modules.Details.Controllers.LocationDetailsController", "vm");
                    this.$Application.AddRoute("/details/artist/:artistID", "/Scripts/Modules/Details/Views/artist-detail.html", "FC.Modules.Details.Controllers.ArtistDetailsController", "vm");
                    this.$Application.AddRoute("/details/artists/:festivalID", "/Scripts/Modules/Details/Views/festival-detail.html", "FC.Modules.Details.Controllers.DetailsController", "vm");
                    this.$Application.AddRoute("/details/travelinfo/:festivalID", "/Scripts/Modules/Details/Views/festival-detail.html", "FC.Modules.Details.Controllers.DetailsController", "vm");
                    this.$Application.AddRoute("/details/news/:newsID", "/Scripts/Modules/Details/Views/festival-detail.html", "FC.Modules.Details.Controllers.DetailsController", "vm");
                    this.$Application.AddRoute("/details/report/:reportID", "/Scripts/Modules/Details/Views/festival-detail.html", "FC.Modules.Details.Controllers.DetailsController", "vm");
                }
                Details.prototype.GetApplication = function () {
                    return this.$Application;
                };
                Details.$inject = ['$location', 'FC.Core.Services.AuthService'];
                return Details;
            }());
            Details_1.Details = Details;
        })(Details = Modules.Details || (Modules.Details = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
var DetailsModule = new FC.Modules.Details.Details(angular.module('FC.Modules.Details', ApplicationDependencies), Application);
//# sourceMappingURL=Details.js.map