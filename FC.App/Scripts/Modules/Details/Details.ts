///<reference path="../Core/FC.ts"/>
module FC.Modules.Details {
    export class Details {
        $Application: FC.Core.FCModule;
        public GetApplication(): FC.Core.FCModule {
            return this.$Application;
        }
        static $inject = ['$location', 'FC.Core.Services.AuthService'];
        constructor(private NgModule: ng.IModule, private app: FC.Core.FCModule) {
            this.$Application = app;
            this.$Application.AddRoute("/details/festival/:festivalID", "/Scripts/Modules/Details/Views/festival-detail.html", "FC.Modules.Details.Controllers.DetailsController", "vm");
            this.$Application.AddRoute("/details/location/:locationID", "/Scripts/Modules/Details/Views/location-detail.html", "FC.Modules.Details.Controllers.LocationDetailsController", "vm");
            this.$Application.AddRoute("/details/artist/:artistID", "/Scripts/Modules/Details/Views/artist-detail.html", "FC.Modules.Details.Controllers.ArtistDetailsController", "vm");
            this.$Application.AddRoute("/details/artists/:festivalID", "/Scripts/Modules/Details/Views/festival-detail.html", "FC.Modules.Details.Controllers.DetailsController", "vm");
            this.$Application.AddRoute("/details/travelinfo/:festivalID", "/Scripts/Modules/Details/Views/festival-detail.html", "FC.Modules.Details.Controllers.DetailsController", "vm");
            this.$Application.AddRoute("/details/news/:newsID", "/Scripts/Modules/Details/Views/festival-detail.html", "FC.Modules.Details.Controllers.DetailsController", "vm");
            this.$Application.AddRoute("/details/report/:reportID", "/Scripts/Modules/Details/Views/festival-detail.html", "FC.Modules.Details.Controllers.DetailsController", "vm");
        }
    }
}
var DetailsModule = new FC.Modules.Details.Details(angular.module('FC.Modules.Details', ApplicationDependencies), Application);

