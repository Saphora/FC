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
    export class RolePickerController extends FC.Shared.Controllers.BaseController {

        public inst: STD.Controllers.RolePickerController;
        public URLManSvc: FC.Core.Services.URLManagerService;
        public $sce;
        public $scope: STD.IRolePicker;
        public value;
        public MtModal: angular.material.MDDialogService;

        static $inject = [
            '$element',
            '$http',
            '$q',
            '$scope',
            '$mdDialog',
            '$route',
            '$routeParams',
            '$location',
            "$sce"
        ];

        constructor(
            $e,
            $http: ng.IHttpService,
            $q: ng.IQService,
            $scope: STD.IRolePicker,
            $mdDialog: angular.material.MDDialogService,
            $route: ng.route.IRoute,
            $routeParams: ng.RouteData,
            $location: ng.ILocationService,
            $sce: ng.ISCEService
        ) {
            super($http, $q, $scope, $location, $routeParams, $mdDialog);
            var vm = this;
            vm.$scope.inst = this;
            vm.$scope = $scope;
            vm.$scope.MtModal = $mdDialog;
            vm.$scope.Close = this.Close;
            vm.$scope.ServerMsg = $scope.MemReg.Get<string>("ServerMsg");
            vm.$scope.IsLoading = true;
            vm.$scope.$watch('value', function (v) {
                if (v) {
                    debugger;
                }
            });
            
        }
        public OpenRolesModal(): void {
            var $scope = this.$scope;
            var opts: ng.material.MDDialogOptions = {};
            opts.controller = STD.Controllers.RolePickerDialogController;
            opts.controllerAs = 'vm';
            opts.templateUrl = '/Scripts/modules/core/views/role-picker-dialog.html';
            opts.parent = document.body;
            opts.clickOutsideToClose = true;
            $scope.MtModal.show(opts).then(function (answer) {
                //$scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                // $scope.status = 'You cancelled the dialog.';
            });
        }

        public DoChange() {
            debugger;
        }

        public Close() {
            var vm = this;
            vm.MtModal.hide();
        }
    }
    Application.RegisterController("STD.Controllers.RolePickerController", STD.Controllers.RolePickerController);
}