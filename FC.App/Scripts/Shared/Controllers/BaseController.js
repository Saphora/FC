///<reference path="../../Modules/Core/AppConfig.ts" />
///<reference path="../Util/CacheManager.ts"/>
// IsThemesLoading: boolean;//
// IsCountriesLoading: boolean;//
// IsGenresLoading: boolean;//
// IsFestivalsLoading: boolean;//
var FC;
(function (FC) {
    var Shared;
    (function (Shared) {
        var Controllers;
        (function (Controllers) {
            var BaseController = (function () {
                function BaseController($http, $q, $scope, $location, $routeParams, ThemingService, LocalizationSvc) {
                    this.BaseIsLoading = true;
                    this._detectCount = 0;
                    this._timeout = null;
                    var vm = this;
                    this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                    this.$scope = $scope;
                    this.$http = $http;
                    this.$q = $q;
                    this.GenreService = new FC.Modules.Genres.Services.GenreService($http, $q);
                    this.CountriesSvc = new FC.Modules.Countries.Services.CountriesService($http, $q);
                    this.LocalizationService = LocalizationSvc;
                    this.ThemingSvc = ThemingService;
                    this.$location = $location;
                    this.$routeParams = $routeParams;
                    this.$inst = this;
                    this.initLoadingScope();
                    this.SetThemeData();
                    this.SetCountryCache();
                    this.SetGenreData();
                }
                BaseController.prototype.initLoadingScope = function () {
                    var vm = this;
                    vm.$scope.IsThemesLoading = true;
                    vm.$scope.IsCountriesLoading = true;
                    vm.$scope.IsGenresLoading = true;
                    vm.$scope.IsFestivalsLoading = true;
                };
                BaseController.prototype.detectByLang = function ($scope) {
                    var vm = this;
                    $AppConfig.CurrentCountry = navigator.browserLanguage || navigator.language || navigator.systemLanguage;
                    vm.CountriesSvc.GetByCode($AppConfig.CurrentCountry).then(function (r) {
                        var country = r.Data;
                        $scope.CurrentCountryName = country.Name;
                        $scope.CurrentCountry = $AppConfig.CurrentCountry;
                        $scope.vm.CacheManager.WriteStorage('user-location', $AppConfig.CurrentCountry);
                        if (!$scope.vm.CacheManager.Contains("user-countries")) {
                            $scope.vm.CacheManager.WriteStorage('user-countries', [r.Data.CountryID]);
                        }
                        vm.SetUserCountries();
                    });
                };
                BaseController.prototype.SetGenreData = function () {
                    var vm = this;
                    if (!this.CacheManager.Contains("sys-genres")) {
                        vm.GenreService.GetAllRoot().then(function (r) {
                            vm.CacheManager.WriteStorage("sys-genres", r.Data);
                            var genreIDs = [];
                            if (!vm.CacheManager.Contains("user-genres")) {
                                r.Data.forEach(function (value, index) {
                                    if (value.Name.toLowerCase() == "default") {
                                        value.Children.forEach(function (value, key) {
                                            genreIDs.push(value.GenreID);
                                        });
                                        vm.CacheManager.WriteStorage("user-genres", genreIDs, 1000 * 60 * 60 * 24 * 7);
                                    }
                                });
                            }
                        });
                    }
                };
                BaseController.prototype.SetThemeData = function () {
                    var vm = this;
                    if (!vm.CacheManager.Contains("active-theme")) {
                        ThemeData.forEach(function (theme, key) {
                            if (theme.Name.toLowerCase() == "default") {
                                vm.CacheManager.WriteStorage("active-theme", theme, 1000 * 60 * 60 * 24 * 2);
                                vm.$scope.IsThemesLoading = false;
                            }
                        });
                    }
                };
                BaseController.prototype.SetCountryCache = function () {
                    var vm = this;
                    if (!vm.CacheManager.Contains("sys-countries")) {
                        vm.CountriesSvc.GetAll().then(function (r) {
                            vm.CacheManager.WriteStorage("sys-countries", r.Data, 1000 * 60 * 60 * 2);
                            vm.$scope.IsCountriesLoading = false;
                        });
                    }
                };
                BaseController.prototype.DetectLocation = function ($scope) {
                    var vm = this;
                    vm.$scope.vm = this;
                    vm.NominatimSvc = new FC.Core.Services.NominatimService(vm.$http, vm.$q);
                    if (!vm.CacheManager.Contains("user-location")) {
                        if (navigator.geolocation) {
                            vm._detectCount++;
                            //todo implement coord cache so that we minimalize request to nominatim.
                            navigator.geolocation.getCurrentPosition(function (position) {
                                vm.NominatimSvc.GetUserlocation(position.coords.latitude, position.coords.longitude).then(function (r) {
                                    console.log("Location detected via Nominatim");
                                    var data = new FC.Shared.Models.NLocation(r.data);
                                    $AppConfig.CurrentCountry = data.address.country_code;
                                    vm.CountriesSvc.GetByCode($AppConfig.CurrentCountry).then(function (r) {
                                        var country = r.Data;
                                        $scope.CurrentCountryName = country.Name;
                                        $scope.CurrentCountry = $AppConfig.CurrentCountry;
                                        $scope.vm.CacheManager.WriteStorage('user-location', $AppConfig.CurrentCountry);
                                        vm.SetUserCountries();
                                        if (!$scope.vm.CacheManager.Contains("user-countries")) {
                                            $scope.vm.CacheManager.WriteStorage('user-countries', [r.Data.CountryID]);
                                        }
                                    });
                                });
                            }, function () { vm.detectByLang(vm.$scope); }, { timeout: 10000 });
                        }
                        else {
                            vm.detectByLang($scope);
                        }
                    }
                    else {
                        vm.CacheManager.GetStorage("user-location", function (data) { vm.LocationCacheReceived(data, vm.$scope); }, this.DetectLocation);
                    }
                };
                BaseController.prototype.SetUserCountries = function () {
                    var vm = this;
                    var CountryData = new Array();
                    if (vm.CacheManager.Contains("sys-countries")) {
                        CountryData = vm.CacheManager.GetStorage("sys-countries");
                    }
                    else {
                        vm.CountriesSvc.GetAll().then(function (r) {
                            CountryData = r.Data;
                            vm.CacheManager.WriteStorage("sys-countries", CountryData, 1000 * 60 * 60 * 2);
                        });
                    }
                    if (vm.CacheManager.Contains("user-countries")) {
                        var countries = vm.CacheManager.GetStorage("user-countries");
                        vm.ActiveCountryIDs = countries.data;
                    }
                };
                BaseController.prototype.LocationCacheReceived = function (result, $scope) {
                    var vm = $scope.vm;
                    var data = result.data;
                    vm.CountriesSvc.GetByCode(data).then(function (r) {
                        var country = r.Data;
                        $AppConfig.CurrentCountry = data;
                        $scope.ActiveCountryName = country.Name;
                        $scope.CurrentCountryName = country.Name;
                        $scope.CurrentCountry = $AppConfig.CurrentCountry;
                        $scope.vm.CacheManager.WriteStorage('user-location', data);
                        vm.SetUserCountries();
                    });
                };
                BaseController.prototype.ClearNullIndexes = function (arr) {
                    var result = new Array();
                    $.each(arr, function (k, v) {
                        if (v != null) {
                            result.push(v);
                        }
                    });
                    return result;
                };
                BaseController.$inject = ['$q', '$http', '$scope', 'FC.Core.Services.LocalizationService'];
                return BaseController;
            }());
            Controllers.BaseController = BaseController;
        })(Controllers = Shared.Controllers || (Shared.Controllers = {}));
    })(Shared = FC.Shared || (FC.Shared = {}));
})(FC || (FC = {}));
