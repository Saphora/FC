var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../Menu.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Menu;
        (function (Menu) {
            var Controllers;
            (function (Controllers) {
                var MenuCRUDController = (function (_super) {
                    __extends(MenuCRUDController, _super);
                    function MenuCRUDController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, $sce) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                        this.setData();
                        var vm = this;
                        vm.$scope = $scope;
                        vm.$scope.$sce = $sce;
                        vm.$scope.$location = $location;
                        vm.$scope.MtModal = $mdDialog;
                        vm.$scope.FormID = '150F44C7-CD67-49D3-B1C5-4C8BE7157F96';
                        vm.$scope.IsCreating = true;
                        vm.RecoverModel(vm.$scope.model, $scope);
                        vm.$scope.model = vm.$scope.RecoverModel(vm.$scope.model, vm.$scope);
                        if (vm.$scope.model == null) {
                            vm.$scope.model = new FC.Shared.Models.MenuSection();
                        }
                        if (vm.$routeParams['menuitemid'] != null || vm.$routeParams['menusectionid'] != null) {
                            vm.$scope.IsEditing = true;
                            vm.$scope.IsCreating = false;
                            if (vm.$routeParams['menuitemid'] != null) {
                                vm.MenuItemService.GetByID(vm.$routeParams['menuitemid']).then(function (r) {
                                    vm.$scope.MenuItemModel = r.Data;
                                    vm.$scope.model = vm.$scope.MenuItemModel;
                                });
                            }
                            if (vm.$routeParams['menusectionid']) {
                                vm.MenuSectionService.GetByID(vm.$routeParams['menusectionid']).then(function (r) {
                                    vm.$scope.MenuSectionModel = r.Data;
                                    vm.$scope.model = vm.$scope.MenuSectionModel;
                                });
                            }
                        }
                        else {
                            vm.$scope.IsCreating = true;
                            vm.$scope.IsEditing = false;
                        }
                        vm.MenuSectionService.GetAll().then(function (r) {
                            vm.$scope.MenuSections = r.Data;
                        });
                        vm.MenuItemService.GetAll().then(function (r) {
                            vm.$scope.MenuItems = r.Data;
                        });
                    }
                    MenuCRUDController.prototype.DoSave = function (action, sectionOrItem) {
                        var vm = this;
                        if (sectionOrItem == "section") {
                            if (action == "c") {
                                vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Create, FC.Shared.Controllers.ServiceType.MenuSectionService, vm.$scope).then(function (r) {
                                    vm.GoNativeBack();
                                });
                            }
                            if (action == "e") {
                                vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.MenuSectionService, vm.$scope).then(function (r) {
                                    vm.GoNativeBack();
                                });
                            }
                        }
                        if (sectionOrItem == "item") {
                            if (action == "c") {
                                vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Create, FC.Shared.Controllers.ServiceType.MenuItemService, vm.$scope).then(function (r) {
                                    vm.GoNativeBack();
                                });
                            }
                            if (action == "e") {
                                vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.MenuItemService, vm.$scope).then(function (r) {
                                    vm.GoNativeBack();
                                });
                            }
                        }
                        vm.FinishForm(vm.$scope);
                    };
                    MenuCRUDController.prototype.setData = function () {
                        var vm = this;
                        if (vm.$routeParams['menuid']) {
                            vm.MenuSectionService.GetByID(vm.$routeParams['menuid']).then(function (r) {
                                vm.$scope.model = r.Data;
                            });
                        }
                        else {
                            vm.$scope.model = new FC.Shared.Models.MenuSection();
                        }
                    };
                    //public ActiveGenreID: number;
                    MenuCRUDController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        "$sce"
                    ];
                    return MenuCRUDController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.MenuCRUDController = MenuCRUDController;
                MenuModule.GetApplication().RegisterController("FC.Modules.Menu.Controllers.MenuCRUDController", FC.Modules.Menu.Controllers.MenuCRUDController);
            })(Controllers = Menu.Controllers || (Menu.Controllers = {}));
        })(Menu = Modules.Menu || (Modules.Menu = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=MenuCRUDController.js.map