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
            this.init();
            this.addFilterChangeListener();
            this.handleSearch();
            this.$scope.ShowCancelSearch = false;
        }
        public ClearFilters() {
            CacheManager.ClearStorage();
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
            try {
                CacheManager.Get<number>("Filter_Month", function (storage) {
                    month = storage.data;
                    if (!month) {
                        month = new Date().getMonth() + 1;
                    }
                });
                vm.CacheManager.Get<number>("Filter_Year", function (storage) {
                    year = storage.data;
                    if (!year) {
                        year = new Date().getFullYear();
                    }
                });
                vm.CacheManager.Get<Array<MODELS.UGenre>>("ActiveGenres", function (storage) {
                    genres = storage.data;
                });
                vm.CacheManager.Get<Array<MODELS.UCountry>>("ActiveCountries", function (storage) {
                    countries = storage.data;
                });
            } catch (e) {
                year = new Date().getFullYear();
                month = new Date().getMonth() + 1;
                genres = new Array<MODELS.UGenre>();
                countries = new Array<MODELS.UCountry>();
            }
            vm.$scope.IsLoading = true;
            vm.CalendarService.GetFilteredFestivals(month, year, genres, countries).then(function (r) {
                vm.$scope.Festivals = r.Data;
                vm.$scope.IsLoading = false;
            });

        }

        private addFilterChangeListener(): void {
            var vm = this;
            window.addEventListener("FilterChanged", function (e: CustomEventInit) {
                if (e) {
                    if (e.detail) {
                        vm.$scope.IsLoading = true;
                        var d = e.detail as FC.Modules.Filtering.Models.FilterBarVM;
                        var genres = new Array<MODELS.UGenre>();
                        var month = new Date().getMonth() + 1;
                        var year = new Date().getFullYear();
                        CacheManager.Get<number>("Filter_Month", function (storage) {
                            month = storage.data;
                        });
                        vm.CacheManager.Get<number>("Filter_Year", function (storage) {
                            year = storage.data;
                        });
                        vm.CacheManager.Get<Array<MODELS.UGenre>>("ActiveGenres", function (storage) {
                            genres = storage.data;
                        });
                        vm.CalendarService.GetFilteredFestivals(month,year,genres, null).then(function (r) {
                            vm.$scope.Festivals = r.Data;
                            vm.$scope.IsLoading = false;
                        });
                    }
                }
            });
        }

        private initCalendar(): void {

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
