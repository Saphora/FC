var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts" />
///<reference path="../Rating.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Rating;
        (function (Rating) {
            var Controllers;
            (function (Controllers) {
                var RatingController = (function (_super) {
                    __extends(RatingController, _super);
                    function RatingController($http, $q, $scope, $route, $routeParams, $location, ThemingService, LocalizationSvc) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, ThemingService, LocalizationSvc);
                    }
                    RatingController.$inject = [
                        '$http',
                        '$q',
                        '$scope',
                        '$route',
                        '$routeParams',
                        '$location',
                        'FC.Modules.Theming.Services.ThemingService',
                        "FC.Core.Services.LocalizationService",
                    ];
                    return RatingController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.RatingController = RatingController;
                RatingModule.GetApplication().RegisterController("FC.Modules.Rating.Controllers.RatingController", FC.Modules.Rating.Controllers.RatingController);
            })(Controllers = Rating.Controllers || (Rating.Controllers = {}));
        })(Rating = Modules.Rating || (Modules.Rating = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
