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
        
        public filter: FC.Shared.ServiceMessages.FestivalFilter;
        //public ActiveGenreID: number;
        static $inject = [
            '$http',
            '$q',
            '$mdDialog',
            '$scope',
            '$location',
            "$sce"
        ];

        public months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $mdDialog: angular.material.MDDialogService,
            $scope,
            $location: ng.ILocationService,
            $sce,
            $InfiniteScroll: any
        ) {
            super($http, $q, $scope, $location,  $mdDialog);
            var vm = this;
            vm.$scope = $scope;
            vm.CalendarService = new FC.Modules.Calendar.Services.CalendarService($http, $q);
            vm.$scope.inst = vm;
            vm.$scope.API = vm.FestivalService;
            vm.$scope.$location = $location;
            vm.$scope.FormID = '908ADBE0-5121-4857-9D3A-E829DCCE9D80';
            vm.$scope.MemReg = FC.Shared.Util.MemReg.GetInstance();
            vm.$scope.MtModal = $mdDialog;
            this.addFilterChangeListener();
            this.handleSearch();
            vm.filter = new FC.Shared.ServiceMessages.FestivalFilter();
            vm.filter.PageLength = 12;
            vm.filter.BlockLength = 295;
            vm.$scope.SearchResult = new Array<FC.Shared.Models.FestivalListItem>();
            vm.$scope.API.API_COMPLETED = false;
            this.$scope.ShowCancelSearch = false;
            window.addEventListener("SearchCleared", function (e) {
                vm.LoadMore();
            });
            vm.init();
        }

        public LoadMore() {
            var vm = this;
            //disable for search screen
            if (vm.$scope.SearchResult.length == 0) {
                if (!vm.$scope.Festivals) {
                    vm.$scope.Festivals = new Array<MODELS.FestivalListItem>();
                }
                vm.$scope.API.Busy = true;
                if (vm.$scope.API.API_COMPLETED == false) {
                    vm.FestivalService.GetByFilter(vm.filter).then(function (r) {
                        if (r.Data.length == 0) {
                            vm.$scope.API.API_COMPLETED = true;
                            vm.$scope.API.Busy = false;
                        }
                        vm.$scope.API.Busy = false;
                        r.Data.forEach(function (v, k) {
                            vm.filter.MonthNum = parseInt(v.Start_M);
                            if (!vm.$scope.Festivals.some(function (v2, k2) {
                                return v2.FestivalID == v.FestivalID;
                            })) {
                                vm.$scope.Festivals.push(v);
                            }
                        });
                        vm.filter.CurrentLength = vm.$scope.Festivals.length;
                        vm.$scope.IsLoading = false;
                        var e = new CustomEvent("CalendarLoaded");
                        window.dispatchEvent(e);
                    });
                } else {
                    vm.$scope.API.Busy = false;
                }
            }
        }


        public LoadUpcoming() {
            var vm = this;
            if (!vm.$scope.Festivals) {
                vm.$scope.Festivals = new Array<MODELS.FestivalListItem>();
            }

            vm.CalendarService.GetUpcoming(vm.filter).then(function (r) {
                if (r.Data.length == 0) {
                    vm.$scope.API.API_COMPLETED = true;
                    vm.$scope.API.Busy = false;
                }
                vm.$scope.API.Busy = false;
                r.Data.forEach(function (v, k) {
                    if (!vm.$scope.Festivals.some(function (v2, k2) {
                        return v2.FestivalID == v.FestivalID;
                    })) {
                        vm.$scope.Festivals.push(v);
                    }
                });
                vm.filter.CurrentLength = vm.$scope.Festivals.length;
                vm.$scope.IsLoading = false;
                var e = new CustomEvent("CalendarLoaded");
                window.dispatchEvent(e);
            });
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

        public ClearFavorites() {
            var vm = this;
            if (CacheManager.GetCookieValue("UserID")) {
                vm.FavoriteService.RemoveAllUserFavorites(CacheManager.GetCookieValue("UserID")).then(function (r) {
                    vm.ClearFilters();
                });
            } else {
                vm.ClearFilters();
            }
        }
        private handleSearch() {
            var vm = this;
            vm.$scope.API.API_COMPLETED = false;
            vm.$scope.API.Busy = false;
            window.addEventListener("SearchStart", function (e: CustomEventInit) {
                vm.$scope.IsLoading = true;
                vm.$scope.SearchResult = new Array<FC.Shared.Models.FestivalListItem>();
            });
            window.addEventListener("SearchReset", function (e: CustomEventInit) {
                var festivals = e.detail;
                vm.init();
            });
            window.addEventListener("SearchComplete", function (e: CustomEventInit) {
                var festivals = e.detail;
                vm.$scope.SearchResult = festivals;
                vm.$scope.Festivals = festivals;
                vm.$scope.IsLoading = false;
                vm.$scope.ShowCancelSearch = true;
           
            });
            window.addEventListener("SearchCompleteNoResult", function (e: CustomEventInit) {
                var festivals = e.detail;
                vm.$scope.Festivals = [];
                vm.$scope.ShowCancelSearch = true;
                vm.$scope.IsLoading = false;
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
            vm.$scope.IsLoading = true;
            var e = new CustomEvent("CalendarLoading");
            window.dispatchEvent(e);
            try {
                var filter = this.getFilter();
                
            } catch (e) {
                year = new Date().getFullYear();
                month = new Date().getMonth() + 1;
                genres = new Array<MODELS.UGenre>();
                countries = new Array<MODELS.UCountry>();
            }
        }

        //private getRemoteFilter(): ng.IPromise<FC.Shared.ServiceMessages.FestivalFilter> {
        //    var vm = this;
        //    var filter: FC.Shared.ServiceMessages.FestivalFilter = new FC.Shared.ServiceMessages.FestivalFilter();
        //    filter.YearNum = -1;
        //    filter.MonthNum = -1;
        //    if(CacheManager.GetCookieValue("UserID")) {
        //        vm.FavoriteService.GetUserFavorites(CacheManager.GetCookieValue("UserID"), Shared.Enum.InternalContentType.All).then(function (r) {
        //        var filter = new FC.Shared.ServiceMessages.FestivalFilter(
        //            r.Data.filter(function (v, k) {
        //                return v.ContentType == Shared.Enum.InternalContentType.Genre
        //            }),
        //            r.Data.filter(function (v, k) {
        //                return v.ContentType == Shared.Enum.InternalContentType.Artist
        //            }),
        //            r.Data.filter(function (v, k) {
        //                return v.ContentType == Shared.Enum.InternalContentType.Location
        //            }),
        //            r.Data.filter(function (v, k) {
        //                return v.ContentType == Shared.Enum.InternalContentType.Country
        //            })
        //        );
        //        if (CacheManager.GetCookieValue("Filter_Month")) {
        //            filter.MonthNum = parseInt(CacheManager.GetCookieValue("Filter_Month"));
        //            //vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
        //        }
        //        if (CacheManager.GetCookieValue("Filter_Year")) {
        //            filter.YearNum = parseInt(CacheManager.GetCookieValue("Filter_Year"));
        //            //vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
        //        }

        //        vm.CalendarService.GetByFilter(filter).then(function (r) {
        //            vm.$scope.Festivals = r.Data;
        //            vm.$scope.IsLoading = false;
        //            var e = new CustomEvent("CalendarLoaded");
        //            window.dispatchEvent(e);
        //        });
        //    });
        //    }
        //}

        private getFilter(): FC.Shared.ServiceMessages.FestivalFilter {

            var vm = this;
            var genres = new Array<MODELS.UGenre>();
            var countries = new Array<MODELS.UCountry>();
            var locations = new Array<MODELS.Location>();
            var artists = new Array<MODELS.UArtist>();
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            if (CacheManager.GetCookieValue("Filter_Month")) {
                month = parseInt(CacheManager.GetCookieValue("Filter_Month"));
            } else {
                vm.filter.MonthNum = -1;
            }
            if (CacheManager.GetCookieValue("Filter_Year")) {
                year = parseInt(CacheManager.GetCookieValue("Filter_Year"));
            } else {
                vm.filter.YearNum = -1;
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
            if (vm.CacheManager.Contains("ActiveGenres")) {
                genres = vm.CacheManager.Get<Array<FC.Shared.Models.UGenre>>("ActiveGenres").data;
                if (genres.forEach) {
                    genres.forEach(function (v, k) {
                        vm.filter.GenreIDs.push(v.GenreID);
                    });
                }
            }
            if (vm.CacheManager.Contains("ActiveCountries")) {
                countries = vm.CacheManager.Get<Array<FC.Shared.Models.UCountry>>("ActiveCountries").data;

                if (countries.forEach) {
                    countries.forEach(function (v, k) {
                        vm.filter.CountryIDs.push(v.CountryID);
                    });
                }
            }
            if (vm.CacheManager.Contains("ActiveArtists")) {
                artists = vm.CacheManager.Get<Array<FC.Shared.Models.UArtist>>("ActiveArtists").data;
                if (artists.forEach) {
                    artists.forEach(function (v, k) {
                        vm.filter.ArtistIDs.push(v.CountryID);
                    });
                }
            }
            if (vm.CacheManager.Contains("ActiveLocations")) {
                locations = vm.CacheManager.Get<Array<FC.Shared.Models.Location>>("ActiveLocations").data;
                if (locations.forEach) {
                    locations.forEach(function (v, k) {
                        vm.filter.LocationIDs.push(v.LocationID);
                    });
                }
            }
            vm.filter.YearNum = year;
            vm.filter.MonthNum = month;
            return vm.filter;
        }

        private addFilterChangeListener(): void {
            var vm = this;
            //document.getElementById("initialResult").remove();
            window.addEventListener("FilterChanged", function (e: CustomEventInit) {
                if (e) {
                    if (e.detail) {
                        vm.$scope.IsLoading = true;
                        vm.filter.CurrentLength = 0;
                        vm.$scope.API.API_COMPLETED = false;
                        vm.$scope.API.Busy = false;
                        var evt = new CustomEvent("CalendarLoading");
                        window.dispatchEvent(evt);
                        var d = e.detail as FC.Modules.Filtering.Models.FilterBarVM;
                        var filter = vm.getFilter();
                        vm.CalendarService.GetByFilter(filter).then(function (r) {
                            vm.$scope.Festivals = r.Data;
                            vm.$scope.IsLoading = false;
                            var evt = new CustomEvent("CalendarLoaded");
                            window.dispatchEvent(evt);
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
