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

    export class CountryFilterController extends FC.Shared.Controllers.BaseController {

        public inst: FC.Modules.Filtering.Controllers.CountryFilterController;
        public $scope: Models.ICountryFilterVM;

        //public ActiveCountryID: number;
        static $inject = [
            '$http',
            '$q',
            '$mdDialog',
            '$scope',
            '$location',
            "$sce",
        ];

        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $mdDialog: angular.material.MDDialogService,
            $scope,
            $location,
            $sce
        ) {

            super($http, $q, $scope, $location,  $mdDialog);
            var vm = this;
            vm.CalendarService = new FC.Modules.Calendar.Services.CalendarService($http, $q);
            vm.$scope.inst = vm;
            
            vm.$scope.$location = $location;
            vm.$scope = $scope;
            vm.$scope.FormID = '908ADBE0-5121-4857-9D3A-E829DCCE9D80';
            vm.$scope.MemReg = FC.Shared.Util.MemReg.GetInstance();
            vm.$scope.Save = this.Save;
            vm.$scope.Close = this.Close;
            vm.$scope.Reset = this.Reset;
            vm.$scope.MtModal = $mdDialog;
            vm.$scope.SelectedCountries = new Array<MODELS.UCountry>();
            var userID = CacheManager.GetCookieValue("UserID");
            if (CacheManager.Contains("ActiveCountries")) {
                vm.$scope.inst.$scope.SelectedCountries = CacheManager.Get<Array<MODELS.UCountry>>("ActiveCountries").data;
            }

            if (userID) {
                vm.FavoriteService.GetUserFavorites(userID, Shared.Enum.InternalContentType.Country).then(function (r) {
                    r.Data.forEach(function (v, k) {
                        if (v.Content) {
                            var any = vm.$scope.SelectedCountries.some(function (country, k) {
                                return country.CountryID == v.ContentID
                            });
                            if (any == false) {
                                vm.$scope.SelectedCountries.push(v.Content as MODELS.UCountry);
                            }
                        }
                    });
                    CacheManager.WriteStorage("ActiveGenres", vm.$scope.SelectedCountries, 9999999999);
                });
            }
            vm.$scope.IsActive = this.IsActive;
            if (vm.$scope.SelectedCountries.length == 1) {
                vm.$scope.Selected = vm.$scope.SelectedCountries.length + " COUNTRY SELECTED";
            } else {
                vm.$scope.Selected = vm.$scope.SelectedCountries.length + " COUNTRIES SELECTED";
            }

            if (vm.$scope.SelectedCountries.length == 0) {
                vm.$scope.Selected = "SELECT COUNTRY";
            }
            //this.RecoverModel(this.$scope.model, this.$scope);
            vm.$scope.IsLoading = false;

            vm.$scope.model = new FC.Modules.Filtering.Models.FilterBarVM();
            vm.addFilterChangeListener();
            window.addEventListener('ClearFilter', function () {
                vm.$scope.Selected = "SELECT COUNTRIES";
                vm.$scope.SelectedCountries = new Array<FC.Shared.Models.UCountry>();
                CacheManager.DeleteStorage('ActiveGenres');
            });
        }

        private addFilterChangeListener(): void {
            var vm = this;
            window.addEventListener("FilterChanged", function (e: CustomEventInit) {
                if (e) {
                    if (e.detail) {
                        var d = e.detail as FC.Modules.Filtering.Models.FilterBarVM;
                        if (d.Countries) {
                            if (vm.$scope.SelectedCountries.length == 1) {
                                vm.$scope.Selected = vm.$scope.SelectedCountries.length + " COUNTRY SELECTED";
                            } else {
                                vm.$scope.Selected = vm.$scope.SelectedCountries.length + " COUNTRIES SELECTED";
                            }
                            if (vm.$scope.SelectedCountries.length == 0) {
                                vm.$scope.Selected = "SELECT COUNTRY";
                            } 
                            vm.$scope.SelectedCountries = d.Countries;
                        }
                    }
                }
            });
        }

        public ShowFilter() {

            var vm = this;
            var $scope = vm.$scope;
            var opts: ng.material.MDDialogOptions = {};
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
        }

        public IsActive(country: FC.Shared.Models.UCountry): boolean {
            var vm = this;
            if (CacheManager.Contains("ActiveCountries")) {
                var activated = CacheManager.Get<FC.Shared.Models.UCountry[]>("ActiveCountries").data;
                var isactive = activated.some(function (g, i) {
                    return g.CountryID == country.CountryID;
                });
                return isactive;
            } else {

            }
        }

        public ToggleCountry(country: MODELS.UCountry): void {
            var vm = this;
            if (!this.IsActive(country)) {
                vm.$scope.SelectedCountries.push(country);
                CacheManager.WriteStorage("ActiveCountries", vm.$scope.SelectedCountries, 999999999999999);
            } else {
                var tmp = new Array<MODELS.UCountry>();
                vm.$scope.SelectedCountries.forEach(function (v, i) {
                    if (v.CountryID != country.CountryID) {
                        tmp.push(v);
                    }
                });
                vm.$scope.SelectedCountries = tmp;
                vm.$scope.Selected = tmp.length + " SELECTED";

                CacheManager.WriteStorage("ActiveCountries", vm.$scope.SelectedCountries, 999999999999999);
            }
            if (vm.$scope.SelectedCountries.length == 1) {
                vm.$scope.Selected = vm.$scope.SelectedCountries.length + " COUNTRY SELECTED";
            } else {
                vm.$scope.Selected = vm.$scope.SelectedCountries.length + " COUNTRIES SELECTED";
            }

            if (vm.$scope.SelectedCountries.length == 0) {
                vm.$scope.Selected = "SELECT COUNTRIES";
            }
            vm.$scope.model.Countries = vm.$scope.SelectedCountries;
            vm.Save();
        }

        public SetCountryList(): void {
            var vm = this;
            vm.CountriesSvc.GetAll().then(function (r: INT.IServiceResponse<MODELS.UCountry[]>) {
                vm.$scope.SysCountries = r.Data;
            });
        }

        public Save(): void {
            var vm = this;
            //vm.$scope.Selected = vm.$scope.SelectedCountries.length + " SELECTED";
            vm.Close();
            var e = new FC.Modules.Filtering.FilterChangedEvent(this.$scope.model);
            //vm.$scope.IsLoading = true;
        }

        public Close(): void {
            this.$scope.MtModal.hide();
        }

        public Reset(): void {
            CacheManager.DeleteStorage("ActiveCountries");
        }

    }
    FilteringModule.GetApplication().RegisterController("FC.Modules.Filtering.Controllers.CountryFilterController", FC.Modules.Filtering.Controllers.CountryFilterController);
}

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
