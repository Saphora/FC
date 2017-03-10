var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../Countries.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Countries;
        (function (Countries) {
            var Controllers;
            (function (Controllers) {
                var CountryOverviewController = (function (_super) {
                    __extends(CountryOverviewController, _super);
                    function CountryOverviewController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, FestivalService, NewsService, RatesService, $sce, CountriesService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.$scope = $scope;
                        this.$scope.$routeParams = $routeParams;
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                        this.setCountries();
                        this.$scope.MediaURLRoot = FC.Core.Environment.MediaURLRoot;
                        this.$scope.MtModal = $mdDialog;
                        var vm = this;
                        vm.$scope.IsLoading = true;
                        window.addEventListener("REFRESH", function (r) {
                            vm.setCountries();
                        });
                        this.SetUserFavorites();
                        vm.$scope.$watch('UserFavorites', function (favs) {
                            if (favs) {
                                vm.$scope.IsLoading = false;
                            }
                        });
                    }
                    CountryOverviewController.prototype.DoSort = function (sortIndex) {
                        var vm = this;
                        if (sortIndex == "") {
                            sortIndex = "0-9";
                        }
                        if (sortIndex != vm.$scope.MemReg.Get("sortIndex")) {
                            vm.SetPageNum(1);
                        }
                        vm.$scope.MemReg.Register("sortIndex", sortIndex);
                        vm.CountriesSvc.GetSorted(sortIndex, vm.GetPageNum()).then(function (r) {
                            var p = vm.GetPageNum() + 1;
                            vm.$scope.Countries = r.Data;
                            vm.CountriesSvc.GetPagedCount(p, sortIndex).then(function (r2) {
                                vm.$scope.IsLoading = false;
                                if (r2.Data > 0) {
                                    vm.$scope.ShowMore = true;
                                    vm.$scope.ShowMoreURL = "/#/Countries?page=" + (p) + "&sortIndex=" + sortIndex;
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/#/Countries?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                                }
                            });
                        });
                    };
                    CountryOverviewController.prototype.setCountries = function () {
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
                        vm.CountriesSvc.GetSorted(sortIndex, p).then(function (r) {
                            vm.$scope.Countries = r.Data;
                            var p = vm.GetPageNum() + 1;
                            vm.CountriesSvc.GetPagedCount(p, sortIndex).then(function (r2) {
                                vm.$scope.IsLoading = false;
                                if (r2.Data > 0) {
                                    vm.$scope.ShowMore = true;
                                    vm.$scope.ShowMoreURL = "/#/Countries?page=" + (p) + "&sortIndex=" + sortIndex;
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/#/Countries?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                                }
                            });
                        });
                    };
                    CountryOverviewController.prototype.DoDelete = function (Country) {
                        var vm = this;
                        vm.$scope.model = Country;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.CountryService, vm.$scope);
                    };
                    //public ActiveCountryID: number;
                    CountryOverviewController.$inject = [
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
                        "FC.Modules.Countries.Services.CountriesService",
                        "FC.Modules.Favorites.Services.FavoriteService"
                    ];
                    return CountryOverviewController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.CountryOverviewController = CountryOverviewController;
                CountriesModule.GetApplication().RegisterController("FC.Modules.Countries.Controllers.CountryOverviewController", FC.Modules.Countries.Controllers.CountryOverviewController);
            })(Controllers = Countries.Controllers || (Countries.Controllers = {}));
        })(Countries = Modules.Countries || (Modules.Countries = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=CountryOverviewController.js.map