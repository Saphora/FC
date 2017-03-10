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
        var Loading;
        (function (Loading) {
            var Controllers;
            (function (Controllers) {
                var LoadController = (function (_super) {
                    __extends(LoadController, _super);
                    function LoadController($http, $q, $scope, $route, $routeParams, $location, ThemingService, LocalizationSvc) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingService, LocalizationSvc);
                        LoadingModule.GetApplication().RegisterController("FC.Modules.Loading.Controllers.LoadController", FC.Modules.Loading.Controllers.LoadController);
                    }
                    LoadController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        'FC.Modules.Theming.Services.ThemingService',
                        "FC.Core.Services.LocalizationService"
                    ];
                    return LoadController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.LoadController = LoadController;
            })(Controllers = Loading.Controllers || (Loading.Controllers = {}));
        })(Loading = Modules.Loading || (Modules.Loading = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
