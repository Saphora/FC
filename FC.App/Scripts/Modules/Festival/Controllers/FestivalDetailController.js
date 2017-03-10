var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../Festival.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Festival;
        (function (Festival) {
            var Controllers;
            (function (Controllers) {
                var FestivalDetailController = (function (_super) {
                    __extends(FestivalDetailController, _super);
                    function FestivalDetailController($http, $q, $scope, $route, $routeParams, $location, ThemingService, LocalizationService, FestivalService, NewsService, RatesService, BannerService, UrlManagerService, $sce, GenreService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingService, LocalizationService);
                        this.ShowTravelInfo = false;
                        this.vm = this;
                        this.$sce = $sce;
                        this._inst = this;
                        this.GenreService = GenreService;
                        this.BannerService = BannerService;
                        this.URLManSvc = UrlManagerService;
                        this.$scope.URLManSvc = this.URLManSvc;
                        this.$scope._inst = this._inst;
                        //this.$scope.CountryData = CountryData;
                        this.Euro = 0;
                        var vm = this;
                        this.ActiveFestivalID = parseInt($routeParams["festival"]);
                        this._InitGenres();
                        vm._InitializeCOLLG2Banner();
                        NewsService.GetFilteredNews(vm.UserGenres).then(function (cd) {
                            vm.$scope.News = cd.Data;
                        });
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                        FestivalService.GetFestival(this.ActiveFestivalID).then(function (scope) {
                            vm.$scope.FestivalDetails = scope.Data.FestivalDetails;
                            vm.ActiveFestival = vm.$scope.FestivalDetails;
                            if (vm.ActiveFestival.AftermovieYoutubeURL) {
                                vm.$scope.TrustMovieURL = vm.$sce.trustAsResourceUrl(vm.ActiveFestival.AftermovieYoutubeURL);
                                vm.$scope.ShowMovie = true;
                            }
                            else {
                                vm.$scope.ShowMovie = false;
                            }
                            vm.$scope.Artists = scope.Data.Artists;
                            vm.$scope.Genres = scope.Data.Genres;
                            vm.ActiveFestival = scope.Data.FestivalDetails;
                            if (vm.ActiveFestival.DailyTicketPrice > 0) {
                                vm.Euro = vm.ActiveFestival.DailyTicketPrice;
                                RatesService.EurToUc(parseInt(vm.ActiveFestival.DailyTicketPrice.toString()), vm.ActiveFestival.Localization, vm.DailyTicketPriceCalculated, $scope._inst);
                            }
                            if (vm.ActiveFestival.TicketPrice > 0) {
                                vm.Euro = vm.ActiveFestival.TicketPrice;
                                RatesService.EurToUc(parseInt(vm.ActiveFestival.TicketPrice.toString()), vm.ActiveFestival.Localization, vm.TicketPriceCalculated, $scope._inst);
                            }
                        });
                        this._InitializeURLs();
                    }
                    FestivalDetailController.prototype._InitializeURLs = function () {
                        var vm = this;
                        //0=year,1=month,2=country
                        this.URLManSvc.AddURL("FestivalDetail", "Festival", "calendar/{0}/{1}/{2}");
                        vm.$scope.GetCalendarURL = this.GetCalendarURL;
                    };
                    FestivalDetailController.prototype.GetCalendarURL = function () {
                        var vm = this.vm;
                        return this.vm.URLManSvc.GetURL("FestivalDetail", "Festival", [vm.$routeParams["year"], vm.$routeParams["month"], vm.$routeParams["country"]]);
                    };
                    FestivalDetailController.prototype._InitializeCOLLG2Banner = function () {
                        var vm = this;
                        var BannerFilter = new FC.Shared.ServiceMessages.BannerFilter();
                        BannerFilter.Genres = [];
                        vm.UserGenres.forEach(function (value, index) {
                            BannerFilter.Genres.push(value);
                        });
                        BannerFilter.Layout = "COL_LG_2";
                        vm.BannerService.GetBanners(BannerFilter).then(function (b) {
                            vm.$scope.Banner = b.Data[0];
                        });
                    };
                    FestivalDetailController.prototype._InitGenres = function () {
                        var vm = this;
                        this.UserGenres = new Array();
                        if (this.CacheManager.Contains("user-genres")) {
                            this.UserGenres = vm.ClearNullIndexes(this.CacheManager.GetStorage("user-genres").data);
                        }
                    };
                    FestivalDetailController.prototype.TicketPriceCalculated = function (rates, scope) {
                        var vm = scope;
                        scope.ActiveFestival.CalcPrice = "";
                        rates.Rates.Add("EUR", 1, rates.Rates);
                        fx.rates = rates.Rates.GetAllArray();
                        accounting.settings = {
                            currency: {
                                symbol: $AppConfig.Localization.CultureMoneySign,
                                format: {
                                    pos: 'Total: <span class="money"><span class="format">%s</span><span class="money-value">%v</span></span>',
                                    neg: 'Total: <span class="money"><span class="format">%s</span><span class="money-value">(%v)</span></span>',
                                    zero: 'Total: <span class="money"><span class="format">%s</span><span class="money-value">--</span></span>' // for zero values, eg. "$  --" [optional]
                                },
                                decimal: $AppConfig.Localization.CultureCurrencySeparator,
                                thousand: ",",
                                precision: $AppConfig.Localization.CurrencyCultureDecimalDigits // decimal places
                            },
                            number: {
                                precision: $AppConfig.Localization.NumberDecimalDigits,
                                thousand: '.',
                                decimal: $AppConfig.Localization.NumberDecimalSeparator
                            }
                        };
                        scope.ActiveFestival.CalcPrice = accounting.formatMoney(fx.convert(vm.Euro, { from: "EUR", to: $AppConfig.Localization.ISOCurrencySymbol }));
                        scope.$scope.FestivalDetails = scope.ActiveFestival;
                    };
                    FestivalDetailController.prototype.DailyTicketPriceCalculated = function (rates, scope) {
                        var vm = scope;
                        scope.ActiveFestival.CalcDailyPrice = "";
                        rates.Rates.Add("EUR", 1, rates.Rates);
                        fx.rates = rates.Rates.GetAllArray();
                        accounting.settings = {
                            currency: {
                                symbol: $AppConfig.Localization.CultureMoneySign,
                                format: {
                                    pos: 'Daily: <span class="money"><span class="format">%s</span><span class="money-value">%v</span></span>',
                                    neg: 'Daily: <span class="money"><span class="format">%s</span><span class="money-value">(%v)</span></span>',
                                    zero: 'Daily: <span class="money"><span class="format">%s</span><span class="money-value">--</span></span>' // for zero values, eg. "$  --" [optional]
                                },
                                decimal: $AppConfig.Localization.CultureCurrencySeparator,
                                thousand: ",",
                                precision: $AppConfig.Localization.CurrencyCultureDecimalDigits // decimal places
                            },
                            number: {
                                precision: $AppConfig.Localization.NumberDecimalDigits,
                                thousand: '.',
                                decimal: $AppConfig.Localization.NumberDecimalSeparator
                            }
                        };
                        scope.ActiveFestival.CalcDailyPrice = accounting.formatMoney(fx.convert(vm.Euro, { from: "EUR", to: $AppConfig.Localization.ISOCurrencySymbol }));
                        scope.$scope.Festival = scope.ActiveFestival;
                        scope.$scope.FestivalDetails = scope.ActiveFestival;
                    };
                    FestivalDetailController.prototype._HasTravelInfo = function (festival) {
                        if (festival.TrainInfo != null && festival.TrainInfo != undefined && festival.TrainInfo.length > 0) {
                            this.ShowTravelInfo = true;
                        }
                        else if (festival.BikeInfo != null && festival.BikeInfo != undefined && festival.BikeInfo.length > 0) {
                            this.ShowTravelInfo = true;
                        }
                        else if (festival.BusInfo != null && festival.BusInfo != undefined && festival.BusInfo.length > 0) {
                            this.ShowTravelInfo = true;
                        }
                        else if (festival.TaxiInfo != null && festival.TaxiInfo != undefined && festival.TaxiInfo.length > 0) {
                            this.ShowTravelInfo = true;
                        }
                        else if (festival.AirPlaneInfo != null && festival.AirPlaneInfo != undefined && festival.AirPlaneInfo.length > 0) {
                            this.ShowTravelInfo = true;
                        }
                        else if (festival.Car != null && festival.AirPlaneInfo != undefined && festival.AirPlaneInfo.length > 0) {
                            this.ShowTravelInfo = true;
                        }
                        else {
                            this.ShowTravelInfo = false;
                        }
                    };
                    //public ActiveGenreID: number;
                    FestivalDetailController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "FC.Modules.Theming.Services.ThemingService",
                        "FC.Core.Services.LocalizationService",
                        'FC.Modules.Festival.Services.FestivalService',
                        "FC.Modules.News.Services.NewsService",
                        "FC.Modules.Rates.Services.RatesService",
                        "FC.Modules.Banners.Services.BannerService",
                        "FC.Core.Services.URLManagerService",
                        "$sce",
                        "FC.Modules.Genres.Services.GenreService"
                    ];
                    return FestivalDetailController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.FestivalDetailController = FestivalDetailController;
                FestivalModule.GetApplication().RegisterController("FC.Modules.Festival.Controllers.FestivalDetailController", FC.Modules.Festival.Controllers.FestivalDetailController);
            })(Controllers = Festival.Controllers || (Festival.Controllers = {}));
        })(Festival = Modules.Festival || (Modules.Festival = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
