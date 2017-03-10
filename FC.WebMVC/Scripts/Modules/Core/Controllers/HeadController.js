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
            var HeadController = (function (_super) {
                __extends(HeadController, _super);
                function HeadController($http, $q, $scope, $mdDialog, $route, $routeParams, $location) {
                    _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                    var vm = this;
                    window.addEventListener("META-REFRESH", function (e) {
                        vm.$scope.META = e.detail;
                    });
                }
                HeadController.prototype.Close = function ($scope) {
                    $scope.MtModal.hide();
                    $scope.inst.$scope = $scope;
                };
                HeadController.$inject = [
                    '$http',
                    '$q',
                    '$scope',
                    '$mdDialog',
                    '$route',
                    '$routeParams',
                    '$location',
                ];
                return HeadController;
            }(FC.Shared.Controllers.BaseController));
            Controllers.HeadController = HeadController;
            Application.RegisterController("FC.Core.Controllers.HeadController", FC.Core.Controllers.HeadController);
        })(Controllers = Core.Controllers || (Core.Controllers = {}));
    })(Core = FC.Core || (FC.Core = {}));
})(FC || (FC = {}));
//# sourceMappingURL=HeadController.js.map