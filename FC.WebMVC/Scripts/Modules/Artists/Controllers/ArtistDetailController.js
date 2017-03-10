var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../Artists.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Artists;
        (function (Artists) {
            var Controllers;
            (function (Controllers) {
                var ArtistDetailController = (function (_super) {
                    __extends(ArtistDetailController, _super);
                    function ArtistDetailController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, FestivalService, NewsService, RatesService, BannerService, UrlManagerService, $sce, GenreService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                    }
                    //public ActiveGenreID: number;
                    ArtistDetailController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        'FC.Modules.Festival.Services.FestivalService',
                        "FC.Modules.News.Services.NewsService",
                        "FC.Modules.Rates.Services.RatesService",
                        "FC.Modules.Banners.Services.BannerService",
                        "FC.Core.Services.URLManagerService",
                        "$sce",
                        "FC.Modules.Genres.Services.GenreService"
                    ];
                    return ArtistDetailController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.ArtistDetailController = ArtistDetailController;
                ArtistsModule.GetApplication().RegisterController("FC.Modules.Artists.Controllers.ArtistDetailController", FC.Modules.Artists.Controllers.ArtistDetailController);
            })(Controllers = Artists.Controllers || (Artists.Controllers = {}));
        })(Artists = Modules.Artists || (Modules.Artists = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=ArtistDetailController.js.map