///<reference path="../../Core/FC.ts"/>
///<reference path="../Countries.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Countries.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    import ENUM = FC.Shared.Enum;

    export class CountryOverviewController extends FC.Shared.Controllers.BaseController {
        private _inst: FC.Modules.Countries.Controllers.CountryOverviewController;
        public $scope: Models.ICountryOverview;
        public CountriesService: FC.Modules.Countries.Services.CountriesService;
        //public ActiveCountryID: number;
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
            "FC.Modules.Countries.Services.CountriesService",
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
            CountriesService: FC.Modules.Countries.Services.CountriesService
        ) {
            super($http, $q, $scope, $location, $routeParams, $mdDialog);
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


        public DoSort(sortIndex: string) {
            var vm = this;
            if (sortIndex == "") {
                sortIndex = "0-9";
            }
            if (sortIndex != vm.$scope.MemReg.Get<string>("sortIndex")) {
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
                    } else {
                        vm.$scope.ShowMore = false;
                        vm.$scope.ShowMoreURL = "/#/Countries?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                    }
                });
            });
        }

        public setCountries(): void {
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
            vm.CountriesSvc.GetSorted(sortIndex, p).then(function (r) {
                vm.$scope.Countries = r.Data;
                var p = vm.GetPageNum() + 1;
                vm.CountriesSvc.GetPagedCount(p, sortIndex).then(function (r2) {
                    vm.$scope.IsLoading = false;
                    if (r2.Data > 0) {
                        vm.$scope.ShowMore = true;
                        vm.$scope.ShowMoreURL = "/#/Countries?page=" + (p) + "&sortIndex=" + sortIndex;
                    } else {
                        vm.$scope.ShowMore = false;
                        vm.$scope.ShowMoreURL = "/#/Countries?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                    }
                });
            });
        }

        public DoDelete(Country: FC.Shared.Models.UCountry) {
            var vm = this;
            vm.$scope.model = Country;
            vm.DoSaveCRUD(Shared.Controllers.ActionType.Delete, Shared.Controllers.ServiceType.CountryService, vm.$scope);
        }
    }
    CountriesModule.GetApplication().RegisterController("FC.Modules.Countries.Controllers.CountryOverviewController", FC.Modules.Countries.Controllers.CountryOverviewController);
}