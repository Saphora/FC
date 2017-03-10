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
                    function MenuController($http, $q, $scope, $route, $routeParams, $location, $uibModal, ThemingService, LocalizationSvc, GenreService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingService, LocalizationSvc);
                        var vm = this;
                        this.$scope = $scope;
                        this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                        this.$scope.base = this;
                        this.Modal = $uibModal;
                        if (this.CacheManager.Contains("sys-genres")) {
                            this.Genres = this.CacheManager.GetStorage("sys-genres");
                        }
                        this.$scope.oneAtATime = true;
                        this.$scope.status = new Array();
                        this.$scope.children = new Array();
                        this.ActiveGenreIds = new Array();
                        if (this.CacheManager.Contains("user-genres")) {
                            this.ActiveGenreIds = this.CacheManager.GetStorage("user-genres").data;
                        }
                        this.$scope.hasSelectedChildren = function (id, name) {
                            var status = false;
                            if (this.children[id]) {
                                $.each(this.children[id], function (k, child) {
                                    if (child.open == true) {
                                        status = true;
                                    }
                                });
                            }
                            return status;
                        };
                    }
                    MenuController.prototype.Reset = function () {
                        var vm = this;
                        this.ActiveGenreIds = new Array();
                        vm.GenreService.GetAllDefault().then(function (r) {
                            $.each(r.Data, function (key, child) {
                                vm.ActiveGenreIds.push(child.GenreID);
                            });
                        });
                        this.CacheManager.WriteStorage("user-genres", this.ActiveGenreIds, 60000 * 24 * 7 * 52);
                        this.CacheManager.WriteStorage("user-genres", this.ActiveGenreIds, 60000 * 24 * 7 * 52);
                        this.$scope.$dismiss(this.Modal);
                        this.OpenModal(400);
                    };
                    MenuController.prototype.RestoreToDefaults = function () {
                        var vm = this;
                        var doReload = window.confirm("Are you sure? All your settings (fav. countries, fav. genres etc) will be gone!");
                        if (doReload) {
                            vm.CacheManager.DeleteStorage("sys-genres");
                            vm.CacheManager.DeleteStorage("user-genres");
                            vm.CacheManager.DeleteStorage("active-theme");
                            vm.CacheManager.DeleteStorage("sys-countries");
                            vm.CacheManager.DeleteStorage("user-location");
                            vm.CacheManager.DeleteStorage("user-countries");
                            vm.CacheManager.DeleteStorage("sys-months");
                            vm.CacheManager.DeleteStorage("sys-years");
                            window.location.reload();
                        }
                    };
                    MenuController.prototype.OpenModal = function (size) {
                        var modalInstance = this.Modal.open({
                            animation: this.$scope.animationsEnabled,
                            templateUrl: '/Scripts/Modules/Filtering/Views/genre-modal.html',
                            controller: 'FC.Modules.Menu.Controllers.MenuController',
                            controllerAs: 'vm',
                            size: size,
                            resolve: {
                                items: function () {
                                    return null;
                                }
                            }
                        });
                    };
                    MenuController.prototype.Remember = function () {
                        var vm = this;
                        vm.$scope.$dismiss(vm.Modal);
                    };
                    MenuController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$uibModal',
                        'FC.Modules.Theming.Services.ThemingService',
                        "FC.Core.Services.LocalizationService",
                        'FC.Modules.Genres.Services.GenreService'];
                    return MenuController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.MenuController = MenuController;
                MenuModule.GetApplication().RegisterController("FC.Modules.Menu.Controllers.MenuController", FC.Modules.Menu.Controllers.MenuController);
            })(Controllers = Menu.Controllers || (Menu.Controllers = {}));
        })(Menu = Modules.Menu || (Modules.Menu = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
