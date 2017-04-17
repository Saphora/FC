///<reference path="../../Core/FC.ts"/>
///<reference path="../Location.ts" />
///<reference path="../../../Shared/CoreModel/KeyValuePair.ts"/>
///<reference path="../../../Shared/Controllers/BaseController.ts"/>
module FC.Modules.Location.Controllers {
    import CM = FC.Core.CoreModel;
    import INT = FC.Shared.Interfaces;
    import MODELS = FC.Shared.Models;
    import MODULES = FC.Modules;
    import VM = FC.Shared.ViewModels;
    export class LocationDialogController extends FC.Shared.Controllers.BaseController {

        public inst: FC.Modules.Location.Controllers.LocationDialogController;
        public $scope: Models.ILocationDialog;
        public MtModal: angular.material.MDDialogService;

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
            super($http, $q, $scope, $location,  $mdDialog);
            var vm = this;
            vm.$scope.inst = this;
            vm.$scope.FormID = '940BD72D-88E3-4201-98D6-042919BD918C';
            vm.$scope.$location = $location;
            vm.$scope.DoSaveEdit = this.DoSaveEdit;
            vm.$scope = $scope;
            vm.$scope.GetLocations = this.GetLocations;
            vm.$scope.DoCreate = this.DoCreate;
            vm.$scope.DoEdit = this.DoEdit;
            vm.$scope.DoSaveCreate = this.DoSaveCreate;
            vm.$scope.IsLoading = false;
            vm.$scope.IsCreating = false;
            vm.$scope.IsEditing = false;
            vm.$scope.IsDeleting = false;
            vm.$scope.SetCountry = this.SetCountry;
            vm.$scope.DoSave = this.DoSave;
            vm.$scope.PhoneCodes = PhoneCodes;
            vm.$scope.SelectedImagePath = FC.Core.Environment.MediaURLRoot;
            vm.AddLocationThumbSavedListener(vm.$scope);
            vm.AddProfileImageSavedListener(vm.$scope);
            vm.RecoverModel<MODELS.Location>(vm.$scope.model, $scope);
            window.addEventListener("FCDataLoadingComplete", function (e) {
                vm.$scope.inst.$scope.IsLoading = false;
            });
        }
       
        public SetCountry($scope: Models.ILocationDialog, countryID: string): void {
            $scope= $scope.inst.$scope;
            var country = $scope.SysCountries.filter(function (v, i) {
                return v.CountryID == countryID;
            });
            if (country[0]) {
                $scope.model.Country = country[0];
                var index = country[0].CultureIsoName.split("-")[1];
                $scope.PhoneCode = PhoneCodes[index];

            }
            
        }

        public AddLocationThumbSavedListener($scope: Models.ILocationDialog) {
            window.addEventListener("LocationThumbSaved", function (e) {
                $scope.model.ThumbnailID = e["detail"];
            });
        }
        public AddProfileImageSavedListener($scope: Models.ILocationDialog) {
            window.addEventListener("ProfileImageSaved", function (e) {
                $scope.model.ProfileImageID = e["detail"];
            });
        }

        public DoEdit($scope: Models.ILocationDialog, model: FC.Shared.Models.Location) {
            $scope = $scope.inst.$scope;
            $scope.DoCancelCRUD($scope);
            $scope.IsEditing = true;
            $scope.model = model;
            $scope.inst.LocationService.GetLocation($scope.model.LocationID).then(function (r) {
                $scope.model = r.Data;
            });
        }

        public DoCreate($scope: Models.ILocationDialog, countryID: string): void {
            $scope = $scope.inst.$scope;
            $scope.IsCreating = true;
            $scope.model = new FC.Shared.Models.Location();
            $scope.model.CountryID = countryID;
            $scope.SetCountry($scope, countryID);
        }

        public DoSaveCreate($scope: Models.ILocationDialog): void {
            var vm = this;
            $scope.IsCreating = false;
            vm.FinishForm(vm.$scope);
            $scope.inst.LocationService.Create($scope.model).then(function (r) {
                $scope.IsCreated = r.Data.SUCCESS;
            });
        }
        

        public GetLocations($scope: Models.ILocationDialog, countryID: string): void {
            var vm = this;
            $scope.inst.LocationService.GetByCountry(countryID).then(function (r) {
                $scope.Locations = r.Data;
            });
        }

        public DoSaveEdit($scope: Models.ILocationDialog): void {
            var vm = this;
            $scope.inst.LocationService.Update($scope.model).then(function (r) {
                $scope.ServerMsg = r.Message;
                $scope.IsSuccess = r.Data.SUCCESS;
                $scope.DoCancelCRUD($scope);
            });
        }

        public DoSave($scope: Models.ILocationDialog): void {
            window.dispatchEvent(new CustomEvent("LocationSaveEvent", { 'detail': $scope.model }));
        }
    }
    DetailsModule.GetApplication().RegisterController("FC.Modules.Location.Controllers.LocationDialogController", FC.Modules.Location.Controllers.LocationDialogController);
}