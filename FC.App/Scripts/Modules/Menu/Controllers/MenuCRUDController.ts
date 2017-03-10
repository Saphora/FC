///<reference path="../../Core/FC.ts"/>
///<reference path="../Menu.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Menu.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    export class MenuCRUDController extends FC.Shared.Controllers.BaseController {
        private _inst: FC.Modules.Menu.Controllers.MenuCRUDController;
        public $scope: Models.IMenuCRUD;
        //public ActiveGenreID: number;
        static $inject = [
            '$http',
            '$q',
            '$scope',
            '$route',
            '$routeParams',
            '$location',
            '$mdDialog',
            "$sce"
        ];

        constructor(
            $http,
            $q,
            $scope,
            $route,
            $routeParams,
            $location,
            $mdDialog,
            $sce: ng.ISCEService
        ) {
            super($http, $q, $scope, $location, $routeParams, $mdDialog);
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
            } else {

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

        public DoSave(action: string, sectionOrItem:string) {
            var vm = this;
            if (sectionOrItem == "section") {
                if (action == "c") {
                    vm.DoSaveCRUD(Shared.Controllers.ActionType.Create, Shared.Controllers.ServiceType.MenuSectionService, vm.$scope).then(function (r) {
                        vm.GoNativeBack();
                    });
                }
                if (action == "e") {
                    vm.DoSaveCRUD(Shared.Controllers.ActionType.Update, Shared.Controllers.ServiceType.MenuSectionService, vm.$scope).then(function (r) {
                        vm.GoNativeBack();
                    });
                }
            }
            if (sectionOrItem == "item") {
                if (action == "c") {
                    vm.DoSaveCRUD(Shared.Controllers.ActionType.Create, Shared.Controllers.ServiceType.MenuItemService, vm.$scope).then(function (r) {
                        vm.GoNativeBack();
                    });
                }
                if (action == "e") {
                    vm.DoSaveCRUD(Shared.Controllers.ActionType.Update, Shared.Controllers.ServiceType.MenuItemService, vm.$scope).then(function (r) {
                        vm.GoNativeBack();
                    });
                }
            }

            vm.FinishForm(vm.$scope);
        }
        
        public setData(): void {
            var vm = this;
            if (vm.$routeParams['menuid']) {

                vm.MenuSectionService.GetByID(vm.$routeParams['menuid']).then(function (r) {
                    vm.$scope.model = r.Data;
                });
            } else {
                vm.$scope.model = new FC.Shared.Models.MenuSection();
            }
        }

    }
    MenuModule.GetApplication().RegisterController("FC.Modules.Menu.Controllers.MenuCRUDController", FC.Modules.Menu.Controllers.MenuCRUDController);
}