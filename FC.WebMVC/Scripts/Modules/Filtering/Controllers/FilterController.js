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
                var CM = FC.Core.CoreModel;
                var FilterController = (function (_super) {
                    __extends(FilterController, _super);
                    function FilterController($http, $q, $scope, $route, $routeParams, $location, $mdDialog) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.months = ["January", "February", "April", "March", "May", "June", "July", "August", "September", "October", "November", "December"];
                        var vm = this;
                        this.$scope = $scope;
                        this.$scope.Controller = this;
                        this.Modal = $mdDialog;
                        this.CacheManager = FC.Shared.Util.CacheManager.GetInstance();
                        this.$scope.ActiveGenres = new CM.Dictionary();
                        vm.$scope.IsGenresLoading = true;
                        if (vm.CacheManager.Contains("sys-genres")) {
                            vm.CacheManager.GetStorage("sys-genres", function (response) {
                                vm.$scope.SysGenres = response.data;
                                vm.$scope.IsGenresLoading = false;
                            });
                        }
                        this.$scope.IsActive = this.IsActive;
                        vm.$scope.ToggleState = this.ToggleState;
                    }
                    FilterController.prototype.IsActive = function (genre, scope) {
                        if (scope) {
                            if (scope.ActiveGenres == null) {
                                scope.ActiveGenres = new FC.Core.CoreModel.Dictionary();
                            }
                            if (scope.ActiveGenres.data.length == 0) {
                                if (scope.Controller.CacheManager.Contains('ActiveGenres')) {
                                    scope.Controller.CacheManager.GetStorage('ActiveGenres', function (response) {
                                        scope.ActiveGenres.data = response.data.data;
                                    });
                                }
                            }
                        }
                        return scope.ActiveGenres.ContainsKey(genre.GenreID);
                    };
                    FilterController.prototype.ToggleState = function (genre, scope) {
                        if (scope.ActiveGenres.ContainsKey(genre.GenreID)) {
                            scope.ActiveGenres.Delete(genre.GenreID);
                        }
                        else {
                            scope.ActiveGenres.Add(genre.GenreID, genre);
                        }
                        scope.Controller.CacheManager.WriteStorage('ActiveGenres', scope.ActiveGenres);
                    };
                    FilterController.prototype.OpenModal = function (size) {
                        var modalInstance = this.Modal.open({
                            animation: this.$scope.animationsEnabled,
                            templateUrl: '/Scripts/Modules/Filtering/Views/genre-modal.html',
                            controller: 'FC.Modules.Menu.Controllers.MenuController',
                            controllerAs: 'vm',
                            size: 'fullsize',
                            resolve: {
                                items: function () {
                                    return null;
                                }
                            }
                        });
                    };
                    FilterController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog'
                    ];
                    return FilterController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.FilterController = FilterController;
                FilteringModule.GetApplication().RegisterController("FC.Modules.Filtering.Controllers.FilterController", FC.Modules.Filtering.Controllers.FilterController);
            })(Controllers = Filtering.Controllers || (Filtering.Controllers = {}));
        })(Filtering = Modules.Filtering || (Modules.Filtering = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=FilterController.js.map