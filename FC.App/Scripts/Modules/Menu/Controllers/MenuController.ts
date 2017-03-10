///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../Core/FC.ts" />
///<reference path="../Menu.ts"/>
///<reference path="../../Genres/Services/GenreService.ts" />
///<reference path="../../../Shared/interfaces/IUGenre.ts"/>
///<reference path="../../../Shared/Util/CacheManager.ts"/>
module FC.Modules.Menu.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export class MenuController extends FC.Shared.Controllers.BaseController {

        static $inject = [
            '$http',
            '$q',
            '$scope',
            '$route',
            '$routeParams',
            '$location',
            '$mdDialog'
        ];
        public CacheManager: FC.Shared.Util.CacheManager;
        public $scope: FC.Shared.ViewModels.IMenuVM;
        constructor(
            $http,
            $q,
            $scope,
            $route,
            $routeParams,
            $location,
            $mdDialog: angular.material.MDDialogService
        ) {
            super($http, $q, $scope, $location, $routeParams,$mdDialog);
            this.$scope = $scope;
            var vm = this;
            this.$scope.inst = this;
            this.$scope.ToggleMobile = this.ToggleMobile;
            this.$scope.ToggleGenreFilter = this.ToggleGenreFilter;
            this.$scope.ToggleCountryFilter = this.ToggleCountryFilter;
            this.$scope.MtModal = $mdDialog;
            this.$scope.OpenLoginModal = this.OpenLoginModal;
            this.$scope.OpenMyProfileModal = this.OpenMyProfileModal;

            $("#MainOverlay").click(function () {
                $("#MenuMobile").removeClass('ctx-visible').addClass('ctx-hidden');
                $("#GenreFilterControl").removeClass('ctx-visible').addClass('ctx-hidden');
                $("#CountryFilterControl").removeClass('ctx-visible').addClass('ctx-hidden');
                $("#MainOverlay").removeClass('ctx-visible').addClass('ctx-hidden');
            });

            if (CacheManager.Contains("ActiveGenres")) {
                var g = CacheManager.Get<FC.Shared.Models.UGenre[]>("ActiveGenres").data;
                this.$scope.GenreCount = g.length;
            }
            if (CacheManager.Contains("UserCountries")) {
                var c = CacheManager.Get<FC.Shared.Models.UCountry[]>("UserCountries").data;
                vm.$scope.CountryCount = c.length;
            }
            window.addEventListener("ActiveGenres_Writed", function () {
                if (CacheManager.Contains("ActiveGenres")) {
                    var g = CacheManager.Get<FC.Shared.Models.UGenre[]>("ActiveGenres").data;
                    vm.$scope.GenreCount = g.length;
                }
            });

            window.addEventListener("ActiveGenres_Deleted", function () {
                vm.$scope.GenreCount = 0;

            });

            window.addEventListener("UserCountries_Writed", function () {
                if (CacheManager.Contains("UserCountries")) {
                    var c = CacheManager.Get<FC.Shared.Models.UCountry[]>("UserCountries").data;
                    vm.$scope.CountryCount = c.length;
                }
            });

            window.addEventListener("UserCountries_Deleted", function () {
                vm.$scope.CountryCount = 0;
            });
            window.addEventListener("AUTH_SUCCESS", function () {
                $scope.MtModal.hide();
            });
        }
        

        public OpenLoginModal($scope: VM.IMenuVM): void {
            $("#MenuMobile").removeClass('ctx-visible').addClass('ctx-hidden');
            $("#GenreFilterControl").removeClass('ctx-visible').addClass('ctx-hidden');
            $("#CountryFilterControl").removeClass('ctx-visible').addClass('ctx-hidden');
            $("#MainOverlay").removeClass('ctx-visible').addClass('ctx-hidden');
            var opts: ng.material.MDDialogOptions = {};
            opts.controller = FC.Modules.Auth.Controllers.AuthController;
            opts.templateUrl = '/Scripts/modules/auth/views/login.html';
            opts.parent = document.body;
            opts.clickOutsideToClose = true;
            $scope.MtModal.show(opts).then(function (answer) {
                //$scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                // $scope.status = 'You cancelled the dialog.';
            });
        }

        public OpenMyProfileModal($scope: VM.IMenuVM): void {
            $("#MenuMobile").removeClass('ctx-visible').addClass('ctx-hidden');
            $("#GenreFilterControl").removeClass('ctx-visible').addClass('ctx-hidden');
            $("#CountryFilterControl").removeClass('ctx-visible').addClass('ctx-hidden');
            $("#MainOverlay").removeClass('ctx-visible').addClass('ctx-hidden');
            var opts: ng.material.MDDialogOptions = {};
            opts.controller = FC.Modules.Details.Controllers.FestivalDetailDialogController;
            opts.templateUrl = '/Scripts/modules/details/views/dialogs/profile/myprofile.html';
            opts.parent = document.body;
            opts.clickOutsideToClose = true;
            $scope.MtModal.show(opts).then(function (answer) {
                //$scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                // $scope.status = 'You cancelled the dialog.';
            });
        }
        public ToggleGenreFilter($scope: VM.IMenuVM): void {
            $("#MenuMobile").removeClass('ctx-visible').addClass('ctx-hidden');
            $("#MainOverlay").removeClass('ctx-visible').addClass('ctx-hidden');
            var opts: ng.material.MDDialogOptions = {};
            opts.controller = FC.Modules.Genres.Controllers.GenreFilterController;
            opts.templateUrl = '/Scripts/modules/genres/views/genre-filter.html';
            opts.parent = document.body;
            opts.clickOutsideToClose = true;
            $scope.MtModal.show(opts).then(function (answer) {
                //$scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                // $scope.status = 'You cancelled the dialog.';
            });
        }

        public ToggleCountryFilter($scope: VM.IMenuVM): void {
            $("#MenuMobile").removeClass('ctx-visible').addClass('ctx-hidden');
            $("#MainOverlay").removeClass('ctx-visible').addClass('ctx-hidden');
            var opts: ng.material.MDDialogOptions = {};
            opts.controller = FC.Modules.Countries.Controllers.CountryFilterController;
            opts.templateUrl = '/Scripts/modules/countries/views/country-filter.html';
            opts.parent = document.body;
            opts.clickOutsideToClose = true;
            $scope.MtModal.show(opts).then(function (answer) {
                //$scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                // $scope.status = 'You cancelled the dialog.';
            });
        }

        public ToggleMobile($scope: VM.IMenuVM) {
            if ($("#MenuMobile").hasClass('ctx-hidden')) {
                $("#MenuMobile").removeClass('ctx-hidden').addClass('ctx-visible');
                $("#MainOverlay").removeClass('ctx-hidden').addClass('ctx-visible');
            } else {
                $("#MenuMobile").removeClass('ctx-visible').addClass('ctx-hidden');
                $("#MainOverlay").removeClass('ctx-visible').addClass('ctx-hidden');
            }
        }
    }
    MenuModule.GetApplication().RegisterController("FC.Modules.Menu.Controllers.MenuController", FC.Modules.Menu.Controllers.MenuController);
}