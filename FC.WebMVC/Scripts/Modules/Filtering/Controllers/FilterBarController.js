var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts" />
///<reference path="../../Core/Services/URLManagerService.ts" />
///<reference path="../Filtering.ts"/>
///<reference path="../../Calendar/Services/CalendarService.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../../Shared/Util/CacheManager.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Filtering;
        (function (Filtering) {
            var Controllers;
            (function (Controllers) {
                var FilterBarController = (function (_super) {
                    __extends(FilterBarController, _super);
                    function FilterBarController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
                        var vm = this;
                        vm.$scope = $scope;
                        vm.$scope.MtModal = $mdDialog;
                        vm.$scope.$routeParams = $routeParams;
                        vm.$scope.$location = $location;
                        vm.$scope.$q = $q;
                        vm.$scope.$http = $http;
                        vm.$scope.$sce = $sce;
                        try {
                            vm.CacheManager.Get("Filter_Month", function (storage) {
                                vm.$scope.Month = storage.data;
                            });
                            vm.CacheManager.Get("Filter_Year", function (storage) {
                                vm.$scope.Year = storage.data.toString();
                            });
                        }
                        catch (e) {
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
                    FilterBarController.prototype.addFilterChangeListenerDate = function () {
                        var vm = this;
                        window.addEventListener("FilterChanged", function (e) {
                            if (e) {
                                if (e.detail) {
                                    var d = e.detail;
                                    if (d.Month >= 0 && d.Year) {
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
                    };
                    FilterBarController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        '$sce'
                    ];
                    return FilterBarController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.FilterBarController = FilterBarController;
                FilteringModule.GetApplication().RegisterController("FC.Modules.Filtering.Controllers.FilterBarController", FC.Modules.Filtering.Controllers.FilterBarController);
            })(Controllers = Filtering.Controllers || (Filtering.Controllers = {}));
        })(Filtering = Modules.Filtering || (Modules.Filtering = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=FilterBarController.js.map