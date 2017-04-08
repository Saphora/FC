var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../Countries.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Countries;
        (function (Countries) {
            var Controllers;
            (function (Controllers) {
                var CountryFilterController = (function (_super) {
                    __extends(CountryFilterController, _super);
                    function CountryFilterController($http, $q, $mdDialog, $scope, $route, $routeParams, $location, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.ShowTravelInfo = false;
                        var vm = this;
                        vm.CalendarService = new FC.Modules.Calendar.Services.CalendarService($http, $q);
                        vm.$scope.inst = vm;
                        vm.$scope.$routeParams = $routeParams;
                        vm.$scope.$location = $location;
                        vm.MemReg = FC.Shared.Util.MemReg.GetInstance();
                        vm.$scope = $scope;
                        vm.$scope.FormID = 'CCFDB150-42F0-4F0E-8CA3-C48069E09CBE';
                        vm.$scope.MemReg = FC.Shared.Util.MemReg.GetInstance();
                        vm.$scope.Save = this.Save;
                        vm.$scope.Close = this.Close;
                        vm.$scope.Reset = this.Reset;
                        vm.$scope.MtModal = $mdDialog;
                        vm.$scope.IsLoading = true;
                        vm.SetCountryList();
                        vm.$scope.IsActive = this.IsActive;
                        //this.RecoverModel(this.$scope.model, this.$scope);
                    }
                    CountryFilterController.prototype.IsActive = function (country) {
                        var vm = this;
                        if (CacheManager.Contains("UserCountries")) {
                            var activated = CacheManager.Get("UserCountries").data;
                            var isactive = activated.some(function (g, i) {
                                return g.CountryID == country.CountryID;
                            });
                            return isactive;
                        }
                        else {
                            return false;
                        }
                    };
                    CountryFilterController.prototype.ToggleCountry = function ($scope, country) {
                        $scope = $scope.inst.$scope;
                        var any = false;
                        var modified = false;
                        debugger;
                        any = $scope.SelectedCountries.some(function (v, i) {
                            if (v.CountryID == country.CountryID) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        });
                        if (any == false) {
                            $scope.SelectedCountries.push(country);
                            modified = true;
                        }
                        else {
                            var index = $scope.SelectedCountries.indexOf(country);
                            if (index > -1) {
                                delete $scope.SelectedCountries[index];
                                $scope.SelectedCountries = $scope.RepairArray($scope.SelectedCountries);
                                modified = true;
                            }
                        }
                        if (modified) {
                            CacheManager.WriteStorage("UserCountries", $scope.SelectedCountries, 999999999999999);
                            modified = false;
                        }
                    };
                    CountryFilterController.prototype.SetCountryList = function () {
                        var vm = this;
                        vm.CountriesSvc.GetAll().then(function (r) {
                            vm.$scope.SysCountries = r.Data;
                            vm.$scope.IsLoading = false;
                        });
                    };
                    CountryFilterController.prototype.Save = function ($scope) {
                        var vm = this;
                        vm.Close($scope);
                        //vm.$scope.IsLoading = true;
                    };
                    CountryFilterController.prototype.Close = function ($scope) {
                        $("#CountryFilterControl").removeClass('ctx-visible').addClass('ctx-hidden');
                        $("#MainOverlay").removeClass('ctx-visible').addClass('ctx-hidden');
                    };
                    CountryFilterController.prototype.Reset = function ($scope) {
                        CacheManager.DeleteStorage("UserCountries");
                        $scope.Close();
                    };
                    //public ActiveGenreID: number;
                    CountryFilterController.$inject = [
                        '$http',
                        '$q',
                        '$mdDialog',
                        '$scope',
                        '$routeParams',
                        '$location',
                        "$sce"
                    ];
                    return CountryFilterController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.CountryFilterController = CountryFilterController;
                CountriesModule.GetApplication().RegisterController("FC.Modules.Countries.Controllers.CountryFilterController", FC.Modules.Countries.Controllers.CountryFilterController);
            })(Controllers = Countries.Controllers || (Countries.Controllers = {}));
        })(Countries = Modules.Countries || (Modules.Countries = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=CountryFilterController.js.map