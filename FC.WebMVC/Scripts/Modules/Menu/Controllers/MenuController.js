var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
///<reference path="../../Core/FC.ts" />
///<reference path="../Menu.ts"/>
///<reference path="../../Genres/Services/GenreService.ts" />
///<reference path="../../../Shared/interfaces/IUGenre.ts"/>
///<reference path="../../../Shared/Util/CacheManager.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Menu;
        (function (Menu) {
            var Controllers;
            (function (Controllers) {
                var MenuController = (function (_super) {
                    __extends(MenuController, _super);
                    function MenuController($http, $q, $scope, $route, $routeParams, $location, $mdDialog) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
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
                            var g = CacheManager.Get("ActiveGenres").data;
                            this.$scope.GenreCount = g.length;
                        }
                        if (CacheManager.Contains("UserCountries")) {
                            var c = CacheManager.Get("UserCountries").data;
                            vm.$scope.CountryCount = c.length;
                        }
                        window.addEventListener("ActiveGenres_Writed", function () {
                            if (CacheManager.Contains("ActiveGenres")) {
                                var g = CacheManager.Get("ActiveGenres").data;
                                vm.$scope.GenreCount = g.length;
                            }
                        });
                        window.addEventListener("ActiveGenres_Deleted", function () {
                            vm.$scope.GenreCount = 0;
                        });
                        window.addEventListener("UserCountries_Writed", function () {
                            if (CacheManager.Contains("UserCountries")) {
                                var c = CacheManager.Get("UserCountries").data;
                                vm.$scope.CountryCount = c.length;
                            }
                        });
                        window.addEventListener("UserCountries_Deleted", function () {
                            vm.$scope.CountryCount = 0;
                        });
                        window.addEventListener("AUTH_SUCCESS", function () {
                            vm.$scope.MtModal.hide();
                        });
                        vm.$scope.IsLoading = true;
                        window.addEventListener("FCDataLoadingComplete", function () {
                            vm.$scope.IsLoading = false;
                        });
                    }
                    MenuController.prototype.OpenLoginModal = function ($scope) {
                        $("#MenuMobile").removeClass('ctx-visible').addClass('ctx-hidden');
                        $("#GenreFilterControl").removeClass('ctx-visible').addClass('ctx-hidden');
                        $("#CountryFilterControl").removeClass('ctx-visible').addClass('ctx-hidden');
                        $("#MainOverlay").removeClass('ctx-visible').addClass('ctx-hidden');
                        var opts = {};
                        opts.controller = FC.Modules.Auth.Controllers.AuthController;
                        opts.templateUrl = '/Scripts/modules/auth/views/login.html';
                        opts.parent = document.body;
                        opts.clickOutsideToClose = true;
                        $scope.MtModal.show(opts).then(function (answer) {
                            //$scope.status = 'You said the information was "' + answer + '".';
                        }, function () {
                            // $scope.status = 'You cancelled the dialog.';
                        });
                    };
                    MenuController.prototype.OpenMyProfileModal = function ($scope) {
                        $("#MenuMobile").removeClass('ctx-visible').addClass('ctx-hidden');
                        $("#GenreFilterControl").removeClass('ctx-visible').addClass('ctx-hidden');
                        $("#CountryFilterControl").removeClass('ctx-visible').addClass('ctx-hidden');
                        $("#MainOverlay").removeClass('ctx-visible').addClass('ctx-hidden');
                        var opts = {};
                        opts.controller = FC.Modules.Details.Controllers.FestivalDetailDialogController;
                        opts.templateUrl = '/Scripts/modules/details/views/dialogs/profile/myprofile.html';
                        opts.parent = document.body;
                        opts.clickOutsideToClose = true;
                        $scope.MtModal.show(opts).then(function (answer) {
                            //$scope.status = 'You said the information was "' + answer + '".';
                        }, function () {
                            // $scope.status = 'You cancelled the dialog.';
                        });
                    };
                    MenuController.prototype.ToggleGenreFilter = function ($scope) {
                        $("#MenuMobile").removeClass('ctx-visible').addClass('ctx-hidden');
                        $("#MainOverlay").removeClass('ctx-visible').addClass('ctx-hidden');
                        var opts = {};
                        opts.controller = FC.Modules.Genres.Controllers.GenreFilterController;
                        opts.templateUrl = '/Scripts/modules/genres/views/genre-filter.html';
                        opts.parent = document.body;
                        opts.clickOutsideToClose = true;
                        $scope.MtModal.show(opts).then(function (answer) {
                            //$scope.status = 'You said the information was "' + answer + '".';
                        }, function () {
                            // $scope.status = 'You cancelled the dialog.';
                        });
                    };
                    MenuController.prototype.ToggleCountryFilter = function ($scope) {
                        $("#MenuMobile").removeClass('ctx-visible').addClass('ctx-hidden');
                        $("#MainOverlay").removeClass('ctx-visible').addClass('ctx-hidden');
                        var opts = {};
                        opts.controller = FC.Modules.Countries.Controllers.CountryFilterController;
                        opts.templateUrl = '/Scripts/modules/countries/views/country-filter.html';
                        opts.parent = document.body;
                        opts.clickOutsideToClose = true;
                        $scope.MtModal.show(opts).then(function (answer) {
                            //$scope.status = 'You said the information was "' + answer + '".';
                        }, function () {
                            // $scope.status = 'You cancelled the dialog.';
                        });
                    };
                    MenuController.prototype.ToggleMobile = function ($scope) {
                        if ($("#MenuMobile").hasClass('ctx-hidden')) {
                            $("#MenuMobile").removeClass('ctx-hidden').addClass('ctx-visible');
                            $("#MainOverlay").removeClass('ctx-hidden').addClass('ctx-visible');
                        }
                        else {
                            $("#MenuMobile").removeClass('ctx-visible').addClass('ctx-hidden');
                            $("#MainOverlay").removeClass('ctx-visible').addClass('ctx-hidden');
                        }
                    };
                    MenuController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog'
                    ];
                    return MenuController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.MenuController = MenuController;
                MenuModule.GetApplication().RegisterController("FC.Modules.Menu.Controllers.MenuController", FC.Modules.Menu.Controllers.MenuController);
            })(Controllers = Menu.Controllers || (Menu.Controllers = {}));
        })(Menu = Modules.Menu || (Modules.Menu = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=MenuController.js.map