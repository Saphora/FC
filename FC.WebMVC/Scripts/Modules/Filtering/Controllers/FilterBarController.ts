///<reference path="../../Core/FC.ts" />
///<reference path="../../Core/Services/URLManagerService.ts" />
///<reference path="../Filtering.ts"/>
///<reference path="../../Calendar/Services/CalendarService.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../../Shared/Util/CacheManager.ts"/>
module FC.Modules.Filtering.Controllers {
    export class FilterBarController extends FC.Shared.Controllers.BaseController {

        public months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
        public $scope: Models.IFilterBarVM;
        static $inject = [
            '$http',
            '$q',
            '$scope',
            '$route',
            '$routeParams',
            '$location',
            '$mdDialog',
            '$sce'
        ];

        constructor(
            $http,
            $q,
            $scope,
            $route,
            $routeParams,
            $location,
            $mdDialog,
            $sce:ng.ISCEService
        ) {
            super($http, $q, $scope, $location, $routeParams, $mdDialog)
            var vm = this;
            vm.$scope = $scope;
            vm.$scope.MtModal = $mdDialog;
            vm.$scope.$routeParams = $routeParams
            vm.$scope.$location = $location;
            vm.$scope.$q = $q;
            vm.$scope.$http = $http;
            vm.$scope.$sce = $sce;

            try {
                vm.CacheManager.Get<number>("Filter_Month", function (storage) {
                    vm.$scope.Month = storage.data;
                });
                vm.CacheManager.Get<number>("Filter_Year", function (storage) {
                    vm.$scope.Year = storage.data.toString();
                });
            } catch (e) {
                vm.$scope.Year = new Date().getFullYear().toString();
                vm.$scope.Month = new Date().getMonth();
            }

            if (vm.$scope.Year == null || vm.$scope.Year == undefined || vm.$scope.Year == "-1") {
                vm.$scope.Year = new Date().getFullYear().toString();
            }
            if (vm.$scope.Month == null || vm.$scope.Month == undefined || vm.$scope.Month == -1) {
                vm.$scope.Month = new Date().getMonth();
            }

            this.addFilterChangeListenerDate();
        }


        private addFilterChangeListenerDate(): void {
            var vm = this;
            window.addEventListener("FilterChanged", function (e: CustomEventInit) {
                if (e) {
                    if (e.detail) {
                        var d = e.detail as FC.Modules.Filtering.Models.FilterBarVM;
                        if (d.Month >=0 && d.Year) {
                            vm.$scope.Month = d.Month;
                            vm.$scope.Year = d.Year;
                            if (!d.Year) {
                                vm.$scope.Year = new Date().getFullYear().toString();
                            }
                            vm.$scope.DateString = vm.months[d.Month].toUpperCase() + " / " + d.Year;
                            vm.$scope.FormURL = vm.$scope.$sce.getTrustedResourceUrl("/calendar/" + d.Year + "/" + d.Month + "/");
                        }
                    }
                }
                //form.submit();
            });
        }
    }
    FilteringModule.GetApplication().RegisterController("FC.Modules.Filtering.Controllers.FilterBarController", FC.Modules.Filtering.Controllers.FilterBarController);
}
