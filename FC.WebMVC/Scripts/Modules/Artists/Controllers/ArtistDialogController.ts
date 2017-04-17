///<reference path="../../Core/FC.ts"/>
///<reference path="../Artists.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Artists.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export class ArtistDialogController extends FC.Shared.Controllers.BaseController {

        public inst: FC.Modules.Details.Controllers.DetailsController;
        public GenreService: FC.Modules.Genres.Services.GenreService;
        public ArtistService: FC.Modules.Artists.Services.ArtistService;
        public FestivalService: FC.Modules.Festival.Services.FestivalService;
        public LocationService: FC.Modules.Location.Services.LocationService;
        public TicketService: FC.Modules.Ticket.Services.TicketService;

        public URLManSvc: FC.Core.Services.URLManagerService;
        public $sce;
        public $scope: Models.IArtistDialog;
        public vm;

        static $inject = [
            '$http',
            '$q',
            '$uibModal',
            '$scope',
            '$mdDialog',
            
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

        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $uibModal,
            $scope,
            $mdDialog: angular.material.MDDialogService,
            $routeParams: ng.RouteData,
            $location: ng.ILocationService,
            UrlManagerService: FC.Core.Services.URLManagerService,
            $sce: ng.ISCEService,
            GenreService: FC.Modules.Genres.Services.GenreService,
            ArtistsService: FC.Modules.Artists.Services.ArtistService,
            FestivalService: FC.Modules.Festival.Services.FestivalService,
            CalendarService: FC.Modules.Calendar.Services.CalendarService,
            LocationService: FC.Modules.Location.Services.LocationService,
            TicketService: FC.Modules.Ticket.Services.TicketService
        ) {
            super($http, $q, $scope, $location,  $mdDialog);
            var vm = this;
            vm.$scope.inst = this;
            vm.$scope.$location = $location;
            vm.$scope.FormID = '63049361-2BD5-4162-BAD5-4F2F62E49E07';
            vm.$scope = $scope;
            vm.$scope.MtModal = $mdDialog;
            this.setData($routeParams["festivalID"]);
            var v: FC.Shared.Util.Validator = FC.Shared.Util.Validator.GetInstance();

            vm.$scope.DoSaveEdit = function () {
                vm.DoSaveCRUD(Shared.Controllers.ActionType.Update, Shared.Controllers.ServiceType.FestivalService, vm.$scope);
            }
            vm.$scope.DoSaveCreate = function () {
                vm.DoSaveCRUD(Shared.Controllers.ActionType.Create, Shared.Controllers.ServiceType.FestivalService, vm.$scope);
            }
            vm.$scope.DoSaveDelete = function () {
                vm.DoSaveCRUD(Shared.Controllers.ActionType.Delete, Shared.Controllers.ServiceType.FestivalService, vm.$scope);
            }
            vm.$scope.DoSaveForceDelete = function () {
                vm.DoSaveCRUD(Shared.Controllers.ActionType.ForceDelete, Shared.Controllers.ServiceType.FestivalService, vm.$scope);
            }
        }

        private setData(sortIndex: string): void {
            var vm = this;
            vm.ArtistService.GetSorted(sortIndex).then(function (r) {
                vm.$scope.Artists = r.Data;
            });
        }

    }
    ArtistsModule.GetApplication().RegisterController("FC.Modules.Artists.Controllers.ArtistDialogController", FC.Modules.Artists.Controllers.ArtistDialogController);
}