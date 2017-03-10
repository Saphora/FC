///<reference path="../../Core/FC.ts"/>
///<reference path="../Menu.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Menu.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    import ENUM = FC.Shared.Enum;

    export class MenuOverviewController extends FC.Shared.Controllers.BaseController {
        private _inst: FC.Modules.Menu.Controllers.MenuOverviewController;
        public $scope: Models.IMenuOverview;
        public MenuSectionService: FC.Modules.Menu.Services.MenuSectionService;
        public MenuItemService: FC.Modules.Menu.Services.MenuItemService;
        //public ActiveCountryID: number;
        static $inject = [
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

        constructor(
            $http,
            $q,
            $scope,
            $route,
            $routeParams,
            $location,
            $mdDialog,
            $sce,
            MenuSectionService: FC.Modules.Menu.Services.MenuSectionService,
            MenuItemService: FC.Modules.Menu.Services.MenuItemService
        ) {
            super($http, $q, $scope, $location, $routeParams, $mdDialog);
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
                if (r==true) {
                    vm.$scope.IsAuthorized = true;
                } else {
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
            } else {
                this.setMenu();
            }
        }


        public DoSort(sortIndex: string) {
            var vm = this;
            if (sortIndex == "") {
                sortIndex = "0-9";
            }
            if (sortIndex != vm.$scope.MemReg.Get<string>("sortIndex")) {
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
                    } else {
                        vm.$scope.ShowMore = false;
                        vm.$scope.ShowMoreURL = "/#/Menu?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                    }
                });
            });
        }

        public setMenu(): void {
            var vm = this;
            var p = 1;
            if (vm.$scope.$routeParams["page"]) {
                p = parseInt(vm.$scope.$routeParams["page"]);
            }
            var sortIndex = "";
            if (vm.$scope.$routeParams["sortIndex"]) {
                sortIndex = vm.$scope.$routeParams["sortIndex"];
            } else {
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
                    } else {
                        vm.$scope.ShowMore = false;
                        vm.$scope.ShowMoreURL = "/#/Menu?page=" + vm.GetPageNum() + "&sortIndex=" + sortIndex;
                    }
                });
            });
        }

        public DoDelete(section: FC.Shared.Models.MenuSection) {
            var vm = this;
            vm.$scope.model = section;
            vm.DoSaveCRUD(Shared.Controllers.ActionType.Delete, Shared.Controllers.ServiceType.MenuSectionService, vm.$scope);
        }
        public DoDeleteMenuItem(item: MODELS.MenuItem) {
            var vm = this;
            vm.$scope.model = item;
            vm.DoSaveCRUD(Shared.Controllers.ActionType.Delete, Shared.Controllers.ServiceType.MenuItemService, vm.$scope);
        }
    }
    MenuModule.GetApplication().RegisterController("FC.Modules.Menu.Controllers.MenuOverviewController", FC.Modules.Menu.Controllers.MenuOverviewController);
}