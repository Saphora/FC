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
                var CountryFilterController = (function (_super) {
                    __extends(CountryFilterController, _super);
                    function CountryFilterController($http, $q, $mdDialog, $scope, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.CalendarService = new FC.Modules.Calendar.Services.CalendarService($http, $q);
                        vm.$scope.inst = vm;
                        vm.$scope.$routeParams = $routeParams;
                        vm.$scope.$location = $location;
                        vm.$scope = $scope;
                        vm.$scope.FormID = '908ADBE0-5121-4857-9D3A-E829DCCE9D80';
                        vm.$scope.MemReg = FC.Shared.Util.MemReg.GetInstance();
                        vm.$scope.Save = this.Save;
                        vm.$scope.Close = this.Close;
                        vm.$scope.Reset = this.Reset;
                        vm.$scope.MtModal = $mdDialog;
                        vm.SetGenreList();
                        if (vm.$scope.MemReg.Get("ActiveCountries")) {
                            vm.$scope.inst.$scope.SelectedCountries = vm.$scope.MemReg.Get("ActiveCountries");
                        }
                        else {
                            vm.$scope.SelectedCountries = new Array();
                            if (CacheManager.Contains("ActiveCountries")) {
                                vm.$scope.inst.$scope.SelectedCountries = CacheManager.Get("ActiveCountries").data;
                            }
                        }
                        vm.$scope.IsActive = this.IsActive;
                        vm.$scope.Selected = "0 SELECTED";
                        if (vm.$scope.SelectedCountries != null) {
                            vm.$scope.Selected = this.$scope.SelectedCountries.length + " SELECTED";
                        }
                        //this.RecoverModel(this.$scope.model, this.$scope);
                        vm.$scope.IsLoading = false;
                        vm.$scope.model = new FC.Modules.Filtering.Models.FilterBarVM();
                        vm.addFilterChangeListener();
                        window.addEventListener('ClearFilter', function () {
                            vm.$scope.Selected = "0 SELECTED";
                            vm.$scope.SelectedCountries = new Array();
                            CacheManager.DeleteStorage('ActiveGenres');
                        });
                    }
                    CountryFilterController.prototype.addFilterChangeListener = function () {
                        var vm = this;
                        window.addEventListener("FilterChanged", function (e) {
                            if (e) {
                                if (e.detail) {
                                    var d = e.detail;
                                    if (d.Countries) {
                                        vm.$scope.Selected = d.Countries.length + " SELECTED";
                                        vm.$scope.SelectedCountries = d.Countries;
                                    }
                                }
                            }
                        });
                    };
                    CountryFilterController.prototype.ShowFilter = function () {
                        var vm = this;
                        var $scope = vm.$scope;
                        var opts = {};
                        opts.controller = FC.Modules.Filtering.Controllers.CountryFilterController;
                        opts.controllerAs = 'vm';
                        opts.templateUrl = '/Scripts/modules/filtering/views/country-filter.html';
                        opts.parent = document.body;
                        opts.clickOutsideToClose = true;
                        $scope.MtModal.show(opts).then(function (answer) {
                            //$scope.status = 'You said the information was "' + answer + '".';
                        }, function () {
                            // $scope.status = 'You cancelled the dialog.';
                        });
                    };
                    CountryFilterController.prototype.IsActive = function (country) {
                        var vm = this;
                        if (CacheManager.Contains("ActiveCountries")) {
                            var activated = CacheManager.Get("ActiveCountries").data;
                            var isactive = activated.some(function (g, i) {
                                return g.CountryID == country.CountryID;
                            });
                            return isactive;
                        }
                        else {
                            return false;
                        }
                    };
                    CountryFilterController.prototype.ToggleCountry = function (country) {
                        var vm = this;
                        if (!this.IsActive(country)) {
                            vm.$scope.SelectedCountries.push(country);
                            CacheManager.WriteStorage("ActiveCountries", vm.$scope.SelectedCountries, 999999999999999);
                        }
                        else {
                            var tmp = new Array();
                            vm.$scope.SelectedCountries.forEach(function (v, i) {
                                if (v.CountryID != country.CountryID) {
                                    tmp.push(v);
                                }
                            });
                            vm.$scope.SelectedCountries = tmp;
                            vm.$scope.Selected = tmp.length + " SELECTED";
                            CacheManager.WriteStorage("ActiveCountries", vm.$scope.SelectedCountries, 999999999999999);
                        }
                        vm.$scope.Selected = vm.$scope.SelectedCountries.length + " SELECTED";
                        vm.$scope.model.Countries = vm.$scope.SelectedCountries;
                    };
                    CountryFilterController.prototype.SetGenreList = function () {
                        var vm = this;
                        vm.CountriesSvc.GetAll().then(function (r) {
                            vm.$scope.SysCountries = r.Data;
                        });
                    };
                    CountryFilterController.prototype.Save = function () {
                        var vm = this;
                        //vm.$scope.Selected = vm.$scope.SelectedCountries.length + " SELECTED";
                        vm.Close();
                        var e = new FC.Modules.Filtering.FilterChangedEvent(this.$scope.model);
                        //vm.$scope.IsLoading = true;
                    };
                    CountryFilterController.prototype.Close = function () {
                        this.$scope.MtModal.hide();
                    };
                    CountryFilterController.prototype.Reset = function () {
                        CacheManager.DeleteStorage("ActiveCountries");
                    };
                    //public ActiveCountryID: number;
                    CountryFilterController.$inject = [
                        '$http',
                        '$q',
                        '$mdDialog',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        "$sce",
                    ];
                    return CountryFilterController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.CountryFilterController = CountryFilterController;
                FilteringModule.GetApplication().RegisterController("FC.Modules.Filtering.Controllers.CountryFilterController", FC.Modules.Filtering.Controllers.CountryFilterController);
            })(Controllers = Filtering.Controllers || (Filtering.Controllers = {}));
        })(Filtering = Modules.Filtering || (Modules.Filtering = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//$scope = $scope.inst.$scope;
//var any = false;
//var modified = false;
//any = $scope.SelectedCountries.some(function (v, i) {
//    if (v.CountryID == country.CountryID) {
//        return true;
//    } else {
//        return false;
//    }
//});
//if (any == false) {
//    $scope.SelectedCountries.push(country);
//    CacheManager.WriteStorage("ActiveCountries", $scope.SelectedCountries, 999999999999999);
//    modified = true;
//} else {
//    var index = -1;
//    if ($scope.SelectedCountries.some(function (v, i) {
//        if (v.CountryID == country.CountryID) {
//            return true;
//        } else {
//            index++;
//            return false;
//        }
//    })) {
//        delete $scope.SelectedCountries[index];
//        $scope.SelectedCountries = $scope.RepairArray($scope.SelectedCountries);
//        CacheManager.WriteStorage("ActiveCountries", $scope.SelectedCountries, 999999999999999);
//        modified = false;
//    }
//}
//# sourceMappingURL=CountryFilterController.js.map