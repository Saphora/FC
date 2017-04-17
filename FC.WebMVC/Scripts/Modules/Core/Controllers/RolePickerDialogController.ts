///<reference path="../../Core/FC.ts"/>
///<reference path="../FC.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module STD.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export class RolePickerDialogController extends FC.Shared.Controllers.BaseController {

        public inst: STD.Controllers.RolePickerController;
        public $sce;
        public $scope: STD.Models.IRolePickerDialog;
        public value;
        public MtModal: angular.material.MDDialogService;

        static $inject = [
            '$http',
            '$q',
            '$scope',
            '$mdDialog',
            
            '$location',
            "$sce"
        ];

        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $scope: STD.Models.IRolePickerDialog,
            $mdDialog: angular.material.MDDialogService,
            $route: ng.route.IRoute,
            $routeParams: ng.RouteData,
            $location: ng.ILocationService,
            $sce: ng.ISCEService
        ) {
            super($http, $q, $scope, $location,  $mdDialog);
            var vm = this;
            vm.$scope.inst = this;
            vm.$scope = $scope;
            vm.$scope.MtModal = $mdDialog;
            vm.$scope.Close = this.Close;
            vm.$scope.ServerMsg = $scope.MemReg.Get<string>("ServerMsg");
            vm.$scope.IsLoading = true;

            //todo: check if model not empty and fill list.
            //vm.$scope.ActiveRoles = new FC.List<MODELS.Role>();
            //vm.$scope.SysRoles = new FC.List<MODELS.Role>();

            //vm.RoleService.GetList().then(function (r) {
            //    vm.$scope.SysRoles = new FC.List<MODELS.Role>(r.Data);
            //});
        }

        public DoSelectAll() {
            var vm = this;
           // vm.$scope.ActiveRoles.AddRange(vm.$scope.SysRoles.Where([{Key:'Name',Value:'Developer', Operator: '=='}, {Key:'Name',Value:'Admin', Operator:'=='}]));
        }

        public DoChange(): void {

            var vm = this;
            var a = vm.$scope.SysRoles.Find('RoleID', vm.$scope.Activated);
            vm.$scope.ActiveRoles.Add(a);
        }

        public Close() {
            var vm = this;
            vm.MtModal.hide();
        }
    }
    Application.RegisterController("STD.Controllers.RolePickerDialogController", STD.Controllers.RolePickerDialogController);
}