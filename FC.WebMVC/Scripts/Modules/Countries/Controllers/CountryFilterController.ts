///<reference path="../../Core/FC.ts"/>
///<reference path="../Countries.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Countries.Controllers {

    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;

    export class CountryFilterController extends FC.Shared.Controllers.BaseController {

        public inst: FC.Modules.Countries.Controllers.CountryFilterController;
        public ShowTravelInfo = false;
        public Countrieservice: FC.Modules.Countries.Services.CountriesService;
        public ArtistService: FC.Modules.Artists.Services.ArtistService;
        public CalendarService: FC.Modules.Calendar.Services.CalendarService;
        public URLManSvc: FC.Core.Services.URLManagerService;
        public BannerService: FC.Modules.Banners.Services.BannerService;
        public MemReg: FC.Shared.Util.MemReg;
        public Modal: any;
        public _TmpModal: any;
        public $sce;
        public MediaPickerSaveEvent: string;
        public $scope: VM.ICountryFilterVm;
        public vm;

        //public ActiveGenreID: number;
        static $inject = [
            '$http',
            '$q',
            '$mdDialog',
            '$scope',
            '$routeParams',
            '$location',
            "$sce"
        ];

        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $mdDialog,
            $scope,
            $route,
            $routeParams,
            $location,
            $sce
        ) {
            super($http, $q, $scope, $location, $routeParams,$mdDialog);
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
            vm.$scope.Reset = this.Reset;
            vm.$scope.MtModal = $mdDialog;
            vm.$scope.IsLoading = true;
            vm.SetCountryList();
            vm.$scope.IsActive = this.IsActive;
            if (vm.$scope.SelectedCountries == null) {
                vm.$scope.SelectedCountries = new Array<MODELS.UCountry>();
                vm.$scope.Selected = "SELECT COUNTRIES";
            }

            if (vm.$scope.SelectedCountries.length == 1) {
                vm.$scope.Selected = vm.$scope.SelectedCountries.length + " COUNTRY SELECTED";
            } else {
                vm.$scope.Selected = vm.$scope.SelectedCountries.length + " COUNTRIES SELECTED";
            }

            if (vm.$scope.SelectedCountries.length == 0) {
                vm.$scope.Selected = "SELECT COUNTRIES";
            }
            //this.RecoverModel(this.$scope.model, this.$scope);
        }

        public IsActive(country: FC.Shared.Models.UCountry) {
            var vm = this;
            if (CacheManager.Contains("ActiveCountries")) {
                var activated = CacheManager.Get<FC.Shared.Models.UCountry[]>("ActiveCountries").data;
                var isactive = activated.some(function (g, i) {
                    return g.CountryID == country.CountryID;
                });
                return isactive;
            } else {
                return false;
            }
        }

        public ToggleCountry($scope: VM.ICountryFilterVm, country: MODELS.UCountry): void {
            var vm = this;
            if (!this.IsActive(country)) {
                vm.$scope.SelectedCountries.push(country);

                CacheManager.WriteStorage("ActiveCountries", vm.$scope.SelectedCountries, 1000*60*60*5);
            } else {
                var tmp = new Array<MODELS.UCountry>();
                
                vm.$scope.SelectedCountries.forEach(function (v, i) {
                    if (v.CountryID != country.CountryID) {
                        tmp.push(v);
                    }
                });
                vm.$scope.SelectedCountries = tmp;

                CacheManager.WriteStorage("ActiveCountries", vm.$scope.SelectedCountries, 1000 * 60 * 60 * 5);
            }
            if (vm.$scope.SelectedCountries.length == 1) {
                vm.$scope.Selected = vm.$scope.SelectedCountries.length + " COUNTRY SELECTED";
            } else {
                vm.$scope.Selected = vm.$scope.SelectedCountries.length + " COUNTRIES SELECTED";
            }
            vm.$scope.model.Countries = vm.$scope.SelectedCountries;
            vm.Save(vm.$scope);
        }

        public SetCountryList(): void {
            var vm = this;
            vm.CountriesSvc.GetAll().then(function (r: INT.IServiceResponse<MODELS.UCountry[]>) {
                vm.$scope.SysCountries = r.Data;
                vm.$scope.IsLoading = false;
            });
        }

        public Save($scope: VM.ICountryFilterVm): void {
            var vm = this;
            vm.$scope.MtModal.cancel();
            var e = new FC.Modules.Filtering.FilterChangedEvent(this.$scope.model);
            //vm.$scope.IsLoading = true;
        }
        

        public Reset($scope: VM.ICountryFilterVm): void {
            CacheManager.DeleteStorage("ActiveCountries");
            $scope.Close();
        }

    }
    CountriesModule.GetApplication().RegisterController("FC.Modules.Countries.Controllers.CountryFilterController", FC.Modules.Countries.Controllers.CountryFilterController);
}