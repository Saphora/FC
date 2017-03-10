///<reference path="../../Core/FC.ts" />
///<reference path="../../Core/Services/NominatimService.ts" />
///<reference path="../Calendar.ts"/>
///<reference path="../Services/CalendarService.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../../Shared/Util/CacheManager.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//Loading properties;
// IsThemesLoading: boolean;//
// IsCountriesLoading: boolean;//
// IsGenresLoading: boolean;//
// IsFestivalsLoading: boolean;//
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Calendar;
        (function (Calendar) {
            var Controllers;
            (function (Controllers) {
                var CalendarController = (function (_super) {
                    __extends(CalendarController, _super);
                    function CalendarController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, $sce, URLManagerService, CalendarService, NewsService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var genreSvc = new FC.Modules.Genres.Services.GenreService($http, $q);
                        var vm = this;
                        this.$scope.MediaURLRoot = FC.Core.Environment.MediaURLRoot;
                        this.$scope = $scope;
                        this.URLManager = new FC.Core.Services.URLManagerService($http, $q, null);
                        this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                        this.initLoadingScope();
                        this._InitColDbo();
                        this._InitServices(CalendarService, NewsService);
                        this._InitializeDateData($scope);
                        if (!this.$scope.ActiveYear) {
                            if ($routeParams["year"] != null) {
                                this.$scope.ActiveYear = $routeParams["year"];
                            }
                            else if (CacheManager.Contains("ActiveYear")) {
                                vm.$scope.ActiveYear = CacheManager.Get("ActiveYear").data;
                            }
                            else {
                                this.$scope.ActiveYear = new Date().getFullYear();
                            }
                        }
                        if (!this.$scope.ActiveMonth) {
                            if ($routeParams["month"] != null) {
                                this.$scope.ActiveMonth = $routeParams["month"];
                            }
                            else if (CacheManager.Contains("ActiveMonth")) {
                                vm.$scope.ActiveMonth = CacheManager.Get("ActiveMonth").data;
                            }
                            else {
                                vm.$scope.ActiveMonth = new Date().getMonth() + 1;
                            }
                        }
                        this._InitViewData($scope);
                        this.WatchSearchResult();
                        this.URLManager.AddURL("festival", "FestivalURL", "festival/{0}/");
                        this.URLManager.AddURL("festival", "FestivalURL", "festival/{0}/{1}");
                    }
                    CalendarController.prototype._InitColDbo = function () {
                        this.Festivals = new Array();
                    };
                    CalendarController.prototype._InitServices = function (CalendarService, NewsService) {
                        this.CalendarSvc = CalendarService;
                        this.NewsSvc = NewsService;
                    };
                    CalendarController.prototype.WatchSearchResult = function () {
                        var vm = this;
                        vm.$scope.HasSearchResults = false;
                        vm.$scope.IsFestivalsLoading = true;
                        vm.$scope.SearchNoResults = false;
                        vm.$scope.Searching = false;
                        window.addEventListener("Searching", function () {
                            vm.CacheManager.DeleteStorage("search-result");
                            vm.$scope.IsFestivalsLoading = true;
                            vm.$scope.SearchNoResults = false;
                            vm.$scope.Searching = true;
                            vm.$scope.IsLoading = true;
                        });
                        window.addEventListener("SearchCompletedWithResults", function () {
                            vm.$scope.Searching = false;
                            vm.CacheManager.GetStorage("search-result", function (data) {
                                vm.$scope.HasSearchResults = true;
                                var d = data.data;
                                if (d.length == 0) {
                                    vm.$scope.SearchNoResults = true;
                                    vm.$scope.Searching = false;
                                    vm.$scope.IsLoading = false;
                                }
                                else {
                                    vm.$scope.BaseIsLoading = false;
                                    vm.$scope.Festivals = d;
                                    vm.$scope.Searching = false;
                                    vm.$scope.IsLoading = false;
                                }
                            });
                        });
                        window.addEventListener("SearchCompletedWithNoResults", function () {
                            vm.$scope.IsLoading = false;
                            vm.$scope.SearchNoResults = true;
                            vm.$scope.Searching = false;
                        });
                    };
                    CalendarController.prototype._InitializeDateData = function ($scope) {
                        //var vm = this;
                        //this.CalendarYears = [new Date().getFullYear(), new Date().getFullYear() + 1];
                        //$scope.ActiveYear = new Date().getFullYear();
                        //this.CalendarSvc.GetMonths().then(function (r: INT.IServiceResponse<Array<string>>) {
                        //    vm.CalendarMonths = r.Data;
                        //});
                    };
                    CalendarController.prototype.compare = function (a, b) {
                        if (a.OrderDate < b.OrderDate) {
                            return -1;
                        }
                        else if (a.OrderDate > b.OrderDate) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    };
                    CalendarController.prototype._InitViewData = function ($scope) {
                        var vm = this;
                        var genres = new Array();
                        var genresFilter = new Array();
                        if (vm.CacheManager.Contains('ActiveGenres')) {
                            var tmpGenres = vm.CacheManager.Get('ActiveGenres');
                            genres = tmpGenres.data;
                            genresFilter = genres;
                        }
                        var countriesFilter = new Array();
                        if (vm.CacheManager.Contains("UserCountries")) {
                            countriesFilter = vm.CacheManager.Get('UserCountries').data;
                        }
                        vm.CalendarSvc.GetFilteredFestivals(vm.$scope.ActiveMonth, vm.$scope.ActiveYear, genresFilter, countriesFilter).then(function (result) {
                            vm.$scope.Festivals = result.Data;
                            vm.$scope.IsLoading = false;
                        });
                        window.addEventListener("ActiveGenres_Deleted", function (e) {
                            vm.$scope.IsLoading = true;
                            var countriesFilter = new Array();
                            if (vm.CacheManager.Contains("UserCountries")) {
                                countriesFilter = vm.CacheManager.Get('UserCountries').data;
                            }
                            vm.CalendarSvc.GetFilteredFestivals(vm.$scope.ActiveMonth, vm.$scope.ActiveYear, new Array(), countriesFilter).then(function (result) {
                                vm.$scope.Festivals = result.Data;
                                vm.$scope.IsLoading = false;
                            });
                        });
                        window.addEventListener('ActiveGenres_Writed', function (e) {
                            vm.$scope.IsLoading = true;
                            var genres = new Array();
                            var tmpGenres = vm.CacheManager.Get('ActiveGenres');
                            genres = tmpGenres.data;
                            var genresFilter = genres;
                            var countriesFilter = new Array();
                            if (vm.CacheManager.Contains("UserCountries")) {
                                countriesFilter = vm.CacheManager.Get('UserCountries').data;
                            }
                            vm.CalendarSvc.GetFilteredFestivals(vm.$scope.ActiveMonth, vm.$scope.ActiveYear, genresFilter, countriesFilter).then(function (result) {
                                vm.$scope.Festivals = result.Data;
                                vm.$scope.IsLoading = false;
                            });
                        });
                        window.addEventListener('UserCountries_Writed', function (e) {
                            var countries = vm.CacheManager.GetStorage('UserCountries');
                            var genres = new Array();
                            if (vm.CacheManager.Contains("ActiveGenres")) {
                                genres = vm.CacheManager.Get('ActiveGenres').data;
                            }
                            vm.CalendarSvc.GetFilteredFestivals(vm.$scope.ActiveMonth, vm.$scope.ActiveYear, genres, countries.data).then(function (result) {
                                vm.$scope.Festivals = result.Data;
                                vm.$scope.IsLoading = false;
                            });
                        });
                        window.addEventListener('UserCountries_Deleted', function (e) {
                            var countriesFilter = new Array();
                            if (vm.CacheManager.Contains("UserCountries")) {
                                countriesFilter = vm.CacheManager.Get('UserCountries').data;
                            }
                            var genres = vm.CacheManager.GetStorage('UserCountries');
                            vm.CalendarSvc.GetFilteredFestivals(vm.$scope.ActiveMonth, vm.$scope.ActiveYear, genres.data, countriesFilter).then(function (result) {
                                vm.$scope.Festivals = result.Data;
                                vm.$scope.IsLoading = false;
                            });
                        });
                    };
                    CalendarController.prototype.GetFestivalURL = function (festival) {
                        var vm = this;
                        var retUrl = this.URLManager.GetURL("festival", "FestivalURL", [festival.FestivalID.toString()]);
                        return retUrl;
                    };
                    CalendarController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        '$sce',
                        "FC.Core.Services.URLManagerService",
                        "FC.Modules.Calendar.Services.CalendarService",
                        "FC.Modules.News.Services.NewsService"
                    ];
                    return CalendarController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.CalendarController = CalendarController;
                CalendarModule.GetApplication().RegisterController("FC.Modules.Calendar.Controllers.CalendarController", FC.Modules.Calendar.Controllers.CalendarController);
            })(Controllers = Calendar.Controllers || (Calendar.Controllers = {}));
        })(Calendar = Modules.Calendar || (Modules.Calendar = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=CalendarController.js.map