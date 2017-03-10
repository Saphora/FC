///<reference path="../../Core/FC.ts"/>
///<reference path="../Filtering.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Filtering.Controllers {

    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;

    export class DateFilterController extends FC.Shared.Controllers.BaseController {

        public inst: FC.Modules.Filtering.Controllers.DateFilterController;
        public $scope: Models.IFilterBarVM;

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
            vm.$scope.Close = this.Close;
            vm.$scope.MtModal = $mdDialog;
            //fetch from localstorage
            
            vm.$scope.CurrentYear = new Date().getFullYear();
            vm.$scope.PrevYear = new Date().getFullYear() - 1;
            vm.$scope.NextYear = new Date().getFullYear() + 1;
            vm.$scope.Month = new Date().getMonth() + 1;
            vm.$scope.Year = new Date().getFullYear().toString();
            vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
            try {
                vm.CacheManager.Get<number>("Filter_Month", function (storage) {
                    vm.$scope.Month = storage.data;
                    
                    vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                });
                vm.CacheManager.Get<number>("Filter_Year", function (storage) {
                    vm.$scope.Year = storage.data.toString();
                    vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                });
            } catch (e) {
                vm.$scope.Year = new Date().getFullYear().toString();
                vm.$scope.Month = new Date().getMonth() + 1;
                vm.$scope.DateString = vm.months[vm.$scope.Month-1].toUpperCase() + " / " + vm.$scope.Year;
            }
            
            vm.$scope.IsLoading = false;
            this.addFilterChangeListener();
            window.addEventListener('ClearFilter', function () {
                vm.$scope.Year = new Date().getFullYear().toString();
                vm.$scope.Month = new Date().getMonth() + 1;
                vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                CacheManager.DeleteStorage("Filter_Year");
                CacheManager.DeleteStorage("Filter_Month");
            });
        }
        private addFilterChangeListener(): void {
            var vm = this;
            window.addEventListener("FilterChanged", function (e: CustomEventInit) {
                if (e) {
                    if (e.detail) {
                        var d = e.detail as FC.Modules.Filtering.Models.FilterBarVM;
                        vm.CacheManager.Get<number>("Filter_Month", function (storage) {
                            vm.$scope.Month = storage.data;
                            vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                        });
                        vm.CacheManager.Get<number>("Filter_Year", function (storage) {
                            vm.$scope.Year = storage.data.toString();
                            vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                        });
                        vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                    }
                }
            });
        }

        private filterByUrl(url: string): void {
            //var vm = this;
            //var urlArr = url.split('/');
            //var year = urlArr[2];
            //var month = urlArr[3];
            //debugger;
            //vm.$scope.Year = year;
            //CacheManager.WriteStorage("Filter_Year", this.$scope.Year, 1000 * 60 * 60 * 24);
            //vm.$scope.Month = parseInt(month);
            //CacheManager.WriteStorage("Filter_Month", this.$scope.Month, 1000 * 60 * 60 * 24);
            //var e = new FilterChangedEvent(vm.$scope);
        }

        public ShowFilter() {

            var vm = this;
            var $scope = vm.$scope;
            var opts: ng.material.MDDialogOptions = {};
            opts.controller = FC.Modules.Filtering.Controllers.DateFilterController;
            opts.controllerAs = 'vm';
            opts.templateUrl = '/Scripts/modules/filtering/views/date-filter.html';
            opts.parent = document.body;
            opts.clickOutsideToClose = true;
            $scope.MtModal.show(opts).then(function (answer) {
                //$scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                // $scope.status = 'You cancelled the dialog.';
            });
        }

        public IsActive(month: number): boolean {
            var vm = this;
            return vm.$scope.Month == month;
        }

        public DoChangeYear(): void {
            CacheManager.WriteStorage("Filter_Year", this.$scope.Year, 1000 * 60 * 60 * 24);
            var e = new FilterChangedEvent(this.$scope);
            this.$scope.MtModal.hide();
        }

        public ToggleMonth(month: number): void {
            if (this.$scope.Month != month) {
                this.$scope.Month = month;
                CacheManager.WriteStorage("Filter_Month", this.$scope.Month, 1000 * 60 * 60 * 24);
                var e = new FilterChangedEvent(this.$scope);
            }
            if (month == -1) {
                month = new Date().getFullYear();
            }
            this.$scope.MtModal.hide();
        }


        public Save(): void {
            var vm = this;
            vm.Close();
            //vm.$scope.IsLoading = true;
        }

        public Close(): void {
            var vm = this;
            vm.$scope.MtModal.hide();
        }

        public Reset(): void {
            var vm = this;
            CacheManager.DeleteStorage("Filter_Month");
            CacheManager.DeleteStorage("Filter_Year");
            vm.Close();
        }

    }
    FilteringModule.GetApplication().RegisterController("FC.Modules.Filtering.Controllers.DateFilterController", FC.Modules.Filtering.Controllers.DateFilterController);
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
