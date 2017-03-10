var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../FC.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Core;
    (function (Core) {
        var Controllers;
        (function (Controllers) {
            var CONFIRMATION = (function () {
                function CONFIRMATION() {
                }
                CONFIRMATION.OK = "OK";
                CONFIRMATION.CANCEL = "CANCEL";
                CONFIRMATION.FORCE = "FORCE";
                CONFIRMATION.EDIT = "EDIT";
                CONFIRMATION.CREATE = "CREATE";
                CONFIRMATION.DELETE = "DELETE";
                CONFIRMATION.PUBLISH = "PUBLISH";
                CONFIRMATION.FORCE_DELETE = "FORCE DELETE";
                return CONFIRMATION;
            }());
            Controllers.CONFIRMATION = CONFIRMATION;
            var AlertController = (function (_super) {
                __extends(AlertController, _super);
                function AlertController($http, $q, $scope, $mdDialog, $route, $routeParams, $location, $sce, local) {
                    _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                    var vm = this;
                    vm.$scope.inst = this;
                    vm.$scope = $scope;
                    vm.$scope.MtModal = $mdDialog;
                    vm.$scope.Close = this.Close;
                    if (local["ServerMsg"]) {
                        vm.$scope.ServerMsg = local["ServerMsg"];
                    }
                    else {
                        vm.$scope.ServerMsg = "OK";
                    }
                    if (local["model"]) {
                        vm.$scope.model = local["model"];
                    }
                    //key of item to delete?
                    if (local["key"]) {
                        var key = local["key"];
                    }
                }
                AlertController.prototype.DoDeleteConfirm = function (confirm) {
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
                };
                AlertController.prototype.Close = function ($scope) {
                    $scope.MtModal.hide();
                    $scope.inst.$scope = $scope;
                };
                AlertController.$inject = [
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
                return AlertController;
            }(FC.Shared.Controllers.BaseController));
            Controllers.AlertController = AlertController;
            Application.RegisterController("FC.Core.Controllers.AlertController", FC.Core.Controllers.AlertController);
        })(Controllers = Core.Controllers || (Core.Controllers = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
//# sourceMappingURL=AlertController.js.map