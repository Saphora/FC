/////<reference path="../../Core/FC.ts" />
/////<reference path="../../Core/Services/NominatimService.ts" />
/////<reference path="../Calendar.ts"/>
/////<reference path="../Services/CalendarService.ts"/>
/////<reference path="../../../Shared/Controllers/BaseController.ts"/>
/////<reference path="../../../Shared/Util/CacheManager.ts"/>
//module FC.Modules.Calendar.Controllers {

//    import CM = FC.Shared.CoreModel;
//    import INT = FC.Shared.Interfaces;
//    import MODELS = FC.Shared.Models;
//    import MODULES = FC.Modules;
//    export class CalendarController extends FC.Shared.Controllers.BaseController {
//        public $scope: FC.Shared.ViewModels.ICalendarVm;
//        public _inst: FC.Modules.Calendar.Controllers.CalendarController;
//        //base
//        public URLManager: FC.Core.Services.URLManagerService;
//        private CalendarSvc: FC.Modules.Calendar.Services.CalendarService;
//        public NewsSvc: FC.Modules.News.Services.NewsService;
//        public CacheManager: FC.Shared.Util.CacheManager;
//        private CalendarMonths: Array<string>;
//        private CalendarYears: Array<number>;
//        public ActiveMonthNum: number;
//        public ActiveYear: number;
//        public UserGenres: Array<string>;
//        //col data
//        public Festivals: Array<FC.Shared.ViewModels.IFestivalVM>;

//        static $inject = [
//            '$http',
//            '$q',
//            '$scope',
//            '$route',
//            '$routeParams',
//            '$location',
//            '$mdDialog',
//            '$sce',
//            "FC.Core.Services.URLManagerService",
//            "FC.Modules.Calendar.Services.CalendarService",
//            "FC.Modules.News.Services.NewsService"
//        ];

//        private _InitColDbo() {
//            this.Festivals = new Array<FC.Shared.ViewModels.IFestivalVM>();
//        }

//        private _InitServices(
//            CalendarService: FC.Modules.Calendar.Services.CalendarService,
//            NewsService: FC.Modules.News.Services.NewsService
//        ) {
//            this.CalendarSvc = CalendarService;

//            this.NewsSvc = NewsService;

//        }

//        private WatchSearchResult() {

//            var vm = this;
//            vm.$scope.HasSearchResults = false;
//            vm.$scope.IsFestivalsLoading = true;
//            vm.$scope.SearchNoResults = false;
//            vm.$scope.Searching = false;
//            window.addEventListener("Searching", function () {
//                vm.CacheManager.DeleteStorage("search-result");
//                vm.$scope.IsFestivalsLoading = true;
//                vm.$scope.SearchNoResults = false;
//                vm.$scope.Searching = true;
//                vm.$scope.IsLoading = true;
//            })
//            window.addEventListener("SearchCompletedWithResults", function () {

//                vm.$scope.Searching = false;
//                vm.CacheManager.GetStorage("search-result", function (data: any) {
//                    vm.$scope.HasSearchResults = true;
//                    var d = data.data as FC.Shared.ViewModels.IFestivalVM[];
//                    if (d.length == 0) {
//                        vm.$scope.SearchNoResults = true;
//                        vm.$scope.Searching = false;
//                        vm.$scope.IsLoading = false;
//                    } else {
//                        vm.$scope.BaseIsLoading = false;
//                        vm.$scope.Festivals = d;
//                        vm.$scope.Searching = false;
//                        vm.$scope.IsLoading = false;
//                    }
//                });
               
//            });
//            window.addEventListener("SearchCompletedWithNoResults", function () {
//                vm.$scope.IsLoading = false;
//                vm.$scope.SearchNoResults = true;
//                vm.$scope.Searching = false;
//            });
//        }

//        private _InitializeDateData($scope: any) {
//            //var vm = this;
//            //this.CalendarYears = [new Date().getFullYear(), new Date().getFullYear() + 1];

//            //$scope.ActiveYear = new Date().getFullYear();

//            //this.CalendarSvc.GetMonths().then(function (r: INT.IServiceResponse<Array<string>>) {
//            //    vm.CalendarMonths = r.Data;
//            //});
//        }

//        private compare(a, b) {
//            if (a.OrderDate < b.OrderDate) {
//                return -1;
//            }
//            else if (a.OrderDate > b.OrderDate) {
//                return 1;
//            }
//            else {
//                return 0;
//            }
//        }

//        private addFilterChangeListenerGenres(): void {
//            var vm = this;
//            window.addEventListener("FilterChanged", function (e: CustomEventInit) {
//                if (e) {
//                    if (e.detail) {
//                        var d = e.detail as FC.Modules.Filtering.Models.FilterBarVM;
//                        if (d.Genres) {
//                            vm.$scope.model.Selected = d.Genres.length + " SELECTED";
//                            d.Genres.forEach(function (g, i) {
//                                vm.$scope.model.SelectedGenreIds += g.GenreID + ',';
//                            });
//                            vm.$scope.model.SelectedGenres = d.Genres;
//                            vm.$scope.model.SelectedGenreIds = vm.$scope.model.SelectedGenreIds.substr(0, vm.$scope.model.SelectedGenreIds.length - 1);
                           
//                        }
//                    }
//                }
//            });
//        }

//        private addFilterChangeListenerDate(): void {
//            var vm = this;
//            window.addEventListener("FilterChanged", function (e: CustomEventInit) {
//                if (e) {
//                    if (e.detail) {
//                        var d = e.detail as FC.Modules.Filtering.FilterBarVM;
//                        if (d.Month >= 0 && d.Year) {
//                            vm.$scope.ActiveYear = d.Month;
//                            vm.$scope.Year = d.Year;
//                            vm.$scope.DateString = vm.months[d.Month].toUpperCase() + " / " + d.Year;
                           
//                        }
//                    }
//                }
//                var form = $('form#FilterBarForm');
//                form.attr('action', vm.$scope.FormURL);
//                //form.submit();
//            });
//        }
//        private _InitViewData($scope: any) {
//            var vm = this;
//            var genres: FC.Shared.Models.UGenre[] = new Array<FC.Shared.Models.UGenre>();

//            var genresFilter: MODELS.UGenre[] = new Array<MODELS.UGenre>();
//            if (vm.CacheManager.Contains('ActiveGenres')) {
//                var tmpGenres = vm.CacheManager.Get<FC.Shared.Models.UGenre[]>('ActiveGenres');
//                genres = tmpGenres.data;
//                genresFilter = genres;
//            }
//            var countriesFilter: MODELS.UCountry[] = new Array<MODELS.UCountry>();
//            if (vm.CacheManager.Contains("UserCountries")) {
//                countriesFilter = vm.CacheManager.Get<MODELS.UCountry[]>('UserCountries').data;
//            }
//            vm.CalendarSvc.GetFilteredFestivals(vm.$scope.ActiveMonth, vm.$scope.ActiveYear, genresFilter, countriesFilter).then(function (result: INT.IServiceResponse<FC.Shared.ViewModels.IFestivalVM[]>) {
//                vm.$scope.Festivals = result.Data;
//                vm.$scope.IsLoading = false;
//            });

//            window.addEventListener("ActiveGenres_Deleted", function (e) {
//                vm.$scope.IsLoading = true;
//                var countriesFilter: MODELS.UCountry[] = new Array<MODELS.UCountry>();
//                if (vm.CacheManager.Contains("UserCountries")) {
//                    countriesFilter = vm.CacheManager.Get<MODELS.UCountry[]>('UserCountries').data;
//                }
//                vm.CalendarSvc.GetFilteredFestivals(vm.$scope.ActiveMonth, vm.$scope.ActiveYear, new Array<MODELS.UGenre>(), countriesFilter).then(function (result: INT.IServiceResponse<FC.Shared.ViewModels.IFestivalVM[]>) {
//                    vm.$scope.Festivals = result.Data;
//                    vm.$scope.IsLoading = false;
//                });
//            });

//            window.addEventListener('ActiveGenres_Writed', function (e) {
//                vm.$scope.IsLoading = true;
//                var genres = new Array<FC.Shared.Models.UGenre>();
//                var tmpGenres = vm.CacheManager.Get<FC.Shared.Models.UGenre[]>('ActiveGenres');
//                genres = tmpGenres.data;
//                var genresFilter = genres;


//                var countriesFilter: MODELS.UCountry[] = new Array<MODELS.UCountry>();
//                if (vm.CacheManager.Contains("UserCountries")) {
//                    countriesFilter = vm.CacheManager.Get<MODELS.UCountry[]>('UserCountries').data;
//                }

//                vm.CalendarSvc.GetFilteredFestivals(vm.$scope.ActiveMonth, vm.$scope.ActiveYear, genresFilter, countriesFilter).then(function (result: INT.IServiceResponse<FC.Shared.ViewModels.IFestivalVM[]>) {
//                    vm.$scope.Festivals = result.Data;
//                    vm.$scope.IsLoading = false;
                    
//                });
//            });
//            window.addEventListener('UserCountries_Writed', function (e) {
//                var countries = vm.CacheManager.GetStorage('UserCountries');
//                var genres = new Array<MODELS.UGenre>();
//                if (vm.CacheManager.Contains("ActiveGenres")) {
//                    genres = vm.CacheManager.Get<MODELS.UGenre[]>('ActiveGenres').data;
//                }

//                vm.CalendarSvc.GetFilteredFestivals(vm.$scope.ActiveMonth, vm.$scope.ActiveYear, genres, countries.data).then(function (result: INT.IServiceResponse<FC.Shared.ViewModels.IFestivalVM[]>) {
//                    vm.$scope.Festivals = result.Data;
//                    vm.$scope.IsLoading = false;
//                });
//            });
//            window.addEventListener('UserCountries_Deleted', function (e) {
//                var countriesFilter: MODELS.UCountry[] = new Array<MODELS.UCountry>();
//                if (vm.CacheManager.Contains("UserCountries")) {
//                    countriesFilter = vm.CacheManager.Get<MODELS.UCountry[]>('UserCountries').data;
//                }
//                var genres = vm.CacheManager.GetStorage('UserCountries');

//                vm.CalendarSvc.GetFilteredFestivals(vm.$scope.ActiveMonth, vm.$scope.ActiveYear, genres.data, countriesFilter).then(function (result: INT.IServiceResponse<FC.Shared.ViewModels.IFestivalVM[]>) {
//                    vm.$scope.Festivals = result.Data;
//                    vm.$scope.IsLoading = false;
//                });
//            });

//        }

//        constructor(
//            $http,
//            $q,
//            $scope,
//            $route,
//            $routeParams,
//            $location,
//            $mdDialog,
//            $sce,
//            URLManagerService: FC.Core.Services.URLManagerService,
//            CalendarService: FC.Modules.Calendar.Services.CalendarService,
//            NewsService: FC.Modules.News.Services.NewsService
//        ) {
//            super($http, $q, $scope, $location, $routeParams,$mdDialog);
//            var genreSvc = new FC.Modules.Genres.Services.GenreService($http, $q);
//            var vm = this;
//            this.$scope.MediaURLRoot = FC.Core.Environment.MediaURLRoot;
//            this.$scope = $scope;
//            this.URLManager = new FC.Core.Services.URLManagerService($http,$q,null);
//            this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
//            this.initLoadingScope();
//            this._InitColDbo();
//            this._InitServices(CalendarService, NewsService);
//            this._InitializeDateData($scope);

//            if (!this.$scope.ActiveYear) {
//                if ($routeParams["year"] != null) {
//                    this.$scope.ActiveYear = $routeParams["year"];
//                } else if (CacheManager.Contains("ActiveYear")) {
//                    vm.$scope.ActiveYear = CacheManager.Get<number>("ActiveYear").data;
//                } else {
//                    this.$scope.ActiveYear = new Date().getFullYear();
//                }
//            }
//            if (!this.$scope.ActiveMonth) {
//                if ($routeParams["month"] != null) {
//                    this.$scope.ActiveMonth = $routeParams["month"];
//                } else if (CacheManager.Contains("ActiveMonth")) {
//                    vm.$scope.ActiveMonth = CacheManager.Get<number>("ActiveMonth").data;
//                } else {
//                    vm.$scope.ActiveMonth = new Date().getMonth() + 1;
//                }
//            }

//            this._InitViewData($scope);
//            this.WatchSearchResult();
//            this.URLManager.AddURL("festival", "FestivalURL", "festival/{0}/");
//            this.URLManager.AddURL("festival", "FestivalURL", "festival/{0}/{1}");


//        }

//        public GetFestivalURL(festival: FC.Shared.Models.UFestival): string {
//            var vm = this;
//            var retUrl = this.URLManager.GetURL("festival", "FestivalURL", [festival.FestivalID.toString()]);
//            return retUrl;
//        }
//    }
//    CalendarModule.GetApplication().RegisterController("FC.Modules.Calendar.Controllers.CalendarController", FC.Modules.Calendar.Controllers.CalendarController);
//}