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
        var RolePickerDialogController = (function (_super) {
            __extends(RolePickerDialogController, _super);
            function RolePickerDialogController($http, $q, $scope, $mdDialog, $route, $routeParams, $location, $sce) {
                _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                var vm = this;
                vm.$scope.inst = this;
                vm.$scope = $scope;
                vm.$scope.MtModal = $mdDialog;
                vm.$scope.Close = this.Close;
                vm.$scope.ServerMsg = $scope.MemReg.Get("ServerMsg");
                vm.$scope.IsLoading = true;
                //todo: check if model not empty and fill list.
                //vm.$scope.ActiveRoles = new FC.List<MODELS.Role>();
                //vm.$scope.SysRoles = new FC.List<MODELS.Role>();
                //vm.RoleService.GetList().then(function (r) {
                //    vm.$scope.SysRoles = new FC.List<MODELS.Role>(r.Data);
                //});
            }
            RolePickerDialogController.prototype.DoSelectAll = function () {
                var vm = this;
                // vm.$scope.ActiveRoles.AddRange(vm.$scope.SysRoles.Where([{Key:'Name',Value:'Developer', Operator: '=='}, {Key:'Name',Value:'Admin', Operator:'=='}]));
            };
            RolePickerDialogController.prototype.DoChange = function () {
                var vm = this;
                var a = vm.$scope.SysRoles.Find('RoleID', vm.$scope.Activated);
                vm.$scope.ActiveRoles.Add(a);
            };
            RolePickerDialogController.prototype.Close = function () {
                var vm = this;
                vm.MtModal.hide();
            };
            RolePickerDialogController.$inject = [
                '$http',
                '$q',
                '$scope',
                '$mdDialog',
                '$route',
                '$routeParams',
                '$location',
                "$sce"
            ];
            return RolePickerDialogController;
        }(FC.Shared.Controllers.BaseController));
        Controllers.RolePickerDialogController = RolePickerDialogController;
        Application.RegisterController("STD.Controllers.RolePickerDialogController", STD.Controllers.RolePickerDialogController);
    })(Controllers = STD.Controllers || (STD.Controllers = {}));
})(STD || (STD = {}));
//# sourceMappingURL=RolePickerDialogController.js.map