var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts" />
///<reference path="../../Core/Services/URLManagerService.ts" />
///<reference path="../Filtering.ts"/>
///<reference path="../../Calendar/Services/CalendarService.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../../Shared/Util/CacheManager.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Filtering;
        (function (Filtering) {
            var Controllers;
            (function (Controllers) {
                var FilterController = (function (_super) {
                    __extends(FilterController, _super);
                    function FilterController($http, $q, $scope, $route, $routeParams, $location, $uibModal, ThemingSvc, LocalizationSvc, CalendarService, UrlManagerSvc, GenreService, CountriesService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingSvc, LocalizationSvc);
                        var vm = this;
                        this.$scope = $scope;
                        this.Modal = $uibModal;
                        this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                        this.CalendarSvc = CalendarService;
                        this.CalendarYears = [new Date().getFullYear(), new Date().getFullYear() + 1];
                        this.UrlManager = UrlManagerSvc;
                        this._HandleRoute($routeParams);
                        if (!vm.CacheManager.Contains("sys-countries")) {
                            vm.CountriesSvc.GetAll().then(function (r) {
                                vm.CacheManager.WriteStorage("sys-countries", r.Data, 1000 * 60 * 60 * 2);
                                vm.CountryData = r.Data;
                                vm.$scope.IsCountriesLoading = false;
                            });
                        }
                        else {
                            vm.$scope.IsCountriesLoading = false;
                            vm.CountryData = vm.CacheManager.GetStorage("sys-countries").data;
                        }
                        if (!this.CacheManager.Contains("sys-months")) {
                            this.CalendarSvc.GetMonths().then(function (r) {
                                vm.CalendarMonths = r.Data;
                                vm.ActiveMonthName = vm.CalendarMonths[vm.ActiveMonthNum - 1];
                                vm.CacheManager.WriteStorage("sys-months", r.Data, 1000 * 60 * 60 * 24 * 7 * 52);
                            });
                        }
                        else {
                            vm.CalendarMonths = vm.CacheManager.GetStorage("sys-months").data;
                            vm.ActiveMonthName = vm.CalendarMonths[vm.ActiveMonthNum - 1];
                        }
                        this.ShowMore = 10;
                        vm.setDomGenresActive();
                        if (vm.$scope.IsGenresLoading) {
                            window.addEventListener("sys-genres_Writed", function () {
                                if (vm.CacheManager.Contains("sys-genres")) {
                                    vm.CacheManager.GetStorage("sys-genres", function (response) {
                                        vm.GenreData = response.data;
                                    });
                                }
                                vm.setDomGenresActive();
                                vm.$scope.IsGenresLoading = false;
                            });
                        }
                        if (vm.CacheManager.Contains("user-countries")) {
                            vm.$scope.ActiveCountryIDs = vm.CacheManager.GetStorage("user-countries").data;
                        }
                        //{0] - year
                        //{1} - month
                        //{2} - country
                        //DateEntry
                        this.UrlManager.AddURL("calendar", "CountryURL", "calendar/{0}/{1}/{2}");
                        //DefaultEntry - Date is default client date.
                        this.UrlManager.AddURL("calendar", "IndexURL", "calendar/");
                        //0 - festivalId
                        //1 - genreIds
                    }
                    FilterController.prototype.setDomGenresActive = function () {
                        var vm = this;
                        if (vm.CacheManager.Contains("user-genres") && vm.CacheManager.Contains("sys-genres")) {
                            var storageGenres = vm.CacheManager.GetStorage("user-genres").data;
                            vm.$scope.ActiveGenres = [];
                            vm.GenreData = vm.CacheManager.GetStorage("sys-genres").data;
                            vm.GenreData.forEach(function (value, index) {
                                if (storageGenres.indexOf(value.GenreID) > -1) {
                                    vm.$scope.ActiveGenres.push(value);
                                }
                                if (value.Children) {
                                    value.Children.forEach(function (child, index2) {
                                        if (storageGenres.indexOf(child.GenreID) > -1) {
                                            vm.$scope.ActiveGenres.push(child);
                                        }
                                    });
                                }
                            });
                            vm.$scope.IsGenresLoading = false;
                        }
                    };
                    FilterController.prototype._HandleRoute = function ($routeParams) {
                        var vm = this;
                        console.info($routeParams);
                        if ($routeParams["year"]) {
                            this.ActiveYear = $routeParams["year"];
                        }
                        else {
                            this.ActiveYear = new Date().getFullYear().toString();
                        }
                        if ($routeParams["month"]) {
                            this.ActiveMonthNum = $routeParams["month"];
                        }
                        else {
                            this.ActiveMonthNum = new Date().getMonth() + 1;
                        }
                    };
                    FilterController.prototype.OpenCountryModal = function (size) {
                        var modalInstance = this.Modal.open({
                            animation: this.$scope.animationsEnabled,
                            templateUrl: '/Scripts/Modules/Filtering/Views/country-modal.html',
                            controller: 'FC.Modules.Filtering.Controllers.CountryModalController',
                            controllerAs: 'vm',
                            size: size,
                            resolve: {
                                items: function () {
                                    return null;
                                }
                            }
                        });
                    };
                    FilterController.prototype.OpenModal = function (size) {
                        var modalInstance = this.Modal.open({
                            animation: this.$scope.animationsEnabled,
                            templateUrl: '/Scripts/Modules/Filtering/Views/genre-modal.html',
                            controller: 'FC.Modules.Menu.Controllers.MenuController',
                            controllerAs: 'vm',
                            size: size,
                            resolve: {
                                items: function () {
                                    return null;
                                }
                            }
                        });
                    };
                    FilterController.prototype.GetMonthURL = function (key) {
                        return this.UrlManager.GetURL("calendar", "CountryURL", [this.ActiveYear, key, $AppConfig.CurrentCountry]);
                    };
                    FilterController.prototype.GetYearURL = function (key) {
                        return this.UrlManager.GetURL("calendar", "CountryURL", [key, this.ActiveMonthNum, $AppConfig.CurrentCountry]);
                    };
                    FilterController.prototype.GetCountryURL = function (key) {
                        return this.UrlManager.GetURL("calendar", "CountryURL", [this.ActiveYear, this.ActiveMonthNum, key]);
                    };
                    FilterController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$uibModal',
                        'FC.Modules.Theming.Services.ThemingService',
                        "FC.Core.Services.LocalizationService",
                        'FC.Modules.Calendar.Services.CalendarService',
                        'FC.Core.Services.URLManagerService',
                        'FC.Modules.Genres.Services.GenreService',
                        'FC.Modules.Countries.Services.CountriesService'
                    ];
                    return FilterController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.FilterController = FilterController;
                FilteringModule.GetApplication().RegisterController("FC.Modules.Filtering.Controllers.FilterController", FC.Modules.Filtering.Controllers.FilterController);
            })(Controllers = Filtering.Controllers || (Filtering.Controllers = {}));
        })(Filtering = Modules.Filtering || (Modules.Filtering = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
