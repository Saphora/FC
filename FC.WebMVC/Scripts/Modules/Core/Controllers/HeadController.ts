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
    export class HeadController extends FC.Shared.Controllers.BaseController {

        public inst: FC.Modules.Details.Controllers.DetailsController;
        public URLManSvc: FC.Core.Services.URLManagerService;
        public $sce;
        public $scope: VM.IFormVMBase<any>;
        public vm;
        public MtModal: angular.material.MDDialogService;

        static $inject = [
            '$http',
            '$q',
            '$scope',
            '$mdDialog',
            '$route',
            '$routeParams',
            '$location',
        ];

        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $scope: VM.IDetailScope<any>,
            $mdDialog: angular.material.MDDialogService,
            $route: ng.route.IRoute,
            $routeParams: ng.RouteData,
            $location: ng.ILocationService
        ) {
            super($http, $q, $scope, $location, $routeParams,$mdDialog);
            var vm = this;
            window.addEventListener("META-REFRESH", function (e: CustomEventInit) {
                vm.$scope.META = e.detail;
                
            });
        }

        public Close($scope: VM.IFormVMBase<any>) {
            $scope.MtModal.hide();
            $scope.inst.$scope = $scope;
        }
    }
    Application.RegisterController("FC.Core.Controllers.HeadController", FC.Core.Controllers.HeadController);
}