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
        public GenreService: FC.Modules.Genres.Services.GenreService;
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
            '$route',
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
            vm.$scope.Close = this.Close;
            vm.$scope.Reset = this.Reset;
            vm.$scope.MtModal = $mdDialog;
            vm.$scope.IsLoading = true;
            vm.SetCountryList();
            if (CacheManager.Contains("sys-countries")) {
                vm.$scope.SysCountries = CacheManager.Get<MODELS.UCountry[]>("sys-countries").data;
            }
            vm.$scope.ToggleCountry = this.ToggleCountry
            if (vm.$scope.MemReg.Get("UserCountries")) {
                vm.$scope.inst.$scope.SelectedCountries = vm.$scope.MemReg.Get<Array<MODELS.UCountry>>("UserCountries");
            } else {
                vm.$scope.SelectedCountries = new Array<MODELS.UCountry>();
                if (CacheManager.Contains("UserCountries")) {
                    vm.$scope.inst.$scope.SelectedCountries = CacheManager.Get<Array<MODELS.UCountry>>("UserCountries").data;
                    vm.$scope.IsLoading = false;
                }
            }
            vm.$scope.IsActive = this.IsActive;

            //this.RecoverModel(this.$scope.model, this.$scope);
        }

        public IsActive(country: FC.Shared.Models.UCountry) {
            var vm = this;
            if (CacheManager.Contains("UserCountries")) {
                var activated = CacheManager.Get<FC.Shared.Models.UCountry[]>("UserCountries").data;
                var isactive = activated.some(function (g, i) {
                    return g.CountryID == country.CountryID;
                });
                return isactive;
            } else {
                return false;
            }
        }

        public ToggleCountry($scope: VM.ICountryFilterVm, country: MODELS.UCountry): void {
            $scope = $scope.inst.$scope;
            var any = false;
            var modified = false;
            debugger;
            any = $scope.SelectedCountries.some(function (v, i) {
                if (v.CountryID == country.CountryID) {
                    return true;
                } else {
                    return false;
                }
            });
            if (any == false) {
                $scope.SelectedCountries.push(country);
                modified = true;
            } else {
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
            vm.Close($scope);
            //vm.$scope.IsLoading = true;
        }

        public Close($scope: VM.ICountryFilterVm): void {
            $("#CountryFilterControl").removeClass('ctx-visible').addClass('ctx-hidden');
            $("#MainOverlay").removeClass('ctx-visible').addClass('ctx-hidden');
        }

        public Reset($scope: VM.ICountryFilterVm): void {
            CacheManager.DeleteStorage("UserCountries");
            $scope.Close();
        }

    }
    CountriesModule.GetApplication().RegisterController("FC.Modules.Countries.Controllers.CountryFilterController", FC.Modules.Countries.Controllers.CountryFilterController);
}