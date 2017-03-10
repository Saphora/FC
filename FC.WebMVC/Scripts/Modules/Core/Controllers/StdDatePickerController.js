var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../FC.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var STD;
(function (STD) {
    var Controllers;
    (function (Controllers) {
        var StdDatePickerController = (function (_super) {
            __extends(StdDatePickerController, _super);
            function StdDatePickerController($e, $http, $q, $scope, $mdDialog, $route, $routeParams, $location, $sce) {
                _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                var vm = this;
                vm.$scope.inst = this;
                vm.$scope = $scope;
                vm.$scope.MtModal = $mdDialog;
                vm.$scope.Close = this.Close;
                vm.$scope.ServerMsg = $scope.MemReg.Get("ServerMsg");
                vm.$scope.Year = new Date().getFullYear().toString();
                vm.$scope.PrevYear = (new Date().getFullYear() - 1).toString();
                vm.$scope.NextYear = (new Date().getFullYear() + 1).toString();
                vm.$scope.CurrentYear = new Date().getFullYear().toString();
                vm.$scope.Month = (new Date().getMonth() + 1).toString();
                vm.$scope.Day = new Date().getDate().toString();
                vm.$scope.Hours = "0";
                //round up to 5, 15 etc..
                vm.$scope.Minutes = "0";
                vm.$scope.Seconds = "1";
                vm.$scope.DoChange = this.DoChange;
                vm.$scope.Days = new Array();
                var d = new Date(parseInt(vm.$scope.Year), parseInt(vm.$scope.Month), 0);
                for (var i = 1; i <= d.getDate(); i++) {
                    vm.$scope.Days.push(i.toString());
                }
                vm.$scope.IsLoading = true;
                vm.$scope.$watch('value', function (v) {
                    if (v) {
                        var value = v;
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
            StdDatePickerController.prototype.DoChange = function ($scope) {
                var vm = $scope.inst;
                $scope.Days = new Array();
                var d = new Date(parseInt($scope.Year), parseInt($scope.Month), 0);
                for (var i = 1; i <= d.getDate(); i++) {
                    $scope.Days.push(i.toString());
                }
                $scope.value = new Date(parseInt($scope.Year), parseInt($scope.Month) - 1, parseInt($scope.Day), parseInt($scope.Hours), parseInt($scope.Minutes));
                if ($scope.ChangeEvent) {
                    window.dispatchEvent(new CustomEvent($scope.ChangeEvent, { detail: $scope.value }));
                }
            };
            StdDatePickerController.prototype.Close = function ($scope) {
                $scope.MtModal.hide();
                $scope.inst.$scope = $scope;
            };
            StdDatePickerController.$inject = [
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
            return StdDatePickerController;
        }(FC.Shared.Controllers.BaseController));
        Controllers.StdDatePickerController = StdDatePickerController;
        Application.RegisterController("STD.Controllers.StdDatePickerController", STD.Controllers.StdDatePickerController);
    })(Controllers = STD.Controllers || (STD.Controllers = {}));
})(STD || (STD = {}));
//# sourceMappingURL=StdDatePickerController.js.map