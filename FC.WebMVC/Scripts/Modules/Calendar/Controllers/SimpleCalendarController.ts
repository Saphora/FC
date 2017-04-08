///<reference path="../../Core/FC.ts"/>
///<reference path="../Calendar.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Calendar.Controllers {

    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;

    export class SimpleCalendarController extends FC.Shared.Controllers.BaseController {

        public inst: FC.Modules.Calendar.Controllers.SimpleCalendarController;
        public $scope: Models.ICalendarVM;

        //public ActiveGenreID: number;
        static $inject = [
            '$http',
            '$q',
            '$mdDialog',
            '$scope',
            '$route',
            '$routeParams',
            '$location',
            "$sce"
        ];

        public months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $mdDialog: angular.material.MDDialogService,
            $scope,
            $route,
            $routeParams,
            $location: ng.ILocationService,
            $sce
        ) {
            super($http, $q, $scope, $location, $routeParams, $mdDialog);

            var vm = this;
            vm.$scope = $scope;
            vm.CalendarService = new FC.Modules.Calendar.Services.CalendarService($http, $q);
            vm.$scope.inst = vm;
            vm.$scope.$routeParams = $routeParams;
            vm.$scope.$location = $location;
            vm.$scope.FormID = '908ADBE0-5121-4857-9D3A-E829DCCE9D80';
            vm.$scope.MemReg = FC.Shared.Util.MemReg.GetInstance();
            vm.$scope.MtModal = $mdDialog;
            vm.$scope.IsLoading = false;
            CacheManager.ClearStorage();
            this.addFilterChangeListener();
            this.handleSearch();
            this.$scope.ShowCancelSearch = false;
            vm.init();
        }
        public ClearFilters() {
            CacheManager.DeleteStorage("Filter_Year");
            CacheManager.DeleteStorage("Filter_Month");
            CacheManager.DeleteStorage("ActiveGenres");
            CacheManager.DeleteStorage("ActiveCountries");
            CacheManager.DeleteStorage("ActiveLocations");
            CacheManager.DeleteStorage("ActiveArtists");
            var e = new CustomEvent("ClearFilter");
            window.dispatchEvent(e);
            this.init();
        }
        private handleSearch() {
            var vm = this;
            window.addEventListener("SearchReset", function (e: CustomEventInit) {
                var festivals = e.detail;
                vm.init();
            });
            window.addEventListener("SearchComplete", function (e: CustomEventInit) {
                var festivals = e.detail;
                vm.$scope.Festivals = festivals;
                vm.$scope.ShowCancelSearch = true;
            });
            window.addEventListener("SearchCompleteNoResult", function (e: CustomEventInit) {
                var festivals = e.detail;
                vm.$scope.Festivals = [];
                vm.$scope.ShowCancelSearch = true;
            });
        }
        private init() {
            var vm = this;
            var genres = new Array<MODELS.UGenre>();
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            var countries = new Array<MODELS.UCountry>();
            var locations = new Array<MODELS.Location>();
            var artists = new Array<MODELS.UArtist>();
            vm.$scope.IsLoading = false;
            try {


                if (CacheManager.GetCookieValue("UserID")) {
                    vm.FavoriteService.GetUserFavorites(CacheManager.GetCookieValue("UserID"), Shared.Enum.InternalContentType.All).then(function (r) {
                        var filter = new FC.Shared.ServiceMessages.FestivalFilter(
                            r.Data.filter(function (v, k) {
                               return v.ContentType == Shared.Enum.InternalContentType.Genre
                            }),
                            r.Data.filter(function (v, k) {
                                return v.ContentType == Shared.Enum.InternalContentType.Artist
                            }),
                            r.Data.filter(function (v, k) {
                                return v.ContentType == Shared.Enum.InternalContentType.Location
                            }),
                            r.Data.filter(function (v, k) {
                                return v.ContentType == Shared.Enum.InternalContentType.Country
                            })
                        );
                        if (CacheManager.GetCookieValue("Filter_Month")) {
                            filter.MonthNum = parseInt(CacheManager.GetCookieValue("Filter_Month"));
                            //vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                        }
                        if (CacheManager.GetCookieValue("Filter_Year")) {
                            filter.YearNum = parseInt(CacheManager.GetCookieValue("Filter_Year"));
                            //vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                        }
                        if (vm.CacheManager.Contains("ActiveGenres")) {
                            genres = vm.CacheManager.Get<Array<FC.Shared.Models.UGenre>>("ActiveGenres").data;
                            genres.forEach(function (v, k) {
                                filter.GenreIDs.push(v.GenreID);
                            });
                        }
                        if (vm.CacheManager.Contains("ActiveCountries")) {
                            countries = vm.CacheManager.Get<Array<FC.Shared.Models.UCountry>>("ActiveCountries").data;
                            countries.forEach(function (v, k) {
                                filter.CountryIDs.push(v.CountryID);
                            });
                        }
                        if (vm.CacheManager.Contains("ActiveArtists")) {
                            artists = vm.CacheManager.Get<Array<FC.Shared.Models.UArtist>>("ActiveArtists").data;
                            artists.forEach(function (v, k) {
                                filter.ArtistIDs.push(v.CountryID);
                            });
                        }
                        if (vm.CacheManager.Contains("ActiveLocations")) {
                            locations = vm.CacheManager.Get<Array<FC.Shared.Models.Location>>("ActiveLocations").data;
                            locations.forEach(function (v, k) {
                                filter.LocationIDs.push(v.LocationID);
                            });
                        }
                        vm.CalendarService.GetByFilter(filter).then(function (r) {
                            vm.$scope.Festivals = r.Data;
                            vm.$scope.IsLoading = false;
                        });
                    });
                } else {
                    var filter: FC.Shared.ServiceMessages.FestivalFilter = new FC.Shared.ServiceMessages.FestivalFilter();
                    filter.YearNum = -1;
                    filter.MonthNum = -1;
                    
                    var genres = new Array<MODELS.UGenre>();
                    var countries = new Array<MODELS.UCountry>();
                    var locations = new Array<MODELS.Location>();
                    var artists = new Array<MODELS.UArtist>();
                    var month = new Date().getMonth() + 1;
                    var year = new Date().getFullYear();
                    
                    if (CacheManager.GetCookieValue("Filter_Month")) {
                        month = parseInt(CacheManager.GetCookieValue("Filter_Month"));
                    }
                    if (CacheManager.GetCookieValue("Filter_Year")) {
                        year = parseInt(CacheManager.GetCookieValue("Filter_Year"));
                    }
                    if (vm.CacheManager.Contains("ActiveGenres")) {
                        genres = vm.CacheManager.Get<Array<FC.Shared.Models.UGenre>>("ActiveGenres").data;
                    }
                    if (vm.CacheManager.Contains("ActiveCountries")) {
                        countries = vm.CacheManager.Get<Array<FC.Shared.Models.UCountry>>("ActiveCountries").data;
                    }
                    if (vm.CacheManager.Contains("ActiveArtists")) {
                        artists = vm.CacheManager.Get<Array<FC.Shared.Models.UArtist>>("ActiveArtists").data;
                    }
                    if (vm.CacheManager.Contains("ActiveLocations")) {
                        locations = vm.CacheManager.Get<Array<FC.Shared.Models.Location>>("ActiveLocations").data;
                    }
                    filter.YearNum = year;
                    filter.MonthNum = month;
                    
                    vm.CalendarService.GetFilteredFestivals(filter.MonthNum, filter.YearNum, genres, countries).then(function (r) {
                        vm.$scope.Festivals = r.Data;
                        vm.$scope.IsLoading = false;
                    });
                }
            } catch (e) {
                year = new Date().getFullYear();
                month = new Date().getMonth() + 1;
                genres = new Array<MODELS.UGenre>();
                countries = new Array<MODELS.UCountry>();
            }
        }

        private addFilterChangeListener(): void {
            var vm = this;
            //document.getElementById("initialResult").remove();
            window.addEventListener("FilterChanged", function (e: CustomEventInit) {
                if (e) {
                    if (e.detail) {
                        vm.$scope.IsLoading = true;
                        var d = e.detail as FC.Modules.Filtering.Models.FilterBarVM;
                        var genres = new Array<MODELS.UGenre>();
                        var countries = new Array<MODELS.UCountry>();
                        var locations = new Array<MODELS.Location>();
                        var artists = new Array<MODELS.UArtist>();
                        var month = new Date().getMonth() + 1;
                        var year = new Date().getFullYear();
                        
                        if (CacheManager.GetCookieValue("Filter_Month")) {
                            month = parseInt(CacheManager.GetCookieValue("Filter_Month"));
                        }
                        if (CacheManager.GetCookieValue("Filter_Year")) {
                            year = parseInt(CacheManager.GetCookieValue("Filter_Year"));
                        }
                        if (vm.CacheManager.Contains("ActiveGenres")) {
                            genres = vm.CacheManager.Get<Array<FC.Shared.Models.UGenre>>("ActiveGenres").data;
                        }
                        if (vm.CacheManager.Contains("ActiveCountries")) {
                            countries = vm.CacheManager.Get<Array<FC.Shared.Models.UCountry>>("ActiveCountries").data;
                        }
                        if (vm.CacheManager.Contains("ActiveArtists")) {
                            artists = vm.CacheManager.Get<Array<FC.Shared.Models.UArtist>>("ActiveArtists").data;
                        }
                        if (vm.CacheManager.Contains("ActiveLocations")) {
                            locations = vm.CacheManager.Get<Array<FC.Shared.Models.Location>>("ActiveLocations").data;
                        }
                        vm.CalendarService.GetFilteredFestivals(month,year,genres,countries).then(function (r) {
                            vm.$scope.Festivals = r.Data;
                            vm.$scope.IsLoading = false;
                        });
                    }
                }
            });
        }
    }
    CalendarModule.GetApplication().RegisterController("FC.Modules.Calendar.Controllers.SimpleCalendarController", FC.Modules.Calendar.Controllers.SimpleCalendarController);
}

            //$scope = $scope.inst.$scope;
            //var any = false;
            //var modified = false;
            //any = $scope.SelectedGenres.some(function (v, i) {
            //    if (v.GenreID == genre.GenreID) {
            //        return true;
            //    } else {
            //        return false;
            //    }
            //});
            //if (any == false) {
            //    $scope.SelectedGenres.push(genre);
            //    CacheManager.WriteStorage("ActiveGenres", $scope.SelectedGenres, 999999999999999);
            //    modified = true;
            //} else {

            //    var index = -1;
            //    if ($scope.SelectedGenres.some(function (v, i) {
            //        if (v.GenreID == genre.GenreID) {
            //            return true;
            //        } else {
            //            index++;
            //            return false;
            //        }
            //    })) {
            //        delete $scope.SelectedGenres[index];
            //        $scope.SelectedGenres = $scope.RepairArray($scope.SelectedGenres);
            //        CacheManager.WriteStorage("ActiveGenres", $scope.SelectedGenres, 999999999999999);
            //        modified = false;
            //    }
            //}
