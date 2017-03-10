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
                var CountryModalController = (function (_super) {
                    __extends(CountryModalController, _super);
                    function CountryModalController($http, $q, $scope, $route, $routeParams, $location, $mdDialog) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        this.$scope = $scope;
                        this.$scope.MtModal = $mdDialog;
                        this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                        if (!vm.CacheManager.Contains("sys-countries")) {
                            vm.CountriesSvc.GetAll().then(function (r) {
                                vm.CacheManager.WriteStorage("sys-countries", r.Data, 1000 * 60 * 60 * 2);
                                vm.CountryData = r.Data;
                            });
                        }
                        else {
                            vm.CountryData = vm.CacheManager.GetStorage("sys-countries").data;
                        }
                        this.ActiveCountryIDs = new Array();
                        if (this.CacheManager.Contains("user-countries")) {
                            this.ActiveCountryIDs = this.CacheManager.GetStorage("user-countries").data;
                        }
                        //this.$scope.IsOpen = this.IsOpen;
                        //this.$scope.hasSelectedChildren = function (id, name) {
                        //    var status = false;
                        //    if (this.children) {
                        //        if (this.children[id]) {
                        //            $.each(this.children[id], function (k, child) {
                        //                if (child.open == true) {
                        //                    status = true;
                        //                }
                        //            });
                        //        }
                        //    }
                        //    return status;
                        //};
                        //this.$scope.ToggleItem = this.ToggleItem;
                        this.SetActiveCountriesScope();
                    }
                    CountryModalController.prototype.OpenCountryModal = function (size) {
                        var modalInstance = this.Modal.open({
                            animation: true,
                            templateUrl: '/Scripts/Modules/Filtering/Views/country-modal.html',
                            controller: 'FC.Modules.Filtering.Controllers.CountryModalController',
                            controllerAs: 'vm',
                            size: size,
                            resolve: {
                                items: function () {
                                    return null;
                                }
                            }
                        });
                    };
                    CountryModalController.prototype.SetActiveCountriesScope = function () {
                        var vm = this;
                        var ActiveCountries = new Array();
                        this.CacheManager.GetStorage("user-countries", function (response) {
                            ActiveCountries = new Array();
                            var data = response.data;
                            data.forEach(function (value, index) {
                                vm.CacheManager.GetByValue("sys-countries", "CountryID", value, function (response) {
                                    if (response) {
                                        ActiveCountries.push(response);
                                        vm.$scope.ActiveCountries = ActiveCountries;
                                    }
                                });
                            });
                        });
                        window.addEventListener("user-countries_Writed", function () {
                            ActiveCountries = new Array();
                            vm.CacheManager.GetStorage("user-countries", function (response) {
                                var data = response.data;
                                data.forEach(function (value, index) {
                                    vm.CacheManager.GetByValue("sys-countries", "CountryID", value, function (response) {
                                        if (response) {
                                            ActiveCountries.push(response);
                                            vm.$scope.ActiveCountries = ActiveCountries;
                                        }
                                    });
                                });
                            });
                        });
                    };
                    CountryModalController.prototype.IsOpen = function (id) {
                        if (id) {
                            if (this) {
                                if (this.ActiveCountryIDs.indexOf(id) == -1) {
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            }
                        }
                    };
                    CountryModalController.prototype.ToggleItem = function (id) {
                        var vm = this;
                        if (id) {
                            var cm = this.CacheManager;
                            if (this.ActiveCountryIDs.indexOf(id) == -1) {
                                if (this.ActiveCountryIDs.length < 5) {
                                    this.ActiveCountryIDs.push(id);
                                    if (cm.GetStorage("user-countries").data && cm.GetStorage("user-countries").data.indexOf(id) == -1) {
                                        this.ActiveCountryIDs = cm.StripNullElements(this.ActiveCountryIDs);
                                        cm.WriteStorage("user-countries", this.ActiveCountryIDs, 60000 * 24 * 7 * 52);
                                    }
                                    // vm.$scope.ShowCountryLengthWarning = true;
                                    window.setTimeout(function () {
                                        // vm.$scope.ShowCountryLengthWarning = false;
                                    }, 5000);
                                }
                                else {
                                    //vm.$scope.ShowCountryLengthWarning = true;
                                    window.setTimeout(function () {
                                        // vm.$scope.ShowCountryLengthWarning = false;
                                    }, 5000);
                                }
                            }
                            else {
                                delete this.ActiveCountryIDs[this.ActiveCountryIDs.indexOf(id)];
                                this.ActiveCountryIDs = cm.StripNullElements(this.ActiveCountryIDs);
                                cm.WriteStorage("user-countries", this.ActiveCountryIDs, 60000 * 24 * 7 * 52);
                            }
                        }
                    };
                    CountryModalController.prototype.Reset = function () {
                        var vm = this;
                        this.ActiveCountryIDs = new Array();
                        //this.CacheManager.WriteStorage("user-countries", this.ActiveCountryIDs, 60000 * 24 * 7 * 52);
                    };
                    CountryModalController.prototype.Remember = function () {
                        var vm = this;
                        vm.$scope.$dismiss(vm.Modal);
                    };
                    CountryModalController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog'
                    ];
                    return CountryModalController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.CountryModalController = CountryModalController;
                FilteringModule.GetApplication().RegisterController("FC.Modules.Filtering.Controllers.CountryModalController", FC.Modules.Filtering.Controllers.CountryModalController);
            })(Controllers = Filtering.Controllers || (Filtering.Controllers = {}));
        })(Filtering = Modules.Filtering || (Modules.Filtering = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=CountryModalController.js.map