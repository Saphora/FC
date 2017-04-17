///<reference path="../../Core/FC.ts"/>
///<reference path="../Details.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Details.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export class FestivalDetailDialogController extends FC.Shared.Controllers.BaseController {

        public inst: FC.Modules.Details.Controllers.DetailsController;
        public $scope: VM.IDetailScope<FC.Shared.Models.UFestival>;

        static $inject = [
            '$http',
            '$q',
            '$scope',
            '$mdDialog',
            
            '$location',
            "$sce"
        ];

        constructor(
            $http: ng.IHttpService,
            $q: ng.IQService,
            $scope,
            $mdDialog: angular.material.MDDialogService,
            $routeParams: ng.RouteData,
            $location: ng.ILocationService,
            $sce: ng.ISCEService
        ) {
            super($http, $q, $scope, $location, $mdDialog);
            var vm = this;
            vm.$scope.inst = this;
            vm.$scope.$location = $location;
            vm.$scope.FormID = '953ACE20-92CE-47DC-9360-B0F9D5200884';
            vm.$scope = $scope;
            vm.$scope.MtModal = $mdDialog;
            this.setFestivalDetailData($routeParams["festivalID"]);
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

        private setFestivalDetailData(detailID: string): void {
            var vm = this;

            vm.FestivalService.GetFestival(detailID).then(function (r) {
                var $scope = vm.$scope;
                $scope.model = new FC.Shared.Models.UFestival();
         
                $scope.model = r.Data;
                $scope.model.EndDate = new Date($scope.model.EndDate.toString());
                $scope.model.StartDate = new Date($scope.model.StartDate.toString());
                var profileImgUrl = "/Resources/images/profile-header-default.jpg";
                if (r.Data.ProfileImage) {
                    profileImgUrl = FC.Core.Environment.MediaURLRoot + "/?action=getimg&MediaID=" + r.Data.ProfileImage.MediaID + "&IsObsolete=false&Width=" + r.Data.ProfileImage.Width;
                }
                $scope.IsLoading = false;
            });
        }
       
    }
    DetailsModule.GetApplication().RegisterController("FC.Modules.Details.Controllers.FestivalDetailDialogController", FC.Modules.Details.Controllers.FestivalDetailDialogController);
}