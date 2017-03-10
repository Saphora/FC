///<reference path="../../Core/FC.ts"/>
///<reference path="../Genres.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Genres.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    import ENUM = FC.Shared.Enum;

    export class GenreOverviewController extends FC.Shared.Controllers.BaseController {
        private _inst: FC.Modules.Genres.Controllers.GenreOverviewController;
        public $scope: Models.IGenreOverview;
        //public ActiveGenreID: number;
        static $inject = [
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
            "$sce",
            "FC.Modules.Genres.Services.GenreService",
            "FC.Modules.Favorites.Services.FavoriteService"
        ];

        constructor(
            $http,
            $q,
            $scope,
            $route,
            $routeParams,
            $location,
            $mdDialog,
            FestivalService: FC.Modules.Festival.Services.FestivalService,
            NewsService: FC.Modules.News.Services.NewsService,
            RatesService: FC.Modules.Rates.Services.RatesService,
            $sce,
            GenreService: FC.Modules.Genres.Services.GenreService
        ) {
            super($http, $q, $scope, $location, $routeParams, $mdDialog);
            this.$scope = $scope;
            this.$scope.$routeParams = $routeParams;
            //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
            this.setGenres();
            this.$scope.MediaURLRoot = FC.Core.Environment.MediaURLRoot;
            this.$scope.MtModal = $mdDialog;
            var vm = this;
            vm.$scope.IsLoading = true;
            window.addEventListener("REFRESH", function (r) {
                vm.setGenres();
            });
            this.SetUserFavorites();
            vm.$scope.$watch('UserFavorites', function (favs) {
                if (favs) {
                    vm.$scope.IsLoading = false;
                }
            });
        }


        public DoSort(sortIndex: string) {
            var vm = this;
            if (sortIndex == "") {
                sortIndex = "0-9";
            }
            if (sortIndex != vm.$scope.MemReg.Get<string>("sortIndex")) {
                vm.SetPageNum(1);
            }
            vm.$scope.MemReg.Register("sortIndex", sortIndex);
            vm.GenreService.GetSorted(sortIndex, vm.GetPageNum()).then(function (r) {
                var p = vm.GetPageNum() + 1;
                vm.$scope.Genres = r.Data;
                vm.GenreService.GetPagedCount(p, sortIndex).then(function (r2) {
                    vm.$scope.IsLoading = false;
                    if (r2.Data > 0) {
                        vm.$scope.ShowMore = true;
                        vm.$scope.ShowMoreURL = "/#/Genres?page=" + (p) + "&sortIndex=" + sortIndex;
                    } else {
                        vm.$scope.ShowMore = false;
                        vm.$scope.ShowMoreURL = "/#/Genres?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                    }
                });
            });
        }

        public setGenres(): void {
            var vm = this;
            var p = 1;
            if (vm.$scope.$routeParams["page"]) {
                p = parseInt(vm.$scope.$routeParams["page"]);
            }
            var sortIndex = "";
            if (vm.$scope.$routeParams["sortIndex"]) {
                sortIndex = vm.$scope.$routeParams["sortIndex"];
            } else {
                sortIndex = "0-9";
            }
            vm.GenreService.GetSorted(sortIndex, p).then(function (r) {
                vm.$scope.Genres = r.Data;
                var p = vm.GetPageNum() + 1;
                vm.GenreService.GetPagedCount(p, sortIndex).then(function (r2) {
                    vm.$scope.IsLoading = false;
                    if (r2.Data > 0) {
                        vm.$scope.ShowMore = true;
                        vm.$scope.ShowMoreURL = "/#/Genres?page=" + (p) + "&sortIndex=" + sortIndex;
                    } else {
                        vm.$scope.ShowMore = false;
                        vm.$scope.ShowMoreURL = "/#/Genres?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                    }
                });
            });
        }

        public DoDelete(Genre: FC.Shared.Models.UGenre) {
            var vm = this;
            vm.$scope.model = Genre;
            vm.DoSaveCRUD(Shared.Controllers.ActionType.Delete, Shared.Controllers.ServiceType.GenreService, vm.$scope);
        }
    }
    GenresModule.GetApplication().RegisterController("FC.Modules.Genres.Controllers.GenreOverviewController", FC.Modules.Genres.Controllers.GenreOverviewController);
}