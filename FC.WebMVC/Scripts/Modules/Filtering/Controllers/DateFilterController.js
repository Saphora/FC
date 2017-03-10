var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../Filtering.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Filtering;
        (function (Filtering) {
            var Controllers;
            (function (Controllers) {
                var DateFilterController = (function (_super) {
                    __extends(DateFilterController, _super);
                    function DateFilterController($http, $q, $mdDialog, $scope, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
                            vm.CacheManager.Get("Filter_Month", function (storage) {
                                vm.$scope.Month = storage.data;
                                vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                            });
                            vm.CacheManager.Get("Filter_Year", function (storage) {
                                vm.$scope.Year = storage.data.toString();
                                vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                            });
                        }
                        catch (e) {
                            vm.$scope.Year = new Date().getFullYear().toString();
                            vm.$scope.Month = new Date().getMonth() + 1;
                            vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
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
                    DateFilterController.prototype.addFilterChangeListener = function () {
                        var vm = this;
                        window.addEventListener("FilterChanged", function (e) {
                            if (e) {
                                if (e.detail) {
                                    var d = e.detail;
                                    vm.CacheManager.Get("Filter_Month", function (storage) {
                                        vm.$scope.Month = storage.data;
                                        vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                                    });
                                    vm.CacheManager.Get("Filter_Year", function (storage) {
                                        vm.$scope.Year = storage.data.toString();
                                        vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                                    });
                                    vm.$scope.DateString = vm.months[vm.$scope.Month - 1].toUpperCase() + " / " + vm.$scope.Year;
                                }
                            }
                        });
                    };
                    DateFilterController.prototype.filterByUrl = function (url) {
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
                    };
                    DateFilterController.prototype.ShowFilter = function () {
                        var vm = this;
                        var $scope = vm.$scope;
                        var opts = {};
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
                    };
                    DateFilterController.prototype.IsActive = function (month) {
                        var vm = this;
                        return vm.$scope.Month == month;
                    };
                    DateFilterController.prototype.DoChangeYear = function () {
                        CacheManager.WriteStorage("Filter_Year", this.$scope.Year, 1000 * 60 * 60 * 24);
                        var e = new Filtering.FilterChangedEvent(this.$scope);
                        this.$scope.MtModal.hide();
                    };
                    DateFilterController.prototype.ToggleMonth = function (month) {
                        if (this.$scope.Month != month) {
                            this.$scope.Month = month;
                            CacheManager.WriteStorage("Filter_Month", this.$scope.Month, 1000 * 60 * 60 * 24);
                            var e = new Filtering.FilterChangedEvent(this.$scope);
                        }
                        if (month == -1) {
                            month = new Date().getFullYear();
                        }
                        this.$scope.MtModal.hide();
                    };
                    DateFilterController.prototype.Save = function () {
                        var vm = this;
                        vm.Close();
                        //vm.$scope.IsLoading = true;
                    };
                    DateFilterController.prototype.Close = function () {
                        var vm = this;
                        vm.$scope.MtModal.hide();
                    };
                    DateFilterController.prototype.Reset = function () {
                        var vm = this;
                        CacheManager.DeleteStorage("Filter_Month");
                        CacheManager.DeleteStorage("Filter_Year");
                        vm.Close();
                    };
                    //public ActiveGenreID: number;
                    DateFilterController.$inject = [
                        '$http',
                        '$q',
                        '$mdDialog',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce"
                    ];
                    return DateFilterController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.DateFilterController = DateFilterController;
                FilteringModule.GetApplication().RegisterController("FC.Modules.Filtering.Controllers.DateFilterController", FC.Modules.Filtering.Controllers.DateFilterController);
            })(Controllers = Filtering.Controllers || (Filtering.Controllers = {}));
        })(Filtering = Modules.Filtering || (Modules.Filtering = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
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
//# sourceMappingURL=DateFilterController.js.map