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
                var MenuOverviewController = (function (_super) {
                    __extends(MenuOverviewController, _super);
                    function MenuOverviewController($http, $q, $scope, $route, $routeParams, $location, $mdDialog, $sce, MenuSectionService, MenuItemService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        this.$scope = $scope;
                        this.$scope.$routeParams = $routeParams;
                        //this.$scope.GetCountryName = FestivalModule.GetApplication().GetCountryName;
                        this.$scope.MediaURLRoot = FC.Core.Environment.MediaURLRoot;
                        this.$scope.MtModal = $mdDialog;
                        var vm = this;
                        vm.MenuSectionService = MenuSectionService;
                        vm.MenuItemService = MenuItemService;
                        vm.$scope.IsLoading = true;
                        this.$scope.IsAuthorized = false;
                        this.HasAuth(['Developer', 'Admin']).then(function (r) {
                            if (r == true) {
                                vm.$scope.IsAuthorized = true;
                            }
                            else {
                                vm.$scope.IsAuthorized = false;
                                vm.ShowLoginModal();
                            }
                        });
                        window.addEventListener("REFRESH", function (r) {
                            vm.setMenu();
                        });
                        if (vm.$routeParams['sectionid']) {
                            vm.MenuItemService.GetBySectionID(vm.$routeParams['sectionid']).then(function (r) {
                                vm.$scope.MenuItems = r.Data;
                            });
                        }
                        else {
                            this.setMenu();
                        }
                    }
                    MenuOverviewController.prototype.DoSort = function (sortIndex) {
                        var vm = this;
                        if (sortIndex == "") {
                            sortIndex = "0-9";
                        }
                        if (sortIndex != vm.$scope.MemReg.Get("sortIndex")) {
                            vm.SetPageNum(1);
                        }
                        vm.$scope.MemReg.Register("sortIndex", sortIndex);
                        vm.MenuSectionService.GetSorted(sortIndex, vm.GetPageNum()).then(function (r) {
                            var p = vm.GetPageNum() + 1;
                            vm.$scope.MenuSections = r.Data;
                            vm.MenuSectionService.GetPagedCount(p, sortIndex).then(function (r2) {
                                vm.$scope.IsLoading = false;
                                if (r2.Data > 0) {
                                    vm.$scope.ShowMore = true;
                                    vm.$scope.ShowMoreURL = "/#/Menu?page=" + (p) + "&sortIndex=" + sortIndex;
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/#/Menu?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                                }
                            });
                        });
                    };
                    MenuOverviewController.prototype.setMenu = function () {
                        var vm = this;
                        var p = 1;
                        if (vm.$scope.$routeParams["page"]) {
                            p = parseInt(vm.$scope.$routeParams["page"]);
                        }
                        var sortIndex = "";
                        if (vm.$scope.$routeParams["sortIndex"]) {
                            sortIndex = vm.$scope.$routeParams["sortIndex"];
                        }
                        else {
                            sortIndex = "0-9";
                        }
                        vm.MenuSectionService.GetSorted(sortIndex, p).then(function (r) {
                            vm.$scope.MenuSections = r.Data;
                            var p = vm.GetPageNum() + 1;
                            vm.MenuSectionService.GetPagedCount(p, sortIndex).then(function (r2) {
                                vm.$scope.IsLoading = false;
                                if (r2.Data > 0) {
                                    vm.$scope.ShowMore = true;
                                    vm.$scope.ShowMoreURL = "/#/Menu?page=" + (p) + "&sortIndex=" + sortIndex;
                                }
                                else {
                                    vm.$scope.ShowMore = false;
                                    vm.$scope.ShowMoreURL = "/#/Menu?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                                }
                            });
                        });
                    };
                    MenuOverviewController.prototype.DoDelete = function (section) {
                        var vm = this;
                        vm.$scope.model = section;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.MenuSectionService, vm.$scope);
                    };
                    MenuOverviewController.prototype.DoDeleteMenuItem = function (item) {
                        var vm = this;
                        vm.$scope.model = item;
                        vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.MenuItemService, vm.$scope);
                    };
                    //public ActiveCountryID: number;
                    MenuOverviewController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        '$mdDialog',
                        "$sce",
                        "FC.Modules.Menu.Services.MenuSectionService",
                        "FC.Modules.Menu.Services.MenuItemService"
                    ];
                    return MenuOverviewController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.MenuOverviewController = MenuOverviewController;
                MenuModule.GetApplication().RegisterController("FC.Modules.Menu.Controllers.MenuOverviewController", FC.Modules.Menu.Controllers.MenuOverviewController);
            })(Controllers = Menu.Controllers || (Menu.Controllers = {}));
        })(Menu = Modules.Menu || (Modules.Menu = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=MenuOverviewController.js.map