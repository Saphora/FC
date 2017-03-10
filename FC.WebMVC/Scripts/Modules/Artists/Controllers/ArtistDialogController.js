var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Core/FC.ts"/>
///<reference path="../Artists.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
var FC;
(function (FC) {
    var Modules;
    (function (Modules) {
        var Artists;
        (function (Artists) {
            var Controllers;
            (function (Controllers) {
                var ArtistDialogController = (function (_super) {
                    __extends(ArtistDialogController, _super);
                    function ArtistDialogController($http, $q, $uibModal, $scope, $mdDialog, $route, $routeParams, $location, UrlManagerService, $sce, GenreService, ArtistsService, FestivalService, CalendarService, LocationService, TicketService) {
                        _super.call(this, $http, $q, $scope, $location, $routeParams, $mdDialog);
                        var vm = this;
                        vm.$scope.inst = this;
                        vm.$scope.$location = $location;
                        vm.$scope.FormID = '63049361-2BD5-4162-BAD5-4F2F62E49E07';
                        vm.$scope = $scope;
                        vm.$scope.MtModal = $mdDialog;
                        this.setData($routeParams["festivalID"]);
                        var v = FC.Shared.Util.Validator.GetInstance();
                        vm.$scope.DoSaveEdit = function () {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Update, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        };
                        vm.$scope.DoSaveCreate = function () {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Create, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        };
                        vm.$scope.DoSaveDelete = function () {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.Delete, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        };
                        vm.$scope.DoSaveForceDelete = function () {
                            vm.DoSaveCRUD(FC.Shared.Controllers.ActionType.ForceDelete, FC.Shared.Controllers.ServiceType.FestivalService, vm.$scope);
                        };
                    }
                    ArtistDialogController.prototype.setData = function (sortIndex) {
                        var vm = this;
                        vm.ArtistService.GetSorted(sortIndex).then(function (r) {
                            vm.$scope.Artists = r.Data;
                        });
                    };
                    ArtistDialogController.$inject = [
                        '$http',
                        '$q',
                        '$uibModal',
                        '$scope',
                        '$mdDialog',
                        '$route',
                        '$routeParams',
                        '$location',
                        "FC.Modules.Theming.Services.ThemingService",
                        "FC.Core.Services.LocalizationService",
                        "FC.Core.Services.URLManagerService",
                        "$sce",
                        "FC.Modules.Genres.Services.GenreService",
                        "FC.Modules.Artists.Services.ArtistService",
                        "FC.Modules.Festival.Services.FestivalService",
                        "FC.Modules.Calendar.Services.CalendarService",
                        "FC.Modules.Location.Services.LocationService",
                        "FC.Modules.Ticket.Services.TicketService"
                    ];
                    return ArtistDialogController;
                }(FC.Shared.Controllers.BaseController));
                Controllers.ArtistDialogController = ArtistDialogController;
                ArtistsModule.GetApplication().RegisterController("FC.Modules.Artists.Controllers.ArtistDialogController", FC.Modules.Artists.Controllers.ArtistDialogController);
            })(Controllers = Artists.Controllers || (Artists.Controllers = {}));
        })(Artists = Modules.Artists || (Modules.Artists = {}));
    })(Modules = FC.Modules || (FC.Modules = {}));
})(FC || (FC = {}));
//# sourceMappingURL=ArtistDialogController.js.map