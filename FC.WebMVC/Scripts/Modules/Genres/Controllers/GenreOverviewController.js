var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../Genres.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Genres;
        (function (Genres) {
            var Controllers;
            (function (Controllers) {
                var GenreOverviewController = (function (_super) {
                    __extends(GenreOverviewController, _super);
                    function GenreOverviewController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, FestivalService, NewsService, RatesService, $sce, GenreService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
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
                    GenreOverviewController.prototype.DoSort = function (sortIndex) {
                        var vm = this;
                        if (sortIndex == "") {
                            sortIndex = "0-9";
                        }
                        if (sortIndex != vm.$scope.MemReg.Get("sortIndex")) {
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
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/#/Genres?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                                }
                            });
                        });
                    };
                    GenreOverviewController.prototype.setGenres = function () {
                        var vm = this;
                        var p = 1;
                        if (vm.$scope.$routeParams["page"]) {
                            p = parseInt(vm.$scope.$routeParams["page"]);
                        }
                        var sortIndex = "";
                        if (vm.$scope.$routeParams["sortIndex"]) {
                            sortIndex = vm.$scope.$routeParams["sortIndex"];
                        }
                        else {
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
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/#/Genres?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                                }
                            });
                        });
                    };
                    GenreOverviewController.prototype.DoDelete = function (Genre) {
                        var vm = this;
                        vm.$scope.model = Genre;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.GenreService, vm.$scope);
                    };
                    //public ActiveGenreID: number;
                    GenreOverviewController.$inject = [
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
                    return GenreOverviewController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.GenreOverviewController = GenreOverviewController;
                GenresModule.GetApplication().RegisterController("FC.Modules.Genres.Controllers.GenreOverviewController", FC.Modules.Genres.Controllers.GenreOverviewController);
            })(Controllers = Genres.Controllers || (Genres.Controllers = {}));
        })(Genres = Modules.Genres || (Modules.Genres = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=GenreOverviewController.js.map