var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Theming;
        (function (Theming) {
            var Controllers;
            (function (Controllers) {
                var ThemingController = (function (_super) {
                    __extends(ThemingController, _super);
                    function ThemingController($http, $q, $scope, $route, $routeParams, $location, ThemingSvc, LocalizationSvc) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingSvc, LocalizationSvc);
                        ThemingModule.GetApplication().RegisterController("FC.Modules.Theming.Controllers.ThemingController", FC.Modules.Theming.Controllers.ThemingController);
                    }
                    ThemingController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        'FC.Modules.Theming.Services.ThemingService'
                    ];
                    return ThemingController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.ThemingController = ThemingController;
            })(Controllers = Theming.Controllers || (Theming.Controllers = {}));
        })(Theming = Modules.Theming || (Modules.Theming = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
