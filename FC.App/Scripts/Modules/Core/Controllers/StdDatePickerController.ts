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
    export class StdDatePickerController extends FC.Shared.Controllers.BaseController {

        public inst: STD.Controllers.StdDatePickerController;
        public URLManSvc: FC.Core.Services.URLManagerService;
        public $sce;
        public $scope: STD.IStdDatePicker;
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
            $scope: STD.IStdDatePicker,
            $mdDialog: angular.material.MDDialogService,
            $route: ng.route.IRoute,
            $routeParams: ng.RouteData,
            $location: ng.ILocationService,
            $sce: ng.ISCEService
        ) {
            super($http, $q, $scope, $location, $routeParams,$mdDialog);
            var vm = this;
            vm.$scope.inst = this;
            vm.$scope = $scope;
            vm.$scope.MtModal = $mdDialog;
            vm.$scope.Close = this.Close;
            vm.$scope.ServerMsg = $scope.MemReg.Get<string>("ServerMsg");
            vm.$scope.Year = new Date().getFullYear().toString();
            vm.$scope.PrevYear = (new Date().getFullYear() - 1).toString();
            vm.$scope.NextYear = (new Date().getFullYear() + 1).toString();
            vm.$scope.CurrentYear = new Date().getFullYear().toString();
            vm.$scope.Month = (new Date().getMonth()+1).toString();
            vm.$scope.Day = new Date().getDate().toString();
            vm.$scope.Hours = "0";
            //round up to 5, 15 etc..
            vm.$scope.Minutes = "0";
            vm.$scope.Seconds = "1";
            vm.$scope.DoChange = this.DoChange;
            vm.$scope.Days = new Array<string>();
            var d = new Date(parseInt(vm.$scope.Year), parseInt(vm.$scope.Month), 0);
            for (var i = 1; i <= d.getDate(); i++) {
                vm.$scope.Days.push(i.toString());
            }
            vm.$scope.IsLoading = true;
            vm.$scope.$watch('value', function (v) {
                if (v) {
                    var value: Date = v as Date;
                    vm.$scope.IsLoading = false;
                    vm.$scope.Year = value.getFullYear().toString();
                    vm.$scope.Month = (value.getMonth() + 1).toString();
                    vm.$scope.Day = value.getDate().toString();
                    vm.$scope.Hours = value.getHours().toString();
                    vm.$scope.Minutes = value.getMinutes().toString();
                    vm.$scope.Seconds = "1";
                }
            });
        }
        

        public DoChange($scope: STD.IStdDatePicker) {
            var vm = $scope.inst;
            $scope.Days = new Array<string>();
            var d = new Date(parseInt($scope.Year), parseInt($scope.Month), 0);

            for (var i = 1; i <= d.getDate(); i++) {
                $scope.Days.push(i.toString());
            }

            $scope.value = new Date(parseInt($scope.Year), parseInt($scope.Month) - 1, parseInt($scope.Day), parseInt($scope.Hours), parseInt($scope.Minutes));

            if ($scope.ChangeEvent) {
                window.dispatchEvent(new CustomEvent($scope.ChangeEvent, {detail:$scope.value}));
            }
        }

        public Close($scope: VM.IFormVMBase<any>) {
            $scope.MtModal.hide();
            $scope.inst.$scope = $scope;
        }
    }
    Application.RegisterController("STD.Controllers.StdDatePickerController", STD.Controllers.StdDatePickerController);
}