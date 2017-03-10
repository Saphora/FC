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
                    function CalendarController($http, $q, $scope, $route, $routeParams, $location, ThemingService, LocalizationSvc, UrlManagerService, CalendarService, NominatimService, NewsService, BannerService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingService, LocalizationSvc);
                        var genreSvc = new FC.Modules.Genres.Services.GenreService($http, $q);
                        var vm = this;
                        this.$scope = $scope;
                        this.DetectLocation($scope);
                        this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                        this._HandleRoute($routeParams);
                        this.initLoadingScope();
                        this._InitColDbo();
                        this._InitServices(NominatimService, UrlManagerService, CalendarService, NewsService, BannerService);
                        this._InitializeDateData($scope);
                        this._InitializeBanners($scope);
                        this._InitViewData($scope);
                        this.URLManager.AddURL("festival", "FestivalURL", "festival/{0}/{1}/{2}/{3}");
                    }
                    CalendarController.prototype._InitColDbo = function () {
                        this.Festivals = new Array();
                        this.Banners_COL1 = new Array();
                        this.Banners_COL2 = new Array();
                        this.Banners_COL3 = new Array();
                        this.Festivals_COL1 = new Array();
                        this.Festivals_COL2 = new Array();
                        this.News_COL3 = new Array();
                    };
                    CalendarController.prototype.GetRandomBannerKey = function (colName) {
                        var vm = this;
                        var col1Length = this.Festivals_COL1.length;
                        var col2Length = this.Festivals_COL2.length;
                        var src;
                        var colLength = 0;
                        if (colName == "col1" || colName == "col_1") {
                            src = vm.Festivals_COL1;
                            colLength = col1Length;
                        }
                        else if (colName == "col2" || colName == "col_2") {
                            src = vm.Festivals_COL2;
                            colLength = col2Length;
                        }
                        if (colLength >= 2) {
                            var randomized = Math.floor(Math.random() * 10);
                            if (randomized > colLength) {
                                return this.GetRandomBannerKey(colName);
                            }
                            else if (randomized <= colLength) {
                                return randomized;
                            }
                            else {
                                return 0;
                            }
                        }
                        else {
                            return 0;
                        }
                    };
                    CalendarController.prototype._InitServices = function (NominatimService, UrlManagerService, CalendarService, NewsService, BannersService) {
                        this.NominatimSvc = NominatimService;
                        this.URLManager = UrlManagerService;
                        this.CalendarSvc = CalendarService;
                        this.NewsSvc = NewsService;
                        this.BannerService = BannersService;
                    };
                    CalendarController.prototype._InitializeDateData = function ($scope) {
                        var vm = this;
                        this.CalendarYears = [new Date().getFullYear(), new Date().getFullYear() + 1];
                        $scope.ActiveYear = new Date().getFullYear();
                        this.CalendarSvc.GetMonths().then(function (r) {
                            vm.CalendarMonths = r.Data;
                        });
                    };
                    CalendarController.prototype._InitializeBanners = function ($scope) {
                        var vm = this;
                        var filter = new FC.Shared.ServiceMessages.BannerFilter();
                        filter.Genres = vm.UserGenres;
                        filter.Layout = "COL_LG_4";
                        vm.BannerService.GetBanners(filter).then(function (r) {
                            vm.$scope.Col1Banner = r.Data[0];
                            vm.$scope.Col2Banner = r.Data[0];
                            vm.$scope.Col1BannerKey = vm.GetRandomBannerKey('col1');
                            vm.$scope.Col2BannerKey = vm.GetRandomBannerKey('col2');
                        });
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
                    CalendarController.prototype.GetFilteredFestivals = function (userCountries) {
                        var vm = this;
                        vm.CalendarSvc.GetFilteredFestivals(vm.ActiveMonthNum, vm.ActiveYear, vm.UserGenres, userCountries).then(function (Festivals) {
                            vm.Festivals_COL1 = new Array();
                            vm.Festivals_COL2 = new Array();
                            vm.$scope.BaseIsLoading = false;
                            vm.Festivals = Festivals.Data;
                            var count = 1;
                            vm.Festivals = vm.Festivals.sort(vm.compare);
                            $.each(vm.Festivals, function (i, f) {
                                if (count == 0) {
                                    if (vm.Festivals_COL1.indexOf(f) == -1 && vm.Festivals_COL2.indexOf(f) == -1) {
                                        vm.Festivals_COL2.push(f);
                                        count++;
                                    }
                                }
                                else {
                                    if (vm.Festivals_COL1.indexOf(f) == -1 && vm.Festivals_COL2.indexOf(f) == -1) {
                                        vm.Festivals_COL1.push(f);
                                        count = 0;
                                    }
                                }
                            });
                            vm.$scope.IsFestivalsLoading = false;
                        });
                    };
                    CalendarController.prototype.GetGenreStorage = function () {
                        var vm = this;
                        window.addEventListener('user-countries_Writed', function () {
                            alert("Countries writed!");
                            //vm.CacheManager.GetStorage("user-countries", function (response) {
                            //    userCountries = response.data
                            //    vm.GetFilteredFestivals(userCountries);
                            //});
                        });
                        if (vm.CacheManager.Contains("user-genres")) {
                            vm.CacheManager.GetStorage("user-genres", function (response) {
                                vm.UserGenres = response.data;
                                var userCountries = null;
                                window.addEventListener('user-countries_Writed', function () {
                                    vm.CacheManager.GetStorage("user-countries", function (response) {
                                        userCountries = response.data;
                                        vm.GetFilteredFestivals(userCountries);
                                    });
                                });
                                vm.CacheManager.GetStorage("user-countries", function (response) {
                                    userCountries = response.data;
                                    vm.GetFilteredFestivals(userCountries);
                                });
                            });
                        }
                    };
                    CalendarController.prototype._InitViewData = function ($scope) {
                        var vm = this;
                        vm.GetGenreStorage();
                        window.addEventListener("user-genres_Writed", function () {
                            vm.GetGenreStorage();
                        });
                    };
                    CalendarController.prototype.GetFestivalURL = function (festival) {
                        var vm = this;
                        var retUrl = this.URLManager.GetURL("festival", "FestivalURL", [festival.UmbracoID.toString(), $AppConfig.CurrentCountry, vm.ActiveYear.toString(), vm.ActiveMonthNum.toString()]);
                        return retUrl;
                    };
                    CalendarController.prototype._HandleRoute = function ($routeParams) {
                        var vm = this;
                        console.info($routeParams);
                        if ($routeParams["year"]) {
                            this.ActiveYear = $routeParams["year"];
                        }
                        else {
                            this.ActiveYear = new Date().getFullYear();
                        }
                        if ($routeParams["month"]) {
                            this.ActiveMonthNum = $routeParams["month"];
                        }
                        else {
                            this.ActiveMonthNum = new Date().getMonth() + 1;
                        }
                    };
                    CalendarController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "FC.Modules.Theming.Services.ThemingService",
                        "FC.Core.Services.LocalizationService",
                        "FC.Core.Services.URLManagerService",
                        "FC.Modules.Calendar.Services.CalendarService",
                        "FC.Core.Services.NominatimService",
                        "FC.Modules.News.Services.NewsService",
                        "FC.Modules.Banners.Services.BannerService"
                    ];
                    return CalendarController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.CalendarController = CalendarController;
                CalendarModule.GetApplication().RegisterController("FC.Modules.Calendar.Controllers.CalendarController", FC.Modules.Calendar.Controllers.CalendarController);
            })(Controllers = Calendar.Controllers || (Calendar.Controllers = {}));
        })(Calendar = Modules.Calendar || (Modules.Calendar = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
