///<reference path="../../Core/FC.ts"/>
///<reference path="../Artists.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Artists.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class ArtistDetailController extends FC.Shared.Controllers.BaseController {
        private _inst: FC.Modules.Artists.Controllers.ArtistDetailController;
        //public ActiveGenreID: number;
        static $inject = [
            '$http',
            '$q',
            '$scope',
            
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

        constructor(
            $http,
            $q,
            $scope,
            
            $location,
            $mdDialog,
            FestivalService: FC.Modules.Festival.Services.FestivalService,
            NewsService: FC.Modules.News.Services.NewsService,
            RatesService: FC.Modules.Rates.Services.RatesService,
            BannerService: FC.Modules.Banners.Services.BannerService,
            UrlManagerService: FC.Core.Services.URLManagerService,
            $sce,
            GenreService: FC.Modules.Genres.Services.GenreService
        ) {
            super($http, $q, $scope, $location, $mdDialog);

            
            //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;

        }

    }
    ArtistsModule.GetApplication().RegisterController("FC.Modules.Artists.Controllers.ArtistDetailController", FC.Modules.Artists.Controllers.ArtistDetailController);
}