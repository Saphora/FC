///<reference path="../../Core/FC.ts"/>
///<reference path="../FC.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Core.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export class CONFIRMATION {

        public static OK: string = "OK";
        public static CANCEL: string = "CANCEL";
        public static FORCE: string = "FORCE";
        public static EDIT: string = "EDIT";
        public static CREATE: string = "CREATE";
        public static DELETE: string = "DELETE";
        public static PUBLISH: string = "PUBLISH";
        public static FORCE_DELETE: string = "FORCE DELETE";

    }
    export class AlertController extends FC.Shared.Controllers.BaseController {

        public inst: FC.Modules.Details.Controllers.DetailsController;
        public $scope: VM.IDetailScope<any>;

        static $inject = [
            '$http',
            '$q',
            '$scope',
            '$mdDialog',
            '$route',
            '$routeParams',
            '$location',
            "$sce",
            'local',
        ];

        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $scope: VM.IDetailScope<any>,
            $mdDialog: angular.material.MDDialogService,
            $route: ng.route.IRoute,
            $routeParams: ng.RouteData,
            $location: ng.ILocationService,
            $sce: ng.ISCEService,
            local
        ) {
            super($http, $q, $scope, $location, $routeParams, $mdDialog);
            var vm = this;
            vm.$scope.inst = this;
            vm.$scope = $scope;
            vm.$scope.MtModal = $mdDialog;
            vm.$scope.Close = this.Close;
           
            if (local["ServerMsg"]) {
                vm.$scope.ServerMsg = local["ServerMsg"];
            } else {
                vm.$scope.ServerMsg = "OK";
            }

            if (local["model"]) {
                vm.$scope.model = local["model"];
            }
            //key of item to delete?
            if (local["key"]) {
                var key: string = local["key"];
            }
        }

        public DoDeleteConfirm(confirm: string) {
            var vm = this;
            switch (confirm.toUpperCase()) {
                case CONFIRMATION.OK:
                    window.dispatchEvent(new CustomEvent("CONFIRM_DELETE", { detail: CONFIRMATION.OK }));
                    window.dispatchEvent(new CustomEvent("REFRESH"));
                    break;
                case CONFIRMATION.CANCEL:
                    vm.$scope.MtModal.cancel(CONFIRMATION.CANCEL);
                    window.dispatchEvent(new CustomEvent("CONFIRM_DELETE", { detail: CONFIRMATION.CANCEL }));
                    break;
                default:
                    break;

            }
        }

        public Close($scope: VM.IFormVMBase<any>) {
            $scope.MtModal.hide();
            $scope.inst.$scope = $scope;
        }
    }
    Application.RegisterController("FC.Core.Controllers.AlertController", FC.Core.Controllers.AlertController);
}