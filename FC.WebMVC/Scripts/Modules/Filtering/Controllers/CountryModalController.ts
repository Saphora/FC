///<reference path="../../Core/FC.ts" />
///<reference path="../../Core/Services/URLManagerService.ts" />
///<reference path="../Filtering.ts"/>
///<reference path="../../Calendar/Services/CalendarService.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../../Shared/Util/CacheManager.ts"/>
module FC.Modules.Filtering.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class CountryModalController extends FC.Shared.Controllers.BaseController {
        public CountryData: Array<MODELS.UCountry>;
        public CacheManager: FC.Shared.Util.CacheManager;
        public ActiveMonthName: string;
        public ActiveCountryIDs: Array<string>;
        public GenreData: any;
        public Modal: any;
        public ShowMore: number;
        public $scope: FC.Shared.ViewModels.ICountryModalVm;
        static $inject = [
            '$http',
            '$q',
            '$scope',
            
            '$location',
            '$mdDialog'
        ];
        constructor(
            $http,
            $q,
            $scope,
            
            $location,
            $mdDialog
        ) {
            super($http, $q, $scope, $location,  $mdDialog);
            var vm = this;
            this.$scope = $scope;
            this.$scope.MtModal = $mdDialog;
            this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();

            if (!vm.CacheManager.Contains("sys-countries")) {
                vm.CountriesSvc.GetAll().then(function (r: INT.IServiceResponse<MODELS.UCountry[]>) {
                    vm.CacheManager.WriteStorage("sys-countries", r.Data, 1000 * 60 * 60 * 2);
                    vm.CountryData = r.Data;
                });
            } else {
                vm.CountryData = vm.CacheManager.GetStorage("sys-countries").data;
            }

            this.ActiveCountryIDs = new Array<string>();
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

        public OpenCountryModal(size): void {
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
        }

        public SetActiveCountriesScope() {
            var vm = this;
            var ActiveCountries = new Array<MODELS.UCountry>();
            this.CacheManager.GetStorage("user-countries", function (response) {
                ActiveCountries = new Array<FC.Shared.Models.UCountry>();
                var data = response.data as string[];
                data.forEach(function (value: string, index: number) {
                    vm.CacheManager.GetByValue("sys-countries", "CountryID", value, function (response: MODELS.UCountry) {
                        if (response) {
                            ActiveCountries.push(response);
                            vm.$scope.ActiveCountries = ActiveCountries;
                        }
                    });
                });
            });
            window.addEventListener("user-countries_Writed", function () {
                ActiveCountries = new Array<FC.Shared.Models.UCountry>();
                vm.CacheManager.GetStorage("user-countries", function (response) {
                    var data = response.data as string[];
                    data.forEach(function (value: string, index: number) {
                        vm.CacheManager.GetByValue("sys-countries", "CountryID", value, function (response: MODELS.UCountry) {
                            if (response) {
                                ActiveCountries.push(response);
                                vm.$scope.ActiveCountries = ActiveCountries;
                            }
                        });
                    });
                });
            });
        }

        public IsOpen(id) {
            if (id) {
                if (this) {
                    if (this.ActiveCountryIDs.indexOf(id) == -1) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }

        public ToggleItem(id): void {
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
                    } else {
                        //vm.$scope.ShowCountryLengthWarning = true;
                        window.setTimeout(function () {
                           // vm.$scope.ShowCountryLengthWarning = false;
                        }, 5000);
                    }
                } else {
                    delete this.ActiveCountryIDs[this.ActiveCountryIDs.indexOf(id)];
                    this.ActiveCountryIDs = cm.StripNullElements(this.ActiveCountryIDs);
                    cm.WriteStorage("user-countries", this.ActiveCountryIDs, 60000 * 24 * 7 * 52);
                }
            }
        }

        public Reset() {
            var vm = this;
            this.ActiveCountryIDs = new Array<string>();
            //this.CacheManager.WriteStorage("user-countries", this.ActiveCountryIDs, 60000 * 24 * 7 * 52);
        }


        public Remember(): void {
            var vm = this;
            vm.$scope.$dismiss(vm.Modal);
        }

    }
    FilteringModule.GetApplication().RegisterController("FC.Modules.Filtering.Controllers.CountryModalController", FC.Modules.Filtering.Controllers.CountryModalController);
}