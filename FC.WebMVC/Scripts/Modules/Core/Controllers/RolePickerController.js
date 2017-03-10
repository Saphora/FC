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
        var RolePickerController = (function (_super) {
            __extends(RolePickerController, _super);
            function RolePickerController($e, $http, $q, $scope, $mdDialog, $route, $routeParams, $location, $sce) {
                _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                var vm = this;
                vm.$scope.inst = this;
                vm.$scope = $scope;
                vm.$scope.MtModal = $mdDialog;
                vm.$scope.Close = this.Close;
                vm.$scope.ServerMsg = $scope.MemReg.Get("ServerMsg");
                vm.$scope.IsLoading = true;
                vm.$scope.$watch('value', function (v) {
                    if (v) {
                        debugger;
                    }
                });
            }
            RolePickerController.prototype.OpenRolesModal = function () {
                var $scope = this.$scope;
                var opts = {};
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
            };
            RolePickerController.prototype.DoChange = function () {
                debugger;
            };
            RolePickerController.prototype.Close = function () {
                var vm = this;
                vm.MtModal.hide();
            };
            RolePickerController.$inject = [
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
            return RolePickerController;
        }(FC.Shared.Controllers.BaseController));
        Controllers.RolePickerController = RolePickerController;
        Application.RegisterController("STD.Controllers.RolePickerController", STD.Controllers.RolePickerController);
    })(Controllers = STD.Controllers || (STD.Controllers = {}));
})(STD || (STD = {}));
//# sourceMappingURL=RolePickerController.js.map